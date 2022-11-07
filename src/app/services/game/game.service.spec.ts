import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRandomInt() should generate random number < max', () => {
    let max = 10
    let response: number;
    response = service.getRandomInt(10);
    expect(response).toBeLessThanOrEqual(max)
  });

  it('getRandomInt() should generate random number >= 0', () => {
    let value: number = 0;
    let response: number;
    response = service.getRandomInt(10);
    expect(response).toBeGreaterThanOrEqual(value);
  });

  it('getNavalFleetName(3) should retorn a string cruiser', () => {
    let response: string;
    response = service.getNavalFleetName(3);
    expect(response).toEqual('cruiser');
  });
});
