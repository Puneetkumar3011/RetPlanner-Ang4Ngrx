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
    return this.http.get(`${WebAPI.API_URL}/posts${WebAPI.API_KEY}`)
      .map((res) => {
        let retData = res.json();
        return retData;
      })
      .catch((err) => {
        return Observable.throw(err);
      }); 
  }

  addBlog(blog: Blog): Observable<Blog>{
    return this.http.post(`${WebAPI.API_URL}/posts${WebAPI.API_KEY}`, blog, {headers: this.headers})
    .map((res) => {
      let retData = res.json();
      return retData;
    })
    .catch((err) => {
      return Observable.throw(err);
    }); 
  }

  deleteBlog(blogId) {
    return this.http.delete(`${WebAPI.API_URL}/posts/${blogId}${WebAPI.API_KEY}`)
    .map((res) => {
      let retData = res.json();
      return retData;
    })
    .catch((err) => {
      return Observable.throw(err);
    });
  }

}
