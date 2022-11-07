import { NavalFleetData } from "./navalFleetInfo";

export class SessionData {
  id: number;
  userName: string;
  musicOn: boolean;
  musicLevel: number;
  soundsOn: boolean;
  attemptsSelection: number;  // attemps selection
  navalFleetStatus: NavalFleetData[];
  gridStatus: number[][]
  timeStart: Date;          // game start
  timeEnd: Date;            // game end
  attemptsUsed: number;     // number of attempts made
  status: string;           // Won/lost/unfinished
  acuracy: number;

  constructor(attempts: number) {
    this.id = Date.now();
    this.userName = '';
    this.musicOn = false;
    this.musicLevel = 0;
    this.soundsOn = false;
    this.attemptsSelection = attempts;
    this.navalFleetStatus = [];
    this.gridStatus = [];
    this.timeStart = new Date(Date.now());
    this.timeEnd = new Date(Date.now());
    this.attemptsUsed = 0;
    this.status = 'unfinished';
    this.acuracy = 0;
  }
}