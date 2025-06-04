import { Component, HostBinding, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timer } from '../timer/timer.interface';
import { initialTimerState } from '../pomodoro-timer.state';
import { Store } from '@ngrx/store';
import { PomodoroTimerState } from '../pomodoro-timer-state.interface';
import { resetConfigAction, setConfigAction } from './config.actions';

@Component({
  selector: 'pt-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.sass'
})
export class ConfigComponent {
  @HostBinding('class.active') isActive = true;
  
  private store: Store<PomodoroTimerState> = inject(Store<PomodoroTimerState>);
  private formBuilder: FormBuilder = inject(FormBuilder);

  configForm: FormGroup = this.formBuilder.group({
		workTime: [30, [Validators.max(60), Validators.min(1)]],
		shortBreakTime: [5, [Validators.max(60), Validators.min(1)]],
		longBreakTime: [15, [Validators.max(60), Validators.min(1)]],
		cycles: [1, [Validators.max(20), Validators.min(1)]],
	}) 

  constructor() {
    let {status, ...timerState} = initialTimerState;
    this.configForm.patchValue(timerState);
  }

  setConfig(){
    this.store.dispatch(setConfigAction({ timer: this.configForm.value as Partial<Timer> }));
    console.log("config form setted",this.configForm.value as Partial<Timer>);
  }

  resetConfig(){
    let {status, ...timerState} = initialTimerState;
    this.configForm.patchValue(timerState)
    this.store.dispatch(resetConfigAction({ timer: timerState }));  
    console.log("config form resetted", timerState as Partial<Timer>);
  }

}
