import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { TaskActions } from "../actions/task.actions";
import { TaskService } from "../../task/task.service";

@Injectable()
export class TaskEffects{
    constructor(private update$: Actions, private taskActions: TaskActions, private taskSvc: TaskService){}

    @Effect() loadTask$ = this.update$
    .ofType(TaskActions.LOAD_TASK)
    .switchMap(() => { 
        return this.taskSvc.getTasks();
    }) 
    .map(tasks => { 
        return this.taskActions.loadTaskSuccess(tasks); 
    })
    .catch((err) => Observable.throw(err));

    @Effect() addTask$ = this.update$
    .ofType(TaskActions.ADD_TASK)
    .map(action => action.payload)
    .switchMap(task => 
        { 
        return this.taskSvc.addTask(task);
    })
    .map(task => this.taskActions.addTaskSuccess(task))
    .catch((err) => Observable.throw(err))

    @Effect() deleteTask$ = this.update$
    .ofType(TaskActions.DELETE_TASK)
    .map(taskId => taskId)
    .switchMap(req => {
        return this.taskSvc.deleteTask(req.payload);
    })
    .map(task => this.taskActions.deleteTaskSuccess(task))
    .catch((err) => Observable.throw(err));

}