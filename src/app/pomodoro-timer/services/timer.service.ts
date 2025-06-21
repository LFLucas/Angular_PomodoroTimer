import { inject, Injectable } from '@angular/core';
import { PomodoroTimerState } from '../pomodoro-timer-state.interface';
import { Store } from '@ngrx/store';
import { selectTimer } from '../config/config.selector';
import { interval, Observable, Subject, map } from 'rxjs';
import { Countdown, Timer } from '../timer/timer.interface';
import { initialTimerState } from '../pomodoro-timer.state';
import { Duration } from 'luxon'
import { timerStatus } from '../timer/timer.status';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
 
  private store: Store<PomodoroTimerState> = inject(Store<PomodoroTimerState>)
  private timerState?: Timer

  constructor() {
    this.store.select(selectTimer).subscribe({
      next: (timer: Timer) => this.timerState = timer,
      error: (err) => console.error('Error fetching timer:', err),
      complete: () => console.log('Timer subscription completed')    
    })
  }

  async start(timer: Duration, status: string):


}
