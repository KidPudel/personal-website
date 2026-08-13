export const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const smooth = (value: number) => value * value * (3 - 2 * value);
