import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionData } from 'src/app/model/session';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  sessionsHistorical: SessionData[] = [];
  sessionTemp: any;
  usrNames: string[] = [];
  sessionFilteredByUser: SessionData[] = [];
  displayedColumns: string[] = [
    'timeStart', 'timeEnd', 'attemptsUsed', 'acuracy', 'status'
  ];
  dataSource: SessionData[] = [];

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionTemp = JSON.parse(localStorage.getItem('sessionHistorical')!);
    if (this.sessionTemp != undefined) {
      this.session.sessionsHistorical = this.sessionTemp;
    }
    this.sessionsHistorical = this.session.sessionsHistorical;
    this.getUsersNames();
  }

  getUsersNames(): void {
    this.usrNames = this.sessionsHistorical.map(a => a.userName);
    this.usrNames = [...new Set(this.usrNames)];
  }

  setDataForTable(usr: string): void {
    this.dataSource = [];
    this.sessionFilteredByUser = this.sessionsHistorical.map(a => a).filter(b => b.userName === usr);
    this.sessionFilteredByUser.forEach((elem: SessionData) => {
      this.dataSource.push(elem);
    })
  }

  // move to game page
  replayGame(id: number): void {
    this.session.actualSession = this.sessionFilteredByUser.map(a => a).filter(b => b.id === id)[0];
    if (this.session.actualSession.status === 'unfinished') {
      this.router.navigate(['/app-game/load']);
    }
  }

  deleteHistorical(): void {
    localStorage.removeItem('sessionHistorical');
    this.session.sessionsHistorical = [];
    window.location.reload();
  }
}

