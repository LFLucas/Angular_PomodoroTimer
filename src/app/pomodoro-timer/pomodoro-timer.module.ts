import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { PomodoroTimerRoutingModule } from './pomodoro-timer-routing.module';
import { ConfigComponent } from './config/config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { TimerComponent } from './timer/timer.component';
import { StoreModule } from '@ngrx/store';
import { timerReducer } from './services/config-service/config.reducer';
import { AppbarComponent } from './appbar/appbar.component';
import { TimerService } from './services/timer-service/timer.service';
import { ConfigService } from './services/config-service/config.service';
import { SoundService } from './services/sound-service/sound.service';


@NgModule({
  declarations: [
    ConfigComponent,
    IndexComponent,
    TimerComponent,
    AppbarComponent,
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
  ],
  providers: [
    TimerService,
    ConfigService,
    SoundService
  ]
})
export class PomodoroTimerModule { }
