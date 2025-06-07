import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'pt-appbar',
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.sass'
})
export class AppbarComponent {
  @Output() toggleConfig: EventEmitter<void> = new EventEmitter<void>();

  showconfigMenu() {
    this.toggleConfig.emit();
  }
  
}
