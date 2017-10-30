import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import { TaskModel } from './task.model';
import { WebAPI } from "../app.constants";
import { ApiService } from '../core/core-api.service';

@Injectable()
export class TaskService {
  constructor(private apiSvc: ApiService) { }

  getTasks(): Observable<TaskModel[]> {
      return this.apiSvc.loadData(`${WebAPI.API_URL}/task/`);
  }

  getTask(id: string): Observable<TaskModel> {
      return this.apiSvc.getData(`${WebAPI.API_URL}/task/${id}`);
  }

  addTask(task: TaskModel): Observable<TaskModel>{
    return this.apiSvc.insertNewData(task, `${WebAPI.API_URL}/task/`);
  }

  updateTask(task: TaskModel){
      return this.apiSvc.updateData(task, `${WebAPI.API_URL}/task/${task.id}`);
  }

  deleteTask(taskId) {
      return this.apiSvc.deleteData(`${WebAPI.API_URL}/task/${taskId}`);
  }

}
