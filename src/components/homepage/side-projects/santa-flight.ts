import { panFor, play } from '@foleyjs/core';

const flightElements = document.querySelectorAll<HTMLElement>("santa-flight");

flightElements.forEach((flight) => {
  const control = flight.querySelector<HTMLButtonElement>(
    ".santa-flight__scene",
  );
  const sleigh = flight.querySelector<HTMLElement>("[data-sleigh-path]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (!control || !sleigh || flight.dataset.bound === "true") return;
  flight.dataset.bound = "true";

  let frame = 0;
  let lastTime = 0;
  let y = 0;
  let velocity = 0;
  let pressed = false;
  let engaged = false;
  let visible = true;
  let activePointer: number | undefined;

  const bounds = () => control.clientHeight * 0.28;

  const render = () => {
    sleigh.style.transform = `translate3d(-50%, calc(-50% + ${y.toFixed(2)}px), 0)`;
  };

  const tick = (time: number) => {
    if (!engaged || !visible || reduceMotion.matches) {
      frame = 0;
      lastTime = 0;
      return;
    }

    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.032) : 0;
    lastTime = time;

    const acceleration = pressed ? -680 : 520;
    const limit = control.clientHeight * 0.72;
    velocity = Math.min(
      limit,
      Math.max(-limit, velocity + acceleration * delta),
    );
    y += velocity * delta;

    const bound = bounds();
    if (y <= -bound || y >= bound) {
      y = Math.min(bound, Math.max(-bound, y));
      velocity = 0;
    }

    render();
    frame = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    if (frame || !visible || reduceMotion.matches) return;
    frame = requestAnimationFrame(tick);
  };

  const resetToIdle = () => {
    if (frame) cancelAnimationFrame(frame);
    if (
      activePointer !== undefined &&
      control.hasPointerCapture(activePointer)
    ) {
      control.releasePointerCapture(activePointer);
    }
    frame = 0;
    lastTime = 0;
    y = 0;
    velocity = 0;
    pressed = false;
    engaged = false;
    activePointer = undefined;
    flight.removeAttribute("data-engaged");
    flight.removeAttribute("data-pressed");
    sleigh.style.transform = "";
  };

  const engage = () => {
    if (engaged) return;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(sleigh).transform);
    y = matrix.m42 + sleigh.offsetHeight / 2;
    engaged = true;
    flight.dataset.engaged = "true";
    render();
  };

  const setPressed = (next: boolean) => {
    const changed = pressed !== next || !engaged;
    engage();
    pressed = next;
    flight.toggleAttribute("data-pressed", next);
    velocity *= 0.72;
    startLoop();
    if (changed) play("swoosh", { pan: panFor(control) });
  };

  control.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    activePointer = event.pointerId;
    control.setPointerCapture(event.pointerId);
    setPressed(true);
  });

  control.addEventListener("pointerup", (event) => {
    if (activePointer !== event.pointerId) return;
    activePointer = undefined;
    setPressed(false);
  });

  control.addEventListener("pointercancel", () => {
    resetToIdle();
  });

  flight.addEventListener("pointerleave", () => {
    if (finePointer.matches) resetToIdle();
  });

  control.addEventListener("keydown", (event) => {
    if ((event.key !== " " && event.key !== "Enter") || event.repeat) return;
    event.preventDefault();
    setPressed(true);
  });

  control.addEventListener("keyup", (event) => {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    setPressed(false);
  });

  const observer = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? false;
    flight.dataset.visible = String(visible);
    if (visible) startLoop();
    else if (frame) cancelAnimationFrame(frame);
    if (!visible) {
      resetToIdle();
    }
  });
  observer.observe(flight);

  reduceMotion.addEventListener("change", () => {
    if (reduceMotion.matches && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      y = 0;
      velocity = 0;
      render();
    } else {
      startLoop();
    }
  });
});
