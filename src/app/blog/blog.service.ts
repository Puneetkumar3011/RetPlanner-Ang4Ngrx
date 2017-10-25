import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { WebAPI } from "../app.enum";
import { Blog } from "./blog.model";

@Injectable()
export class BlogService {
  headers = new Headers(
    {'Content-Type': 'application/json',
        'Accept': 'application/json'
    });
  constructor(private http: Http) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get(`${WebAPI.API_URL}/blog/`)
      .map(this.mapGetResponse)
      .catch((err) => {
        return Observable.throw(err);
      }); 
  }

  addBlog(blog: Blog): Observable<Blog>{
    return this.http.post(`${WebAPI.API_URL}/blog/`, blog, {headers: this.headers})
    .map(this.mapResponse)
    .catch((err) => {
      return Observable.throw(err);
    }); 
  }

  deleteBlog(blogId) {
    return this.http.delete(`${WebAPI.API_URL}/blog/${blogId}`)
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

}
