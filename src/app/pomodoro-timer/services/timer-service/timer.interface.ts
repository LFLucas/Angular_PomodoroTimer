import { Duration } from 'luxon';
import { PhaseStatus, RunningStatus } from './timer.status';

export interface Timer{
  workTime: Duration,
  shortBreakTime: Duration,
  longBreakTime: Duration,
  cycles: number,
}

export interface RawTimer{
  workTime: number,
  shortBreakTime: number,
  longBreakTime: number,
  cycles: number,
}

export interface Countdown  {
  currentTime: Duration,
  currentPhase: PhaseStatus
  currentCycle: number,
}
