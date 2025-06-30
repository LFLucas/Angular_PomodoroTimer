import { Duration } from 'luxon';

export function formatDurationToMinutesSeconds(duration: Duration): string {
  const totalSeconds = Math.max(0, Math.floor(duration.as('seconds')));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}
