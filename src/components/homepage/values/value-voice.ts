import { clamp, smooth } from '../../../lib/motion';
import { valueVoiceMotion } from './value-voice-motion';

const settleWithOvershoot = (value: number) => {
  const shifted = value - 1;
  const back = valueVoiceMotion.deckSettleBackConstant;
  return 1 + (back + 1) * shifted ** 3 + back * shifted ** 2;
};

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

class ValueStory extends HTMLElement {
  private abort?: AbortController;
  private frame = 0;
  private wordCleanupTimers = new Set<number>();
  private wordMorphFrames = new Set<number>();

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();
    const signal = this.abort.signal;
    this.wordCleanupTimers.clear();
    this.wordMorphFrames.clear();

    const voice = this.querySelector<HTMLElement>('[data-value-voice]');
    const layers = Array.from(this.querySelectorAll<HTMLElement>('[data-voice-layer]'));
    const passages = Array.from(this.querySelectorAll<HTMLElement>('[data-value-passage]'));
    const decks = passages.map((passage) => ({
      element: passage.querySelector<HTMLElement>('[data-evidence-deck]'),
      cards: Array.from(passage.querySelectorAll<HTMLElement>('[data-aspect]')),
    }));
    const personalNote = this.querySelector<HTMLElement>('personal-note');
    const boxMotion = this.querySelector<HTMLElement>('.opening-sequence__motion');
    const activeFrame = () =>
      this.querySelector<HTMLElement>('[data-opening-frame][data-active]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (
      !voice ||
      !personalNote ||
      !boxMotion ||
      layers.length !== passages.length + 1 ||
      !passages.length ||
      decks.some((deck) => !deck.element || !deck.cards.length)
    ) return;
    voice.dataset.enhanced = 'true';

    this.querySelectorAll<HTMLButtonElement>('[data-word-cycle]').forEach((button) => {
      const options = Array.from(button.querySelectorAll<HTMLElement>('[data-word-option]'));
      let activeIndex = 0;
      let cleanupTimer: number | undefined;
      let morphFrame = 0;

      const updateLabel = () => {
        const word = options[activeIndex]?.textContent?.trim() ?? '';
        button.setAttribute('aria-label', `${word}. Change this word.`);
      };

      const settle = (settledIndex: number) => {
        button.removeAttribute('data-morphing');
        options.forEach((option, index) => {
          option.style.removeProperty('filter');
          option.style.removeProperty('opacity');
          option.toggleAttribute('data-word-visible', index === settledIndex);
          option.toggleAttribute('data-word-active', index === settledIndex);
        });
      };

      const paintMorphOption = (
        option: HTMLElement,
        fraction: number,
        blurBase: number,
      ) => {
        const safeFraction = Math.max(fraction, 0.001);
        const blur = Math.min(
          blurBase / safeFraction - blurBase,
          blurBase * valueVoiceMotion.wordMorphMaxBlurMultiplier,
        );
        const opacity = fraction ** valueVoiceMotion.wordMorphOpacityPower;
        option.style.filter = `blur(${blur.toFixed(3)}px)`;
        option.style.opacity = opacity.toFixed(4);
      };

      options.forEach((option, index) => {
        option.hidden = false;
        option.setAttribute('aria-hidden', 'true');
        option.toggleAttribute('data-word-visible', index === activeIndex);
        option.toggleAttribute('data-word-active', index === activeIndex);
      });
      button.dataset.morphReady = 'true';
      button.disabled = false;
      button.addEventListener('click', () => {
        if (morphFrame) {
          window.cancelAnimationFrame(morphFrame);
          this.wordMorphFrames.delete(morphFrame);
          morphFrame = 0;
          settle(activeIndex);
        }

        if (cleanupTimer) {
          window.clearTimeout(cleanupTimer);
          this.wordCleanupTimers.delete(cleanupTimer);
          cleanupTimer = undefined;
        }

        const outgoingIndex = activeIndex;
        const nextIndex = (activeIndex + 1) % options.length;
        const outgoing = options[outgoingIndex];
        const incoming = options[nextIndex];
        if (!outgoing || !incoming) return;

        incoming.toggleAttribute('data-word-visible', true);
        incoming.toggleAttribute('data-word-active', false);
        activeIndex = nextIndex;
        updateLabel();

        if (reducedMotion.matches) {
          incoming.getBoundingClientRect();
          outgoing.toggleAttribute('data-word-active', false);
          incoming.toggleAttribute('data-word-active', true);
          cleanupTimer = window.setTimeout(() => {
            settle(activeIndex);
            if (cleanupTimer) this.wordCleanupTimers.delete(cleanupTimer);
            cleanupTimer = undefined;
          }, valueVoiceMotion.wordMorphReducedDurationMs + 34);
          this.wordCleanupTimers.add(cleanupTimer);
          return;
        }

        button.dataset.morphing = 'true';
        outgoing.toggleAttribute('data-word-active', false);
        incoming.toggleAttribute('data-word-active', true);
        const fontSize = Number.parseFloat(window.getComputedStyle(button).fontSize);
        const blurBase = Math.max(
          valueVoiceMotion.wordMorphMinimumBlur,
          fontSize * valueVoiceMotion.wordMorphBlurRatio,
        );
        paintMorphOption(outgoing, 1, blurBase);
        paintMorphOption(incoming, 0, blurBase);
        const startTime = performance.now();

        const renderMorph = (time: number) => {
          if (morphFrame) this.wordMorphFrames.delete(morphFrame);
          const progress = clamp((time - startTime) / valueVoiceMotion.wordMorphDurationMs);
          paintMorphOption(outgoing, 1 - progress, blurBase);
          paintMorphOption(incoming, progress, blurBase);

          if (progress >= 1) {
            morphFrame = 0;
            settle(activeIndex);
            return;
          }

          morphFrame = window.requestAnimationFrame(renderMorph);
          this.wordMorphFrames.add(morphFrame);
        };

        morphFrame = window.requestAnimationFrame(renderMorph);
        this.wordMorphFrames.add(morphFrame);
      }, { signal });
      updateLabel();
    });

