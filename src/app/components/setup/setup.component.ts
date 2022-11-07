import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  nameStored: string = '';
  attempts: { id: string, value: number, checked: boolean }[] = [
    { id: 'HARD', value: 50, checked: false },
    { id: 'MEDIUM', value: 75, checked: false },
    { id: 'EASY', value: 100, checked: true },
  ];
  attemptsValue: number = (this.attempts.map(a => a).filter(b => b.checked))[0].value;
  musicOn: boolean = false;
  soundOn: boolean = false;
  sessionTemp: any;

  constructor(
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sessionTemp = JSON.parse(localStorage.getItem('sessionHistorical')!);
    if (this.sessionTemp != undefined) {
      this.session.sessionsHistorical = this.sessionTemp;
    }
    this.musicOn = this.session.actualSession.musicOn;
    this.soundOn = this.session.actualSession.soundsOn;
    this.nameStored = this.session.actualSession.userName;
  }

  musicPlay(value: boolean) {
    this.session.setMusicStatus(value)
  }

  soundsOn(value: boolean) {
    this.session.setSoundsStatus(value)
  }

  setDifficulty(selection: number) {
    this.attemptsValue = selection
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'enter an alias of at least 3 characters';
    }
    return this.name.hasError('name') ? 'Not a valid Name' : '';
  }

  starGame() {
    if (this.name.status === 'INVALID') {
      this.getErrorMessage()
    }
    else {
      this.session.setUsrSessionName(this.name.value!)
      this.session.setUsrAtteptsConfig(this.attemptsValue);
      this.router.navigate(['/app-game'], { relativeTo: this.route });
    }
  }

}
