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

	currentTime?: number
	currentStatus?: string
	previousStatus?: string
	countdown?: ReturnType<typeof setInterval>;

	private store: Store<PomodoroTimerState> = inject(Store<PomodoroTimerState>)

	constructor() {
		this.timer$ = this.store.select(selectTimer)
		this.timer$.subscribe({
			next:(timer) => { this.timer = timer },
			error:(err) => { console.error('Error fetching timer:', err) },
			complete:() => { console.log('Timer data fetching done') }
		})	
	}

	async startWork() {
		this.currentTime = minutesToSeconds(this.timer.workTime)
		this.previousStatus = this.currentStatus
		this.currentStatus = timerStatus.WORK
		if (this.countdown) { clearInterval(this.countdown) }
		this.countdown = setInterval(() => {
			if (this.currentTime && this.currentTime > 0) {
				this.currentTime = this.currentTime - 1
			} else { this.stop() }
		}, 1000)
	}

	async startShortBreak() {
		this.currentTime = minutesToSeconds(this.timer.shortBreakTime)
		this.previousStatus = this.currentStatus
		this.currentStatus = timerStatus.SHORT_BREAK
		if (this.countdown) { clearInterval(this.countdown) }
		this.countdown = setInterval(() => {
			if (this.currentTime && this.currentTime > 0) {
				this.currentTime = this.currentTime - 1
			} else { this.stop() }
		}, 1000)
	}

	async startLongBreak() {
		this.currentTime = minutesToSeconds(this.timer.longBreakTime)
		this.previousStatus = this.currentStatus
		this.currentStatus = timerStatus.LONG_BREAK
		if (this.countdown) { clearInterval(this.countdown) }
		this.countdown = setInterval(() => {
			if (this.currentTime && this.currentTime > 0) {
				this.currentTime = this.currentTime - 1
			} else { this.stop() }
		}, 1000)
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
	
	async startCycles() {
		for (let i = 1; i <= this.timer.cycles; i++) {
			await this.startWork()
			await this.startShortBreak()
			await this.startWork()
			await this.startShortBreak()
			await this.startWork()
			await this.startLongBreak()
		}
	}

	
}