    let lastShownLayer = -1;

    const setLayer = (layer: HTMLElement, opacity: number, blur: number) => {
      layer.style.setProperty('--voice-opacity', opacity.toFixed(4));
      layer.style.setProperty('--voice-blur', `${blur.toFixed(3)}px`);
    };

    const showOnly = (activeIndex: number) => {
      if (activeIndex === lastShownLayer) return;
      lastShownLayer = activeIndex;

      layers.forEach((layer, index) => {
        const active = index === activeIndex;
        setLayer(layer, active ? 1 : 0, 0);
        layer.style.pointerEvents = active ? 'auto' : 'none';
        if (active) layer.removeAttribute('aria-hidden');
        else layer.setAttribute('aria-hidden', 'true');
        layer.querySelectorAll<HTMLButtonElement>('[data-word-cycle]').forEach((button) => {
          button.tabIndex = active ? 0 : -1;
        });
      });
    };

    const firstTransitionProgress = (passage: HTMLElement) => {
      const top = passage.getBoundingClientRect().top;
      const start = window.innerHeight * valueVoiceMotion.firstHandoffViewportStart;
      const distance = window.innerHeight * valueVoiceMotion.firstHandoffDistance;
      return clamp((start - top) / Math.max(1, distance));
    };

    const resetDecks = () => {
      decks.forEach(({ cards }) => {
        cards.forEach((card) => {
          card.style.removeProperty('opacity');
          card.style.removeProperty('transform');
          card.style.removeProperty('clip-path');
          card.style.removeProperty('pointer-events');
        });
      });
    };

    const firstDeckProgress = (passage: HTMLElement) => {
      const top = passage.getBoundingClientRect().top;
      const start = window.innerHeight * valueVoiceMotion.firstDeckViewportStart;
      const end = window.innerHeight * valueVoiceMotion.firstDeckViewportEnd;
      return clamp((start - top) / Math.max(1, start - end));
    };

