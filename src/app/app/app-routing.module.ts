import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'pomodoro-timer', pathMatch: 'full' },
  { path:'pomodoro-timer', loadChildren: () => import('../pomodoro-timer/pomodoro-timer.module').then(m => m.PomodoroTimerModule) }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
