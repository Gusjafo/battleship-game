import { Component, OnInit } from '@angular/core';
import { NavalFleetData } from 'src/app/model/navalFleetInfo';
import { GameService } from 'src/app/services/game/game.service';
import { SessionService } from 'src/app/services/session/session.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  grid: number[][] = [];
  navalFleetData: NavalFleetData[] = [];
  rows: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cells: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  attemptsPosition: number[] = [];  // array of attempts positions
  attemptsCount: number = 0;  // number of attempts
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  user: string | null = '';
  boatAfloat: number = 10;
  win: boolean = false;
  lost: boolean = false;
  hitCounter: number = 0;
  sessionTemp: any;


  constructor(
    private gameService: GameService,
    private session: SessionService,
    private snackBar: MatSnackBar,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionTemp = JSON.parse(localStorage.getItem('sessionHistorical')!);
    if (this.sessionTemp != undefined) {
      this.session.sessionsHistorical = this.sessionTemp;
    }
    if (this.activatedroute.snapshot.paramMap.get('load') === 'load') {
      this.user = this.session.actualSession.userName;
      this.grid = this.session.actualSession.gridStatus;
      this.navalFleetData = this.session.actualSession.navalFleetStatus;
      this.attemptsCount = this.session.actualSession.attemptsUsed;
      this.session.setMusicStatus(this.session.actualSession.musicOn)
    }
    else {
      this.user = this.session.actualSession.userName
      this.openSnackBar(`Let's go ${this.user}`)
      this.grid = this.gameService.gridGenerator();
      this.navalFleetData = this.gameService.setNavalFleetData();
    }
  }

  enemyFire(position: number) {
    if (!this.attemptsPosition.includes(position) && position != -1 && position != -2 && position != -3) {
      this.attemptsPosition.push(position);
      this.session.playSound('shoot');
      this.attemptsCount++;
      if (this.attemptsCount === this.session.actualSession.attemptsSelection) {
        this.lost = true;
        this.session.playSound('lost');
        setTimeout(() => {
          this.saveGame('Lost')
        }, 5000);
      }
      let cordinates: number[] = [];
      cordinates = [...position + ''].map(n => +n)

      let onTarget: number = -1;
      let flag: boolean = false
      this.navalFleetData.forEach((elem: NavalFleetData) => {
        onTarget = elem.shipPosition.indexOf(position)
        // hit the bulls-eye
        if (onTarget != -1) {
          this.hitCounter++;
          this.grid = this.gameService.setGridCell(cordinates, -1, this.grid)
          elem.isDamaged[onTarget] = true;
          // ship is sunk
          if (!elem.isDamaged.includes(false)) {            
            this.boatAfloat--;
            this.session.playSound('onTarget');
            this.openSnackBar('on target')
            // end game
            if (this.boatAfloat === 0) {
              this.win = true;
              this.session.playSound('win');
              setTimeout(() => {
                this.saveGame('Won')
              }, 8000);
            }
            setTimeout(() => {
              elem.shipPosition.forEach((elem: number) => {
                cordinates = [];
                cordinates = [...elem + ''].map(n => +n)
                this.grid = this.gameService.setGridCell(cordinates, -3, this.grid)
              })
            }, 500);
          }
          flag = !flag;
        }
      })
      // failed attempt
      if (!flag) {
        this.session.playSound('water');
        this.grid = this.gameService.setGridCell(cordinates, -2, this.grid)
      }
      // hit the bulls-eye
      if (flag) {
        flag = !flag
      }
    }
    localStorage.setItem('sessionActual', JSON.stringify(this.session.actualSession));    
  }

  saveGame(mje: string) {
    this.session.actualSession.acuracy = (this.hitCounter/this.attemptsCount);
    this.session.actualSession.status = mje;
    this.session.actualSession.navalFleetStatus = this.navalFleetData;
    this.session.actualSession.gridStatus = this.grid;
    this.session.actualSession.attemptsUsed = this.attemptsCount;
    this.session.sessionsHistorical.push(this.session.actualSession);
    this.session.actualSession.timeEnd = new Date();
    localStorage.setItem('sessionActual', JSON.stringify(this.session.actualSession));
    localStorage.setItem('sessionHistorical', JSON.stringify(this.session.sessionsHistorical));
    this.router.navigate(['/app-welcome']).then(() => {
      window.location.reload();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'snackbar',
      duration: 5000,
    });
  }

}