    const deckReturnProgress = (index: number) => {
      // Keep each value on one continuous scroll rhythm. Chapter layout can
      // provide semantic structure without adding dead space between decks.
      const firstPassageTopVh = passages[0].getBoundingClientRect().top / window.innerHeight;
      const firstDeckDistanceVh =
        valueVoiceMotion.firstDeckViewportStart - valueVoiceMotion.firstDeckViewportEnd;
      const firstDeckMaximumFanLayer = Math.ceil((decks[0].cards.length - 1) / 2);
      const firstDeckFanComplete =
        valueVoiceMotion.deckFanStart +
        firstDeckMaximumFanLayer * valueVoiceMotion.deckFanLayerStagger +
        valueVoiceMotion.deckFanDistance;
      const firstReturnStartVh =
        firstDeckDistanceVh * firstDeckFanComplete +
        valueVoiceMotion.deckHoldDistanceVh;
      const cycleDistanceVh =
        valueVoiceMotion.deckReturnDistanceVh + valueVoiceMotion.deckHoldDistanceVh;
      const distanceFromFirstDeckStartVh =
        valueVoiceMotion.firstDeckViewportStart - firstPassageTopVh;
      const returnStartVh = firstReturnStartVh + index * cycleDistanceVh;
      return clamp(
        (distanceFromFirstDeckStartVh - returnStartVh) /
          valueVoiceMotion.deckReturnDistanceVh,
      );
    };

    const deckEntryProgress = (passage: HTMLElement, index: number) => {
      if (index === 0) return firstDeckProgress(passage);
      return clamp(
        (deckReturnProgress(index - 1) - valueVoiceMotion.deckIncomingStart) /
          valueVoiceMotion.deckIncomingDistance,
      );
    };

    const transitionProgress = (passage: HTMLElement, index: number) => {
      if (index === 0) return firstTransitionProgress(passage);
      return clamp(
        (deckReturnProgress(index - 1) - valueVoiceMotion.deckVoiceHandoffStart) /
          valueVoiceMotion.deckVoiceHandoffDistance,
      );
    };

