import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PomodoroTimerState } from '../../pomodoro-timer-state.interface';
import { RawTimer, Timer } from '../timer-service/timer.interface';
import { Duration } from 'luxon';
import { resetConfigAction, setConfigAction } from './config.actions';
import { initialTimerState } from '../../pomodoro-timer.state';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private store: Store<PomodoroTimerState> = inject(Store<PomodoroTimerState>);
  constructor() { }

  setConfig(timer: RawTimer){
    let config = {
      workTime: Duration.fromObject({minutes: timer.workTime}),
      shortBreakTime: Duration.fromObject({minutes: timer.shortBreakTime}),
      longBreakTime: Duration.fromObject({minutes: timer.longBreakTime}),
      cycles: timer.cycles
    }
    this.store.dispatch(setConfigAction({ timer: config  }));
  }

  resetConfig(){
    let config = {
      workTime: initialTimerState.workTime,
      shortBreakTime: initialTimerState.shortBreakTime,
      longBreakTime: initialTimerState.longBreakTime,
      cycles: initialTimerState.cycles
    }
    this.store.dispatch(resetConfigAction({ timer: config  }))
  }

}
