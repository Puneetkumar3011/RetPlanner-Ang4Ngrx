import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";

import { AppState } from "../store/app.state";
import { TaskActions } from "../store/actions/task.actions";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  errorMsg : string;
  constructor(private store : Store<AppState>, private taskActions: TaskActions) { 
    
  }

  ngOnInit() {
    this.store.dispatch(this.taskActions.loadTask());
  }

}
