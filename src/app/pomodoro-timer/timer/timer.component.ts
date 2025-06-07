import { Component, HostBinding, inject } from '@angular/core';
import { Timer } from './timer.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PomodoroTimerState } from '../pomodoro-timer-state.interface';
import { selectTimer } from '../config/config.selector';
import { timerStatus } from './timer.status';
import { minutesToSeconds } from 'date-fns'

@Component({
	selector: 'pt-timer',
	templateUrl: './timer.component.html',
	styleUrl: './timer.component.sass',
})
export class TimerComponent {
	
	$timer: Observable<Timer>
	timer!: Timer

	currentCycle?: number
	currentTime?: number
	currentStatus?: string
	previousStatus?: string
	countdown?: ReturnType<typeof setInterval>

	private store: Store<PomodoroTimerState> = inject(Store<PomodoroTimerState>)

	constructor() {
		this.$timer = this.store.select(selectTimer)
		this.$timer.subscribe({
			next:(timer) => { 
				this.timer = timer
				this.currentTime = minutesToSeconds(this.timer.workTime)
			},
			error:(err) => { console.error('Error fetching timer:', err) },
			complete:() => { console.log('Timer data fetching done') }
		})
		this.currentStatus = this.timer.status
		this.currentCycle = 0
	}

	async start(time: number, status: string) {
		this.currentTime = minutesToSeconds(time)
		this.previousStatus = this.currentStatus
		this.currentStatus = status

		if (this.countdown) { 
			clearInterval(this.countdown) 
		}
		
		return new Promise<void>( (resolve) => {
			this.countdown = setInterval(() => {
				if (this.currentTime && this.currentTime > 0) {
					this.currentTime = this.currentTime - 1
				} else {
					clearInterval(this.countdown)
					this.stop()
					resolve()
				}
		}, 1000) })
	}
	
	async stop() {
		this.previousStatus = this.currentStatus
		this.currentStatus = timerStatus.STOPPED
		this.currentTime = minutesToSeconds(this.timer.workTime)
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
			if (this.currentTime && this.currentTime > 0) {
				this.currentTime = this.currentTime - 1
			} else { this.stop() }
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
}