const MOBILE_UA_REGEX =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  const hasTouch = navigator.maxTouchPoints > 0;
  const coarsePointer =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const mobileUA = MOBILE_UA_REGEX.test(navigator.userAgent);

  return hasTouch && (coarsePointer || mobileUA);
}

function vibrate(pattern: number | number[]): void {
  if (!isMobileDevice()) {
    return;
  }
  if (typeof navigator.vibrate !== "function") {
    return;
  }
  navigator.vibrate(pattern);
}

export function hapticAttackSent(): void {
  vibrate(10);
}

export function hapticIncomingAttack(): void {
  vibrate([25, 30, 25]);
}
