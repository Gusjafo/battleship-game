import { Injectable } from '@angular/core';
import { NavalFleetData } from 'src/app/model/navalFleetInfo';

export const navalFleet: number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0],
  [0],
  [0],
  [0]
]

@Injectable({
  providedIn: 'root'
})
export class GameService {

  grid: number[][] = []      // game grid
  dimension: number = 10;     // grid dimension  
  navalFleetData: NavalFleetData[] = []; // naval fleet data

  constructor() { }

  // grid generator
  gridGenerator(): number[][] {
    let gridAxisX: number[];
    this.grid = [];
    for (let y = 0; y < this.dimension; y++) {
      gridAxisX = [];
      for (let x = 0; x < this.dimension; x++) {
        gridAxisX[x] = parseInt(`${y}${x}`);
      }
      this.grid.push(gridAxisX)
    }
    return this.grid;
  }

  // random integer
  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  // set data of naval fleet
  setNavalFleetData(): NavalFleetData[] {
    let randomPositionX: number = 0;
    let randomPositionY: number = 0;
    let fillHorizontal: boolean = true;
    let count: number = 0;      // overflow exit
    let flag: boolean = true;   // to detect overlap
    let shipName: string = '';

    do {
      ++count;
      this.navalFleetData = [];
      navalFleet.forEach((elem: number[], ship: number) => {
        randomPositionX = this.getRandomInt(this.dimension);
        randomPositionY = this.getRandomInt(this.dimension);

        if (fillHorizontal === true) {
          // Check if the boat enters in a horizontal position.
          if (randomPositionX <= this.dimension - elem.length) {
            elem.forEach((el: number, positionShip: number) => {
              navalFleet[ship][positionShip] = this.grid[randomPositionY][randomPositionX + positionShip];
            })
            shipName = this.getNavalFleetName(elem.length)
            this.setNavalFleetStatus(navalFleet[ship], shipName);
          }
          // if not, enters in -horizontal position.
          else {
            elem.forEach((el: number, positionShip: number) => {
              navalFleet[ship][positionShip] = this.grid[randomPositionY][randomPositionX - positionShip];
            })
            shipName = this.getNavalFleetName(elem.length)
            this.setNavalFleetStatus(navalFleet[ship], shipName);
          }
          fillHorizontal = false
        }
        else {
          // Check if the boat enters in a vertical position.
          if (randomPositionY <= this.dimension - elem.length) {
            elem.forEach((el: number, positionShip: number) => {
              navalFleet[ship][positionShip] = this.grid[randomPositionY + positionShip][randomPositionX];
            })
            shipName = this.getNavalFleetName(elem.length)
            this.setNavalFleetStatus(navalFleet[ship], shipName);
          }
          // if not, enters in -vertical position.
          else {
            elem.forEach((el: number, positionShip: number) => {
              navalFleet[ship][positionShip] = this.grid[randomPositionY - positionShip][randomPositionX];
            })
            shipName = this.getNavalFleetName(elem.length)
            this.setNavalFleetStatus(navalFleet[ship], shipName);
          }
          fillHorizontal = true;
        }
      })

      // check if ships overlap
      let temp = structuredClone(navalFleet);
      let temp2: number[] = [];
      temp.forEach(elem => {
        elem.map(a => temp2.push(a));
      })
      flag = new Set(temp2).size !== temp2.length;
    } while (flag && count < 100);
    return this.navalFleetData
  }

  // set status of naval fleet
  setNavalFleetStatus(position: number[], name: string): void {
    this.navalFleetData.push({
      shipName: name,
      shipPosition: position,
      isDamaged: new Array(position.length).fill(false)
    })
  }

  // set status of naval fleet
  getNavalFleetName(dimension: number): string {
    let response: string = '';
    switch (dimension) {
      case 4:
        response = 'aircraftCruiser'
        break;
      case 3:
        response = 'cruiser'
        break;
      case 2:
        response = 'destroyer'
        break;
      case 1:
        response = 'frigates'
        break;
      default:
        break;
    }
    return response
  }

  // set value for color cell
  setGridCell(cordinates: number[], value: number, grid: number[][]): number[][] {
    if (cordinates.length > 1) {
      grid[cordinates[0]][cordinates[1]] = value
    } else {
      grid[0][cordinates[0]] = value
    }
    return grid;
  }

}
