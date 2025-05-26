import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { PomodoroTimerRoutingModule } from './pomodoro-timer-routing.module';
import { ConfigComponent } from './config/config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { TimerComponent } from './timer/timer.component';
import { StoreModule } from '@ngrx/store';
import { timerReducer } from './config/config.reducer';


@NgModule({
  declarations: [
    ConfigComponent,
    IndexComponent,
    TimerComponent
  ],
  imports: [
    StoreModule.forFeature({ 
      name:'timerState', 
      reducer: timerReducer 
    }),
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    PomodoroTimerRoutingModule
  ]
})
export class PomodoroTimerModule { }
