function relativeOffset(offset, base) {
  const event = offset.touches
    ? offset.touches.length === 0 ? offset.changedTouches[0] : offset.touches[0]
    : offset;
  const bounds = base.getBoundingClientRect();
  return {
    left: event.clientX - bounds.left,
    top: event.clientY - bounds.top,
  };
}

export function relativeMouseOffset(event, element) {
  return relativeOffset(event, element);
}

export function relativeTouchOffset(event) {
  const touch = event.touches.length === 0
    ? event.changedTouches[0]
    : event.touches[0];

  return relativeOffset(touch, element);
}

export function round(value, min, max, step) {
  if (value <= min) return min;

  const roundedMax = Math.floor((max - min) / step) * step + min;
  if (value >= roundedMax) return roundedMax;

  const normalize = (value - min) / step;
  const decimal = Math.floor(normalize);
  const fraction = normalize - decimal;

  if (fraction === 0) return value;

  return step * (fraction < 0.5 ? decimal : decimal + 1) + min;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
