import { Component, inject } from '@angular/core';
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

	timer$: Observable<Timer>
	timer!: Timer

	currentCycle?: number
	currentTime?: number
	currentStatus?: string
	previousStatus?: string
	countdown?: ReturnType<typeof setInterval>

	private store: Store<PomodoroTimerState> = inject(Store<PomodoroTimerState>)

	constructor() {
		this.timer$ = this.store.select(selectTimer)
		this.timer$.subscribe({
			next:(timer) => { this.timer = timer },
			error:(err) => { console.error('Error fetching timer:', err) },
			complete:() => { console.log('Timer data fetching done') }
		})	
	}

	async start(time: number, status: string) {
		this.currentTime = minutesToSeconds(time)
		this.previousStatus = this.currentStatus
		this.currentStatus = status
		if (this.countdown) { clearInterval(this.countdown) }
		return new Promise<void>((resolve) => {
			this.countdown = setInterval(() => {
				if (this.currentTime && this.currentTime > 0) {
					this.currentTime = this.currentTime - 1
				} else {
					clearInterval(this.countdown)
					this.stop()
					resolve() // Resolve a Promise quando o tempo acabar
				}
		}, 1000) })
	}
	
	async stop() {
		this.previousStatus = this.currentStatus
		this.currentStatus = timerStatus.STOPPED
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
		for (let i = 1; i <= this.timer.cycles; i++) {
			this.currentCycle = i
			await this.start(this.timer.workTime, timerStatus.WORK)
			await this.start(this.timer.shortBreakTime, timerStatus.SHORT_BREAK)
			await this.start(this.timer.workTime, timerStatus.WORK)
			await this.start(this.timer.shortBreakTime, timerStatus.SHORT_BREAK)
			await this.start(this.timer.workTime, timerStatus.WORK)
			await this.start(this.timer.longBreakTime, timerStatus.LONG_BREAK)
		}
	}	
}