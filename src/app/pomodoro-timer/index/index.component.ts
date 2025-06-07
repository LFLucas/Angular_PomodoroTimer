import { AfterViewInit, Component, Host, HostBinding, viewChild, ViewChild } from '@angular/core';
import { AppbarComponent } from '../appbar/appbar.component';
import { ConfigComponent } from '../config/config.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'pt-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.sass'
})
export class IndexComponent implements AfterViewInit{
  @ViewChild('appbar') appbarComponent!: AppbarComponent
  @ViewChild('config') configComponent!: ConfigComponent
  @ViewChild('timer') timerComponent!: TimerComponent
  
  ngAfterViewInit(): void {}

  showConfigMenu() {
    this.configComponent.isActive = !this.configComponent.isActive;
    console.log("Menu activation:", this.configComponent.isActive);
  }

}
