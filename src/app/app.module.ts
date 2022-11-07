import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { SetupComponent } from './components/setup/setup.component';
import { GameComponent } from './components/game/game.component';
import { LoadComponent } from './components/load/load.component';
import { HomeComponent } from './components/home/home.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SetupComponent,
    GameComponent,
    LoadComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatSelectModule,
    RouterModule.forRoot([
      { path: 'app-welcome', component: WelcomeComponent },
      { path: 'app-load', component: LoadComponent },
      { path: 'app-setup', component: SetupComponent },
      { path: 'app-home', component: HomeComponent },
      { path: 'app-game', component: GameComponent },
      { path: 'app-game/:load', component: GameComponent },
      { path: '', redirectTo: '/app-welcome', pathMatch: 'full' },
    ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
