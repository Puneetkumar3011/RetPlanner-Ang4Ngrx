import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TaskModel } from './task.model';
import { WebAPI } from "../app.enum";

@Injectable()
export class TaskService {
  tasks : Array<TaskModel> = [];
  headers = new Headers(
        {'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

  constructor(private http: Http) { }

  getTasks(): Observable<TaskModel[]> {
      return this.http.get(`${WebAPI.API_URL}/task/`)
        .map(this.mapGetResponse)
        .catch(this.handleError); 
  }

  getTask(id: string): Observable<TaskModel> {
      return this.http.get(`${WebAPI.API_URL}/task/${id}`)
        .map(this.mapGetResponse)
        .catch(this.handleError); 
  }

  addTask(task: TaskModel){
        return this.http.post(`${WebAPI.API_URL}/task/`, 
                            JSON.stringify(task), 
                            {headers: this.headers})
        .map(this.mapResponse)
        .catch(this.handleError);
    }

  updateTask(task: TaskModel){
      return this.http.patch(`${WebAPI.API_URL}/task/${task.id}`, 
                          JSON.stringify(task), 
                          {headers: this.headers})
      .map(this.mapResponse)
      .catch(this.handleError);
  }

  deleteTask(taskId) {
      return this.http.delete(`${WebAPI.API_URL}/task/${taskId}`)
      .map(this.mapResponse)
      .catch(this.handleError);
  }

  mapResponse(res: any){
    let retData: any = {};
    if(res && res._body){
      retData = JSON.parse(res._body).data;
      retData.id = retData._id;
    }
    return retData;
  }

  mapGetResponse(res: any){
    let retData = [];
    if(res && res._body){
      retData = JSON.parse(res._body).data;
    }
    return retData;
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
