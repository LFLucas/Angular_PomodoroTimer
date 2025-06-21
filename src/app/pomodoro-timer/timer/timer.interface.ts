import { Duration } from 'luxon';

export interface Timer{
  workTime: Duration,
  shortBreakTime: Duration,
  longBreakTime: Duration,
  status: string,
  cycles: number,
}

export interface Countdown  {
  currentTime: Duration,
  currentStatus: string,
  currentCycle: number,
}
