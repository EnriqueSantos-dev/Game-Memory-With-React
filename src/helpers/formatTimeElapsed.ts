export function formatTimeElapsed(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let minutesStr = `${minutes < 10 ? '0' + minutes : minutes}`;
  let secondsStr = `${seconds < 10 ? '0' + seconds : seconds}`;

  return `${minutesStr}:${secondsStr}`;
}
