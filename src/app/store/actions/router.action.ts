import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] GO';
export const BACK = '[Router] Back';
export const FORWORD = '[Router] Forword';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: Object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forword implements Action {
  readonly type = FORWORD;
}

export type Actions = Go | Back | Forword;
