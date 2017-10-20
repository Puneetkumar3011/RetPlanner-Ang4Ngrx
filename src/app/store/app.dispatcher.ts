import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Action, Dispatcher } from "@ngrx/store";

@Injectable()
export class AppActions {
  _actions = new Subject<Action>();

  ofType( type : string ) {
    return this._actions.filter(( action : Action ) => action.type === type);
  }

  nextAction( action : Action ) {
    this._actions.next(action);
  }

}

@Injectable()
export class AppDispacther extends Dispatcher {
  constructor( private actions: AppActions ) {
    super();
  }

  next( action: Action ) {
    super.next(action);
    this.actions.nextAction(action);
  }
}