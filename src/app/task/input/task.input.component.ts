import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TaskModel } from '../task.model';
import { TaskActions } from '../../store/actions/task.actions';
import { AppState } from "../../store/app.state";
import { AppActions } from "../../store/app.dispatcher";
import { TaskStatusTypes } from "../../app.constants";

@Component({
  selector: 'app-task-input',
  templateUrl: './task.input.component.html'
})

export class TaskInputComponent implements OnInit, OnDestroy {
/** variable declaration */    
    taskForm: FormGroup;
    taskData: TaskModel;
    isIdHidden: boolean = true;
    taskTypes = TaskStatusTypes;
    subForParam: any;
    getSubsription: Subscription;
    addTaskSubs: Subscription;
    updateTaskSubs: Subscription;

/** contructor logic */
    constructor(private router : Router, private actRouter: ActivatedRoute, private taskActions: TaskActions,
    private store: Store<AppState>, private appActions: AppActions) {
      this.addTaskSubs = this.appActions.ofType(TaskActions.ADD_TASK_SUCCESS)
      .subscribe(
        (result) => {
            this.router.navigate(['/task/list'], { relativeTo: this.actRouter });
        },
        (err) => {
          console.log(err);
        }
      );

      this.updateTaskSubs = appActions.ofType(TaskActions.UPDATE_TASK_SUCCESS)
      .subscribe((res) => {
        this.router.navigate(['/task/list'], { relativeTo: this.actRouter });
      }),
      (err) => {
        console.log(err);
      }
    }

/** angular life cycle events */
    ngOnInit() {
      this.setFormInputFields();
      this.subForParam = this.actRouter.params.subscribe((params) => {
        let taskId = params['id'];
        if(taskId){
          this.getTaskDetail(taskId);
        }
      });
    }

    ngOnDestroy() {
      this.subForParam.unsubscribe();
      this.addTaskSubs.unsubscribe();
    }


/** private methods */
    setFormInputFields() : void{
      this.taskForm = new FormGroup({
            id: new FormControl(this.taskData ? this.taskData.id : null),
            description: new FormControl(this.taskData ? this.taskData.description : null, Validators.required),
            taskStatus: new FormControl(this.taskData ? this.taskData.taskStatus : this.taskTypes.Pending, Validators.required)
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

    cancelEdit(){
      this.router.navigate(['/task'], { relativeTo: this.actRouter });
    }

    updateTask(task: TaskModel){ 
      this.store.dispatch(this.taskActions.updateTask(task));
    }
    
    getTaskDetail(id){
      this.getSubsription = this.store.select(s => s.task)
      .subscribe((res) => { 
          if(res && res.length > 0){
          this.taskData = this.filterTask(res, id);
          this.setFormInputFields();
          }
      },
      (err) => console.log()
      );
    }

    private filterTask(tasks: TaskModel[], taskId){
      var retTask: TaskModel = null;
      for(var i=0; i < tasks.length; i++){
          if(String(tasks[i].id) === String(taskId)){
              retTask = tasks[i];
          }
      }
      return retTask;
    }

    private throwErrorTest(){
      throw new Error('Created this error to demonstrate error handling');
    }

}