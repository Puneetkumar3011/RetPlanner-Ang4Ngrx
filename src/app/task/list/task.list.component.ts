import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.state";
import { TaskActions } from "../../store/actions/task.actions";
import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';
import { AppActions } from 'app/store/app.dispatcher';

@Component({
  selector: 'app-task-list',
  templateUrl: './task.list.component.html'
})

export class TaskListComponent implements OnInit {
    tasks: Array<TaskModel> = [];
    //tasks$: Observable<Array<TaskModel>>;
    taskToDelete: TaskModel;
    delMsg: string;
    taskToComplete: TaskModel;
    completeMsg: string;

    constructor(private store: Store<AppState>, private router: Router, private actRouter: ActivatedRoute, 
      private taskActions: TaskActions, private taskService: TaskService, private actions : AppActions) {
        actions.ofType(TaskActions.DELETE_TASK_SUCCESS)
        .subscribe(() => {
              console.log("Task Deleted");
            },
            (err) => console.log()
        );
       }

    ngOnInit() {
      this.loadTaskList();  
    }

    loadTaskList(){
      this.store.select(s => s.task)
      .subscribe((res) => {
          if(res){
            this.tasks = res;
          }
      });
    }

    editTask(task): void{
      this.router.navigate(['input', task._id], { relativeTo: this.actRouter });
    }

    deleteTask(taskId): void{
      this.store.dispatch(this.taskActions.deleteTask(taskId));
    }

    updateTask(){
      this.taskToComplete.taskStatus = 'Completed';
      this.taskService.updateTask(this.taskToComplete).subscribe(
        (result) => {
          if(result.ok){
            this.router.navigate(['/task'], { relativeTo: this.actRouter });
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          // this.completeModal.hide();
        }
      )
    }

    public showDeleteModal(task: TaskModel):void {
      this.delMsg = "Are you sure to delete " + "'" + task.description + "'" + " from the task list?";
      this.taskToDelete = task;
      //this.deleteModal.show();
    }

    public showCompleteModal(task: TaskModel):void {
      this.completeMsg = "Are you sure to mark " + "'" + task.description + "'" + " as completed?";
      this.taskToComplete = task;
      // this.completeModal.show();
    }

}