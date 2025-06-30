import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioPath: string = "../../../../assets/beep.mp3"

  constructor() { }
  
  play(){
    const beep = new Audio(this.audioPath)
    beep.play()
  }
}
