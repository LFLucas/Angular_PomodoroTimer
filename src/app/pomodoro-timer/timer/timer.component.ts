import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Duration } from 'luxon'
import { TimerService } from '../services/timer-service/timer.service';
import { formatDurationToMinutesSeconds } from '../helpers/format-duration.helper';

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
			error: (error) => console.error(error),
			complete: () => console.log("Timer Transmission Complete")
		})
	}
	
	pause(){
		this.timerService.pause()
	}
	
	stop(){
		this.timerSubscription?.unsubscribe()
		this.timerSubscription = undefined
		this.timerService.stop()
	}
	
	resume(){
		this.timerService.resume()
	}

	
}












/*
constructor() {
		this.timer$.subscribe({
			next: (timer: Timer) => { 
				this.timer = timer 
				this.currentTime = Duration.fromObject({ minutes: timer.workTime })
				this.currentStatus = timer.status
				this.currentCycle = timer.cycles
				this.currentTimeString = this.currentTime.toFormat('mm:ss')
				console.log(this.currentTimeString)

			},
			error: (err) => console.error('Error fetching timer:', err),
			complete: () => console.log('Timer subscription completed')
		});
	}

	async start(time: number, status: string) {
		this.currentTime = Duration.fromObject({ minutes: time })
		this.currentTimeString = this.currentTime.toFormat('mm:ss')
		console.log(this.currentTimeString)
		this.previousStatus = this.currentStatus
		this.currentStatus = status

		if (this.countdown) { 
			clearInterval(this.countdown) 
		}
		
		return new Promise<void>( (resolve) => {
			this.countdown = setInterval(() => {
				if (this.currentTime && this.currentTime.as('seconds') > 0) {
					this.currentTime.minus({seconds: 1})
					this.currentTimeString = this.currentTime.toFormat('mm:ss')
					console.log(this.currentTimeString)
				} else {
					this.stop()
					resolve()
				}
		}, 1000) })
	}
	
	async stop() {
		this.previousStatus = this.currentStatus
		this.currentStatus = timerStatus.STOPPED
		this.currentTime = Duration.fromObject({ minutes: this.timer?.workTime })
		this.currentTimeString = this.currentTime.toFormat('mm:ss')
		console.log(this.currentTimeString)
		this.currentCycle = 0
		if (this.countdown) {
			clearInterval(this.countdown)
		}

	}
	
	async pause() {
		this.previousStatus = this.currentStatus
		this.currentStatus = timerStatus.PAUSED
		if (this.countdown) {
			clearInterval(this.countdown)
		}
	}
	
	async resume() {	
		this.currentStatus = this.previousStatus
		if (this.countdown) { clearInterval(this.countdown) }
		this.countdown = setInterval(() => {
			if (this.currentTime && this.currentTime.as('seconds') > 0) {
				this.currentTime.minus({seconds: 1})
				this.currentTimeString = this.currentTime.toFormat('mm:ss')
				console.log(this.currentTimeString)
			} else { 
				this.stop() 
			}
		}, 1000)
	}
	
	async runCycles() {
		const cycleSequence = [
			{ time: this.timer.workTime, status: timerStatus.WORK },
			{ time: this.timer.shortBreakTime, status: timerStatus.SHORT_BREAK },
			{ time: this.timer.workTime, status: timerStatus.WORK },
			{ time: this.timer.shortBreakTime, status: timerStatus.SHORT_BREAK },
			{ time: this.timer.workTime, status: timerStatus.WORK },
			{ time: this.timer.longBreakTime, status: timerStatus.LONG_BREAK }
		];

		for (let i = 1; i <= this.timer.cycles; i++) {
			this.currentCycle = i;
			for (const step of cycleSequence) {
				await this.start(step.time, step.status);
			}
		}
	}	

*/