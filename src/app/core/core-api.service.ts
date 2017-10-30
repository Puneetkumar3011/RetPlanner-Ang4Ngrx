import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  headers = new Headers(
    {'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
  constructor(private http: Http) { }

  loadData<T>(apiUrl: string): Observable<T[]> {
    return this.http.get(apiUrl)
      .map(this.mapGetResponse)
      .catch((err) => {
        return Observable.throw(err);
      }); 
  }

  getData<T>(apiUrl: string): Observable<T> {
    return this.http.get(apiUrl)
      .map(this.mapGetResponse)
      .catch(this.handleError); 
  }

  insertNewData<T>(data: T, apiUrl: string): Observable<T>{
    return this.http.post(apiUrl, data, {headers: this.headers})
    .map(this.mapResponse)
    .catch((err) => {
      return Observable.throw(err);
    }); 
  }

  updateData<T>(data: T, apiUrl: string){
    return this.http.patch(`${apiUrl}`, 
                        JSON.stringify(data), 
                        {headers: this.headers})
    .map(this.mapResponse)
    .catch(this.handleError);
}

  deleteData(apiUrl: string) {
    return this.http.delete(apiUrl)
    .map(this.mapResponse)
    .catch((err) => {
      return Observable.throw(err);
    });
  }

  mapGetResponse(res: any){
    let retData = [];
    if(res && res._body){
      retData = JSON.parse(res._body).data;
    }
    return retData;
  }

  mapResponse(res: any){
    let retData: any = {};
    if(res && res._body){
      retData = JSON.parse(res._body).data;
      retData.id = retData._id;
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
