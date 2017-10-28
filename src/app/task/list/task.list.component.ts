import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.state";
import { TaskActions } from "../../store/actions/task.actions";
import { ContextActions } from "../../store/actions/context.actions";
import { TaskModel } from '../task.model';
import { AppActions } from '../../store/app.dispatcher';
import { TaskStatusTypes } from "../../app.constants";

@Component({
  selector: 'app-task-list',
  templateUrl: './task.list.component.html'
})

export class TaskListComponent implements OnInit, OnDestroy {
/** variable declaration */    
    tasks: Array<TaskModel> = [];
    taskToDelete: TaskModel;
    delMsg: string;
    taskToComplete: TaskModel;
    taskInContext: TaskModel;
    completeMsg: string;
    loadTaskSubs: Subscription;
    contextSubs: Subscription;
    updateTaskSubs: Subscription;
    deleteTaskSubs: Subscription;
    taskTypes = TaskStatusTypes;

/** contructor logic */
    constructor(private store: Store<AppState>, private router: Router, private actRouter: ActivatedRoute, 
      private contextActions: ContextActions, private taskActions: TaskActions, private actions : AppActions) {
        this.deleteTaskSubs = actions.ofType(TaskActions.DELETE_TASK_SUCCESS)
        .subscribe(() => {
              console.log("Task Deleted");
            },
            (err) => console.log()
        );

        this.updateTaskSubs = actions.ofType(TaskActions.UPDATE_TASK_SUCCESS)
        .subscribe((res) => {
          console.log("Task Updated");
        });
       }

/** angular life cycle events */
    ngOnInit() {
      this.getContextData();
      this.loadTaskList();  
    }

    ngOnDestroy(){
      this.loadTaskSubs.unsubscribe();
      this.updateTaskSubs.unsubscribe();
      this.deleteTaskSubs.unsubscribe();
      this.contextSubs.unsubscribe();
    }

/** private methods */
    loadTaskList(){
      this.loadTaskSubs = this.store.select(s => s.task)
      .subscribe((res) => {
          if(res){
            this.tasks = res;
          }
      });
    }

    getContextData(){
      this.contextSubs = this.store.select(s => s.context)
      .subscribe((res) => {
        if(res){
          this.taskInContext = res.task;
        }
      });
    }

    editTask(task): void{
      this.router.navigate(['/task/input', task._id], { relativeTo: this.actRouter });
    }

    deleteTask(taskId): void{
      this.store.dispatch(this.taskActions.deleteTask(taskId));
    }

    updateTask(task: TaskModel){
      task.taskStatus = TaskStatusTypes.Completed;
      this.store.dispatch(this.taskActions.updateTask(task));
    }

    changeStyle($event, task){
       task.rowStyle = (event.type === "mouseover") ? "rowMouseOver" : "rowEven";
    }

    setTaskContext(task: TaskModel){
      this.store.dispatch(this.contextActions.setTask(task));
    }

    public showDeleteModal(task: TaskModel):void {
      this.delMsg = "Are you sure to delete " + "'" + task.description + "'" + " from the task list?";
      this.taskToDelete = task;
    }

    public showCompleteModal(task: TaskModel):void {
      this.completeMsg = "Are you sure to mark " + "'" + task.description + "'" + " as completed?";
      this.taskToComplete = task;
    }

}