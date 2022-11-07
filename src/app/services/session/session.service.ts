import { Injectable } from '@angular/core';
import { SessionData } from 'src/app/model/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionsHistorical: SessionData[] = [];
  actualSession: SessionData;

  // audio & sounds
  audioSound = new Audio();
  onTargetAudio = new Audio();
  shootAudio = new Audio();
  waterSplash = new Audio();
  win = new Audio();
  lost = new Audio();

  constructor() {
    this.actualSession = new SessionData(999);
    this.audioSound.src = "./../assets/sounds/advent.mp3";
    this.audioSound.preload = 'none';
    this.onTargetAudio.src = "./../assets/sounds/mixkit-sea-mine-explosion-1184.wav";
    this.shootAudio.src = "./../assets/sounds/mixkit-arcade-fast-game-over-233.wav";
    this.waterSplash.src = "./../assets/sounds/mixkit-water-splash-1311.wav";
    this.waterSplash.src = "./../assets/sounds/mixkit-water-splash-1311.wav";
    this.waterSplash.src = "./../assets/sounds/mixkit-water-splash-1311.wav";
    this.onTargetAudio.load();
    this.shootAudio.load();
    this.shootAudio.volume = 0.1;
    this.waterSplash.load();
    this.win.load();
    this.lost.load();
  }

  playSound(name: string) {
    if (this.actualSession.soundsOn) {
      switch (name) {
        case 'shoot':
          this.shootAudio.play();
          break;
        case 'onTarget':
          this.onTargetAudio.play();
          break;
        case 'water':
          this.waterSplash.play();
          break;
        case 'win':
          this.win.play();
          break;
        case 'lost':
          this.lost.play();
          break;
        default:
          break;
      }
    }
  }

  setUsrSessionName(name: string) {
    console.log(name)
    this.actualSession.userName = name;
  }

  setUsrAtteptsConfig(value: number) {
    this.actualSession.attemptsSelection = value
  }

  setMusicStatus(value: boolean) {
    if (value) {
      this.audioSound.play();
      this.actualSession.musicOn = true;
    }
    if (!value) {
      this.audioSound.pause();
      this.actualSession.musicOn = false;
    }
  }

  setSoundsStatus(value: boolean) {
    if (value) {
      this.actualSession.soundsOn = true;
    }
    if (!value) {
      this.actualSession.soundsOn = false;
    }
  }

}
