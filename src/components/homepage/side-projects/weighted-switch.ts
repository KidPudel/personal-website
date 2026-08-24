import { panFor, play } from '@foleyjs/core';

const SQUASH = 0.78;
const STRETCH = 1.08;
const T_ANTI = 0.06;
const T_TRAVEL = 0.18;
const T_SETTLE = 0.14;

type MotionTimes = {
  anti: number;
  travel: number;
  settle: number;
};

type SwitchPose = {
  x: number;
  sx: number;
};

type WeightedRun = {
  t0: number;
  on: boolean;
  times: MotionTimes;
};

const switches = document.querySelectorAll<HTMLElement>('weighted-switch');

switches.forEach((root) => {
  const control = root.querySelector<HTMLButtonElement>('.weighted-switch__control');
  const thumb = root.querySelector<HTMLElement>('.weighted-switch__thumb');
  const fill = root.querySelector<HTMLElement>('.weighted-switch__fill');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!control || !thumb || !fill || root.dataset.bound === 'true') return;
  root.dataset.bound = 'true';

  let weightedRun: WeightedRun | null = null;
  let weightedRest = { x: 0, ready: false };
  let weightedGeneration = 0;
  let activeThumbAnimation: Animation | null = null;
  let activeFillAnimation: Animation | null = null;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const easeOut = (value: number) => 1 - (1 - value) ** 4;

  const travel = () => {
    const styles = getComputedStyle(control);
    const padding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
    return control.clientWidth - padding - thumb.offsetWidth;
  };

  const restX = (on: boolean) => (on ? travel() : 0);

  const motionTimes = (anticipate: boolean): MotionTimes => ({
    anti: anticipate ? T_ANTI : 0,
    travel: T_TRAVEL,
    settle: T_SETTLE,
  });

  const scaleEnvelope = (progress: number) => {
    const peak = 0.42;
    if (progress < peak) {
      const weight = easeOut(progress / peak);
      return SQUASH + (STRETCH - SQUASH) * weight;
    }

    const weight = (progress - peak) / (1 - peak);
    return STRETCH + (SQUASH - STRETCH) * weight;
  };

  const weightedPose = (
    time: number,
    on: boolean,
    width: number,
    availableTravel: number,
    times: MotionTimes,
  ): SwitchPose => {
    const inner = availableTravel + width;

    if (times.anti > 0 && time <= times.anti) {
      const anticipation = easeOut(time / times.anti);
      const sx = 1 - (1 - SQUASH) * anticipation;
      return { x: on ? 0 : inner - width * sx, sx };
    }

    if (time <= times.anti + times.travel) {
      const progress = easeOut((time - times.anti) / times.travel);
      const sx = scaleEnvelope(progress);
      const visibleWidth = width * sx;
      const x = on
        ? clamp(
            visibleWidth + progress * (inner - visibleWidth) - visibleWidth,
            0,
            inner - visibleWidth,
          )
        : (1 - progress) * (inner - visibleWidth);
      return { x, sx };
    }

    const settle = easeOut((time - times.anti - times.travel) / times.settle);
    const sx = SQUASH + (1 - SQUASH) * settle;
    const visibleWidth = width * sx;
    return { x: on ? inner - visibleWidth : 0, sx };
  };

  const fillStyle = (pose: SwitchPose, width: number, availableTravel: number) => {
    const trackWidth = control.clientWidth;
    const padding = Number.parseFloat(getComputedStyle(control).paddingLeft);
    const visibleWidth = width * pose.sx;
    const progress = availableTravel <= 0 ? 0 : pose.x / availableTravel;
    const thumbRight = padding + pose.x + visibleWidth;
    const side = clamp((progress - 0.86) / 0.14, 0, 1);
    const follow = thumbRight + (trackWidth - thumbRight) * side;
    const shown = clamp(progress / 0.16, 0, 1);
    const edge = follow * shown;
    const blur = 16 * shown * (1 - side);
    const tuck = (1 - shown) * 32;

    return {
      transform: `translate3d(${(edge - trackWidth - tuck).toFixed(2)}px, 0, 0)`,
      filter: `blur(${blur.toFixed(2)}px)`,
    };
  };

  const paint = (x: number, sx: number) => {
    const width = thumb.offsetWidth;
    const availableTravel = travel();
    thumb.style.transformOrigin = 'left center';
    thumb.style.transform = `translate3d(${x}px, 0, 0) scaleX(${sx})`;
    const style = fillStyle({ x, sx }, width, availableTravel);
    fill.style.transform = style.transform;
    fill.style.filter = style.filter;
  };

  const currentThumbX = (nextOn: boolean) => {
    if (weightedRun) {
      const elapsed = Math.max(0, (performance.now() - weightedRun.t0) / 1000);
      return weightedPose(
        elapsed,
        weightedRun.on,
        thumb.offsetWidth,
        travel(),
        weightedRun.times,
      ).x;
    }

    if (weightedRest.ready) return weightedRest.x;
    return restX(!nextOn);
  };

  const stop = () => {
    activeThumbAnimation?.cancel();
    activeFillAnimation?.cancel();
    activeThumbAnimation = null;
    activeFillAnimation = null;
    weightedRun = null;
  };

  const rest = (on: boolean) => {
    weightedRest = { x: restX(on), ready: true };
    weightedRun = null;
  };

  const commitPlay = (
    element: HTMLElement,
    keyframes: Keyframe[],
    duration: number,
    apply: (frame: Keyframe) => void,
  ) => {
    const animation = element.animate(keyframes, {
      duration,
      fill: 'forwards',
      easing: 'linear',
    });

    animation.finished
      .then(() => {
        animation.cancel();
        apply(keyframes[keyframes.length - 1]!);
      })
      .catch(() => {});

    return animation;
  };

  const snap = (on: boolean) => {
    stop();
    rest(on);
    paint(weightedRest.x, 1);
  };

  const animate = (on: boolean) => {
    const availableTravel = travel();
    const width = thumb.offsetWidth;
    const previousX = currentThumbX(on);

    stop();

    if (reduceMotion.matches) {
      snap(on);
      return;
    }

    const fromRest = Math.abs(previousX - restX(!on)) < 10;
    const times = motionTimes(fromRest);
    const duration = Math.round((times.anti + times.travel + times.settle) * 1000);
    const steps = Math.max(28, Math.round(duration / 8));
    const seconds = duration / 1000;
    const thumbFrames: Keyframe[] = [];
    const fillFrames: Keyframe[] = [];

    for (let index = 0; index <= steps; index += 1) {
      const offset = index / steps;
      const time = seconds * offset;
      const pose = weightedPose(time, on, width, availableTravel, times);
      const thumbFrame: Keyframe = {
        offset,
        transform: `translate3d(${pose.x}px, 0, 0) scaleX(${pose.sx})`,
      };
      const style = fillStyle(pose, width, availableTravel);
      const fillFrame: Keyframe = {
        offset,
        transform: style.transform,
        filter: style.filter,
      };

      if (index < steps) {
        thumbFrame.easing = 'linear';
        fillFrame.easing = 'linear';
      }

      thumbFrames.push(thumbFrame);
      fillFrames.push(fillFrame);
    }

    const generation = ++weightedGeneration;
    thumb.style.transformOrigin = 'left center';
    fill.style.transform = String(fillFrames[0]!.transform);
    fill.style.filter = String(fillFrames[0]!.filter);
    weightedRun = { t0: performance.now(), on, times };

    activeThumbAnimation = commitPlay(thumb, thumbFrames, duration, (end) => {
      if (generation !== weightedGeneration) return;
      thumb.style.transform = String(end.transform);
      rest(on);
    });
    activeFillAnimation = commitPlay(fill, fillFrames, duration, (end) => {
      if (generation !== weightedGeneration) return;
      fill.style.transform = String(end.transform);
      fill.style.filter = String(end.filter);
    });
  };

  const setChecked = (on: boolean) => {
    control.setAttribute('aria-checked', String(on));
    animate(on);
  };

  control.addEventListener('click', () => {
    const nextOn = control.getAttribute('aria-checked') !== 'true';
    setChecked(nextOn);
    play(nextOn ? 'switch' : 'tap', { pan: panFor(control) });
  });

  reduceMotion.addEventListener('change', () => {
    snap(control.getAttribute('aria-checked') === 'true');
  });

  snap(true);
});
