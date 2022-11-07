import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
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
  }

  newGame() {
    this.router.navigate(['/app-setup'], { relativeTo: this.route })
  }

}
