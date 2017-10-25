import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import { TaskModel } from '../task.model';
import { TaskActions } from '../../store/actions/task.actions';
import { AppState } from "../../store/app.state";
import { AppActions } from "../../store/app.dispatcher";

@Component({
  selector: 'app-task-input',
  templateUrl: './task.input.component.html'
})

export class TaskInputComponent implements OnInit, OnDestroy {
    taskForm: FormGroup;
    taskData: TaskModel;
    isIdHidden: boolean = true;
    taskStatus: string = 'Pending';
    private subForParam: any;
    constructor(private router : Router, private actRouter: ActivatedRoute, private taskActions: TaskActions,
    private store: Store<AppState>, private appActions: AppActions) {
      this.appActions.ofType(TaskActions.ADD_TASK_SUCCESS)
      .subscribe(
        (result) => {
            this.router.navigate(['/task/list'], { relativeTo: this.actRouter });
        },
        (err) => {
          console.log(err);
        }
      )
    }

    ngOnInit() {
      this.setFormInputFields();
      this.subForParam = this.actRouter.params.subscribe((params) => {
        let taskId = params['id'];
        if(taskId){
          this.getTaskDetail(taskId);
        }
      });
      //this.throwErrorTest();
    }

    getTaskDetail(taskId: string){
      // this.taskService.getTask(taskId)
      //   .subscribe((task: any) => { 
      //       this.taskData = task; 
      //       this.taskData.id = task._id;
      //       this.setFormInputFields();
      //   });
    }

    setFormInputFields() : void{
      this.taskForm = new FormGroup({
            id: new FormControl(this.taskData ? this.taskData.id : null),
            description: new FormControl(this.taskData ? this.taskData.description : null, Validators.required),
            taskStatus: new FormControl(this.taskData ? this.taskData.taskStatus : 'Pending', Validators.required)
        });
    }

    onSubmit(event: Event){
      try
      {
        if(this.taskForm.value){
          let task : TaskModel = {
            id : this.taskForm.value.id,
            description: this.taskForm.value.description,
            createdOn: String(new Date()),
            taskStatus: this.taskForm.value.taskStatus
          }
          this.taskForm.value.id ? this.updateTask(task) : this.addNewTask(task);
        }
      }
      catch(err){
        event.preventDefault();
        throw err;
      }
    }

    addNewTask(task: TaskModel){
      this.store.dispatch(this.taskActions.addTask(task));
    }

    updateTask(task: TaskModel){
      // this.taskService.updateTask(task).subscribe(
      //   (result) => {
      //     if(result.ok){
      //       this.router.navigate(['/task'], { relativeTo: this.actRouter });
      //     }
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // )
    }

    private throwErrorTest(){
      throw new Error('Created this error to demonstrate error handling');
    }

    cancelEdit(){
      this.router.navigate(['/task'], { relativeTo: this.actRouter });
    }

    ngOnDestroy() {
      this.subForParam.unsubscribe();
    }

}