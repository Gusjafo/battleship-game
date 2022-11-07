import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  sessionTemp: any;

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.goToItems()
    }, 2000);
  }

  goToItems() {
    this.sessionTemp = JSON.parse(localStorage.getItem('sessionHistorical')!);
    if (this.sessionTemp != undefined) {
      this.session.sessionsHistorical = this.sessionTemp;
    }
    this.router.navigate(['/app-home'])
  }

}
