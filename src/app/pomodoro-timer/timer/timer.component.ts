import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Duration } from 'luxon'
import { TimerService } from '../services/timer-service/timer.service';
import { formatDurationToMinutesSeconds } from '../helpers/format-duration.helper';
import { phaseStatus, runningStatus } from '../services/timer-service/timer.status';

@Component({
	selector: 'pt-timer',
	templateUrl: './timer.component.html',
	styleUrl: './timer.component.sass',
})
export class TimerComponent {

	private timerService: TimerService = inject(TimerService);

	currentTime?: Duration
	currentTimeFormatted?: string
	currentStatus?: string
	currentCycle?: number 
	currentPhase?: string
	
	timerSubscription?: Subscription
	controllerSubscription?: Subscription

	constructor() {	
		this.controllerSubscription = this.timerService.controller.subscribe({
			next: (value) => this.currentStatus = value,
			error: (error) => console.error(error),
			complete: () => console.log("Controller Transmission Complete")
		})
		this.resetScreen()
	}

	resetScreen(){
		this.currentTime = Duration.fromObject({seconds: 0})
		this.currentTimeFormatted = formatDurationToMinutesSeconds(this.currentTime)
		this.currentStatus = runningStatus.STOPPED
		this.currentCycle = 0
		this.currentPhase = phaseStatus.WORK		
	}

	start(){
		this.stop()
		this.timerService.start()
		this.timerSubscription = this.timerService.timer?.subscribe({
			next: (value) => {
				this.currentTimeFormatted = formatDurationToMinutesSeconds(value.currentTime)
				this.currentTime = value.currentTime
				this.currentCycle = value.currentCycle
				this.currentPhase = value.currentPhase
			},
			error: (error) => { 
				console.error(error)
				this.resetScreen()
			},
			complete: () => { 
				console.log("Timer Transmission Complete")
				this.resetScreen()
			}
		})
	}
	
	pause(){
		this.timerService.pause()
	}
	
	stop(){
		this.timerSubscription?.unsubscribe()
		this.timerSubscription = undefined
		this.timerService.stop()
		this.resetScreen()
	}
	
	resume(){
		this.timerService.resume()
	}

	
}
