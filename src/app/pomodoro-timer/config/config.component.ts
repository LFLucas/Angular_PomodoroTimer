import { Component, HostBinding, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initialTimerState, rawInitialTimerState } from '../pomodoro-timer.state';
import { ConfigService } from '../services/config-service/config.service';

@Component({
  selector: 'pt-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.sass'
})
export class ConfigComponent {
  @HostBinding('class.active') isActive = false;
  
  
  private formBuilder: FormBuilder = inject(FormBuilder);
  private configService: ConfigService = inject(ConfigService)

  configForm: FormGroup = this.formBuilder.group({
		workTime: [30, [Validators.max(60), Validators.min(1)]],
		shortBreakTime: [5, [Validators.max(60), Validators.min(1)]],
		longBreakTime: [15, [Validators.max(60), Validators.min(1)]],
		cycles: [1, [Validators.max(20), Validators.min(1)]],
	}) 

  constructor() {
    this.configForm.patchValue(rawInitialTimerState);
  }

  setConfig(){
    this.configService.setConfig(this.configForm.value)
    console.log("Timer Setted")
  }

  resetConfig(){
    this.configForm.patchValue(initialTimerState)
    this.configService.resetConfig()
    this.configForm.patchValue(rawInitialTimerState);

    console.log("Timer Resetted")
  }

}
