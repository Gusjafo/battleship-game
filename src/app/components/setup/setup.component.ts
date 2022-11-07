import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';
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

  constructor(
    private gameService: GameService,
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.musicOn = this.session.actualSession.musicOn;
    this.soundOn = this.session.actualSession.soundsOn;
    this.nameStored = this.session.actualSession.userName;
  }

  musicPlay(value: boolean) {
    this.session.setMusicStatus(value);
  }

  soundsOn(value: boolean) {
    this.session.setSoundsStatus(value);
  }

  setDifficulty(selection: number) {
    this.attemptsValue = selection;
  }

  getErrorMessage():string|null {
    if (this.name.hasError('required')) {
      return 'enter an alias of at least 3 characters';
    }
    return this.name.hasError('name') ? 'Not a valid Name' : '';
  }

  startGame():void {
    if (this.name.status === 'INVALID') {
      this.getErrorMessage();
    }
    else {
      this.session.actualSession.gridStatus = this.gameService.gridGenerator();
      this.session.actualSession.navalFleetStatus = this.gameService.setNavalFleetData();
      this.session.actualSession.userName = this.name.value!;
      this.session.actualSession.attemptsSelection = this.attemptsValue;
      localStorage.setItem('sessionActual', JSON.stringify(this.session.actualSession));
      this.router.navigate(['/app-game'], { relativeTo: this.route });
    }
  }

}