    const paintDecks = () => {
      const frame = activeFrame();
      if (!frame) return;

      const frameBounds = frame.getBoundingClientRect();
      const sourceX = frameBounds.left + frameBounds.width * 0.5;
      const boxMouthY =
        frameBounds.top + frameBounds.height * valueVoiceMotion.deckBoxMouthRatio;
      const voiceBounds = voice.getBoundingClientRect();
      const visibleVoiceBottom = Number.parseFloat(getComputedStyle(voice).opacity) > 0.02
        ? voiceBounds.bottom
        : 0;
      const voiceGap =
        window.innerWidth <= 800
          ? valueVoiceMotion.deckVoiceGapMobilePx
          : valueVoiceMotion.deckVoiceGapPx;

      decks.forEach(({ element, cards }, passageIndex) => {
        if (!element) return;
        const progress = deckEntryProgress(passages[passageIndex], passageIndex);
        const exitProgress = deckReturnProgress(passageIndex);
        const deckBounds = element.getBoundingClientRect();
        const leadCard = cards[0];
        const leadTop = leadCard
          ? deckBounds.top + leadCard.offsetTop
          : deckBounds.top;
        const clearanceShift = Math.max(0, visibleVoiceBottom + voiceGap - leadTop);
        const maximumFanLayer = Math.ceil((cards.length - 1) / 2);

        cards.forEach((card, cardIndex) => {
          const enteringLaterDeck = passageIndex > 0;
          const riseProgress = clamp(
            (progress -
              (enteringLaterDeck
                ? valueVoiceMotion.deckIncomingRiseStart
                : valueVoiceMotion.deckRiseStart)) /
              (enteringLaterDeck
                ? valueVoiceMotion.deckIncomingRiseDistance
                : valueVoiceMotion.deckRiseDistance),
          );
          const fanLayer = Math.ceil(cardIndex / 2);
          const fanProgress = clamp(
            (progress -
              (enteringLaterDeck
                ? valueVoiceMotion.deckIncomingFanStart
                : valueVoiceMotion.deckFanStart) -
              fanLayer * valueVoiceMotion.deckFanLayerStagger) /
              (enteringLaterDeck
                ? valueVoiceMotion.deckIncomingFanDistance
                : valueVoiceMotion.deckFanDistance),
          );
          const rise = settleWithOvershoot(riseProgress);
          const fan = settleWithOvershoot(fanProgress);
          const visibility = smooth(
            clamp(
              (progress -
                (enteringLaterDeck
                  ? valueVoiceMotion.deckIncomingRiseStart
                  : valueVoiceMotion.deckRiseStart) -
                cardIndex * valueVoiceMotion.deckOpacityStagger) /
                valueVoiceMotion.deckOpacityDistance,
            ),
          );
          const reverseFanLayer = Math.max(0, maximumFanLayer - fanLayer);
          const gather = smooth(
            clamp(
              (exitProgress -
                reverseFanLayer * valueVoiceMotion.deckGatherLayerStagger) /
                valueVoiceMotion.deckGatherDistance,
            ),
          );
          const tuck = smooth(
            clamp(
              (exitProgress - valueVoiceMotion.deckTuckStart) /
                valueVoiceMotion.deckTuckDistance,
            ),
          );
          const hide = smooth(
            clamp(
              (exitProgress - valueVoiceMotion.deckHideStart) /
                valueVoiceMotion.deckHideDistance,
            ),
          );
          const opacity = visibility * (1 - hide);
          const targetX = deckBounds.left + card.offsetLeft;
          const targetY =
            deckBounds.top + card.offsetTop + card.offsetHeight * 0.24;
          const stackOffsetX = (cardIndex - (cards.length - 1) / 2) * 5;
          const stackOffsetY = cardIndex * 3;
          const stackX = window.innerWidth * 0.5 + stackOffsetX;
          const stackY =
            window.innerHeight * valueVoiceMotion.deckStackViewportY + stackOffsetY;
          const targetTilt = Number.parseFloat(card.dataset.targetTilt ?? '0');
          const stackedTilt = (cardIndex - (cards.length - 1) / 2) * 0.45;
          const enteredRotation = mix(stackedTilt, targetTilt, fan);
          const rotation = mix(enteredRotation, stackedTilt, gather);
          const enteredScale =
            valueVoiceMotion.deckSourceScale +
            (valueVoiceMotion.deckStackScale - valueVoiceMotion.deckSourceScale) * rise +
            (1 - valueVoiceMotion.deckStackScale) * fan;
          const gatheredScale = mix(
            enteredScale,
            valueVoiceMotion.deckStackScale,
            gather,
          );
          const scale = mix(
            gatheredScale,
            valueVoiceMotion.deckTuckScale,
            tuck,
          );
          const cardSourceY =
            boxMouthY +
            card.offsetHeight * 0.24 * valueVoiceMotion.deckSourceScale +
            valueVoiceMotion.deckBoxMouthInsetPx;
          const risenX = sourceX + (stackX - sourceX) * rise;
          const risenY = cardSourceY + (stackY - cardSourceY) * rise;
          const enteredX = mix(risenX, targetX, fan);
          const enteredY = mix(risenY, targetY, fan);
          const gatheredX = mix(enteredX, stackX, gather);
          const gatheredY = mix(enteredY, stackY, gather);
          const currentX = mix(gatheredX, sourceX, tuck);
          const currentY = mix(gatheredY, cardSourceY, tuck);
          const translateX = currentX - targetX;
          const translateY =
            currentY - targetY + clearanceShift * fan * (1 - gather);
          const projectedTop = currentY - card.offsetHeight * 0.24 * scale;
          const projectedHeight = Math.max(1, card.offsetHeight * scale);
          const visibleAboveBox = clamp((boxMouthY - projectedTop) / projectedHeight);
          const entryOcclusion = 1 - smooth(riseProgress);
          const exitOcclusion = clamp(tuck * 2.5);
          const occlusionWeight = Math.max(entryOcclusion, exitOcclusion);
          const clippedFraction = (1 - visibleAboveBox) * occlusionWeight;

          card.style.opacity = opacity.toFixed(4);
          card.style.clipPath = `inset(0 0 ${(clippedFraction * 100).toFixed(3)}% 0)`;
          card.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(3)}deg)`;
          card.style.pointerEvents = fanProgress > 0.96 && exitProgress < 0.04
            ? 'auto'
            : 'none';
        });
      });
    };

    const paintVoiceExit = () => {
      const exit = smooth(
        clamp(
          (deckReturnProgress(decks.length - 1) - valueVoiceMotion.deckVoiceHandoffStart) /
            valueVoiceMotion.deckVoiceHandoffDistance,
        ),
      );
      voice.style.setProperty('--voice-story-opacity', (1 - exit).toFixed(4));
    };

    const paintVoicePosition = () => {
      const firstHandoff = smooth(firstTransitionProgress(passages[0]));
      const liftDistance =
        window.innerWidth <= 800
          ? valueVoiceMotion.voiceLiftMobileVh
          : valueVoiceMotion.voiceLiftVh;
      const lift = firstHandoff * liftDistance;
      voice.style.transform = `translate3d(0, ${(-lift).toFixed(3)}vh, 0)`;
    };

    const paintBoxAfterValues = () => {
      const top = personalNote.getBoundingClientRect().top;
      const start = window.innerHeight * valueVoiceMotion.boxContinuationViewportStart;
      const distance = window.innerHeight * valueVoiceMotion.boxContinuationDistance;
      const progress = smooth(clamp((start - top) / Math.max(1, distance)));
      const shiftY =
        -window.innerHeight * valueVoiceMotion.boxContinuationLiftVh * progress;
      boxMotion.style.setProperty('--box-after-values-y', `${shiftY.toFixed(2)}px`);
    };

    const render = () => {
      this.frame = 0;

      if (reducedMotion.matches) {
        resetDecks();
        voice.style.setProperty('--voice-story-opacity', '1');
        voice.style.removeProperty('transform');
        boxMotion.style.removeProperty('--box-after-values-y');
        let active = 0;
        passages.forEach((passage, index) => {
          if (passage.getBoundingClientRect().top < window.innerHeight * valueVoiceMotion.reducedMotionThreshold) {
            active = index + 1;
          }
        });
        showOnly(active);
        return;
      }

      paintVoicePosition();
      paintVoiceExit();
      paintDecks();
      paintBoxAfterValues();

      const transitions = passages.map(transitionProgress);
      const activeTransition = transitions.findIndex((progress) => progress > 0 && progress < 1);

      if (activeTransition === -1) {
        let active = 0;
        transitions.forEach((progress, index) => {
          if (progress >= 1) active = index + 1;
        });
        showOnly(active);
        return;
      }

      const progress = smooth(transitions[activeTransition]);
      const outgoingIndex = activeTransition;
      const incomingIndex = activeTransition + 1;
      lastShownLayer = -1;
      const outgoingOpacity = Math.cos(progress * Math.PI * 0.5) ** 2;
      const incomingOpacity = Math.sin(progress * Math.PI * 0.5) ** 2;
      const outgoingBlur =
        valueVoiceMotion.morphBlur * smooth(clamp(progress / valueVoiceMotion.morphBlurRamp));
      const incomingBlur =
        valueVoiceMotion.morphBlur *
        smooth(clamp((1 - progress) / valueVoiceMotion.morphBlurRamp));

      layers.forEach((layer, index) => {
        if (index === outgoingIndex) {
          setLayer(layer, outgoingOpacity, outgoingBlur);
        } else if (index === incomingIndex) {
          setLayer(layer, incomingOpacity, incomingBlur);
        } else {
          setLayer(layer, 0, 0);
        }

        const interactive = index === (progress < 0.5 ? outgoingIndex : incomingIndex);
        layer.style.pointerEvents = interactive ? 'auto' : 'none';
        if (interactive) layer.removeAttribute('aria-hidden');
        else layer.setAttribute('aria-hidden', 'true');
        layer.querySelectorAll<HTMLButtonElement>('[data-word-cycle]').forEach((button) => {
          button.tabIndex = interactive ? 0 : -1;
        });
      });
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    window.addEventListener('scroll', requestRender, { passive: true, signal });
    window.addEventListener('resize', requestRender, { passive: true, signal });
    reducedMotion.addEventListener('change', requestRender, { signal });
    render();
  }

  disconnectedCallback() {
    this.abort?.abort();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    this.wordCleanupTimers.forEach((timer) => window.clearTimeout(timer));
    this.wordCleanupTimers.clear();
    this.wordMorphFrames.forEach((frame) => window.cancelAnimationFrame(frame));
    this.wordMorphFrames.clear();
    const voice = this.querySelector<HTMLElement>('[data-value-voice]');
    if (voice) delete voice.dataset.enhanced;
    this.querySelector<HTMLElement>('.opening-sequence__motion')?.style.removeProperty(
      '--box-after-values-y',
    );
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('value-story')) {
  customElements.define('value-story', ValueStory);
}
