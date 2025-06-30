import { inject, Injectable } from '@angular/core';
import { PomodoroTimerState } from '../../pomodoro-timer-state.interface';
import { Store } from '@ngrx/store';
import { selectTimer } from '../config-service/config.selector';
import { interval, Observable, Subject, map, BehaviorSubject, filter, takeWhile, withLatestFrom, concat, concatMap, distinctUntilChanged, startWith, tap, finalize } from 'rxjs';
import { Countdown, Timer } from './timer.interface';
import { initialTimerState } from '../../pomodoro-timer.state';
import { Duration } from 'luxon'
import { RunningStatus, PhaseStatus, runningStatus, phaseStatus } from './timer.status';
import { SoundService } from '../sound-service/sound.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService{
  private store: Store<PomodoroTimerState> = inject(Store<PomodoroTimerState>)
  private soundService: SoundService = inject(SoundService)

  private timerState: Timer = {
    cycles: initialTimerState.cycles,
    longBreakTime: initialTimerState.longBreakTime,
    shortBreakTime: initialTimerState.shortBreakTime,
    workTime: initialTimerState.workTime 
  }

  private control$: BehaviorSubject<RunningStatus> = new BehaviorSubject<RunningStatus>(runningStatus.STOPPED)
  private timer$?: Observable<Countdown>

  get controller() { return this.control$.asObservable() }
  get timer() {
    if(this.timer$) return this.timer$
    else return undefined
  }

  constructor() {
    this.store.select(selectTimer).subscribe({
      next: (timer: Timer) => {
        this.stop()
        this.timerState = timer
      },
      error: (err) => console.error('Error fetching timer:', err),
      complete: () => console.log('Timer subscription completed')    
    })
  }

  private createCountdown(time: Duration, status: PhaseStatus, cycle: number){
    let _time = time.plus({seconds: 1}) 
    let _status = status 
    let _cycle = cycle
    return interval(1000).pipe(
      withLatestFrom(this.control$),
      filter(([_, control]) => control == runningStatus.STARTED),
      map(([_,control]) => {
        _time = _time.minus({seconds: 1})
        return {
          currentTime: _time,
          currentCycle: _cycle,
          currentPhase: _status
        } as Countdown
      }),
      tap((countdown) => {
        if (countdown.currentTime.as('seconds') == 5) this.soundService.play()
      }),
      takeWhile((countdown) => countdown.currentTime.as('seconds') >= 0, true),
      distinctUntilChanged((prev, curr) => 
        curr.currentCycle == prev.currentCycle &&
        curr.currentPhase == prev.currentPhase &&
        curr.currentTime.toISO() == prev.currentTime.toISO()
      ),
    )
  }

  private createTimer(cycles: number){
    let countdowns = []
    for (let cycle = 1; cycle <= cycles; cycle++){
      countdowns.push(
        this.createCountdown(this.timerState.workTime, phaseStatus.WORK, cycle),
        this.createCountdown(this.timerState.shortBreakTime, phaseStatus.SHORT_BREAK, cycle),
        this.createCountdown(this.timerState.workTime, phaseStatus.WORK, cycle),
        this.createCountdown(this.timerState.shortBreakTime, phaseStatus.SHORT_BREAK, cycle),
        this.createCountdown(this.timerState.workTime, phaseStatus.WORK, cycle),
        this.createCountdown(this.timerState.longBreakTime, phaseStatus.LONG_BREAK, cycle)
    )}
    return concat(...countdowns).pipe(
      takeWhile(() => this.control$.getValue() != runningStatus.STOPPED),
    )
  }

  start(){
    this.stop()
    this.control$.next(runningStatus.STARTED)
    this.timer$ = this.createTimer(this.timerState.cycles)
  }

  stop(){
    if (!this.timer$) return
    this.control$.next(runningStatus.STOPPED)
    this.timer$ = undefined
  }

  pause(){
    if (!this.timer$) return
    this.control$.next(runningStatus.PAUSED)
  }

  resume(){
    if (!this.timer$) return
    this.control$.next(runningStatus.STARTED)
  }
}