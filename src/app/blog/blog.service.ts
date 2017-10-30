import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { WebAPI } from "../app.constants";
import { Blog } from "./blog.model";
import { ApiService } from '../core/core-api.service';

@Injectable()
export class BlogService {
  constructor(private apiSvc: ApiService) { }

  getBlogs(): Observable<Blog[]> {
    return this.apiSvc.loadData(`${WebAPI.API_URL}/blog/`);
  }

  addBlog(blog: Blog): Observable<Blog>{
    return this.apiSvc.insertNewData(blog, `${WebAPI.API_URL}/blog/`);
  }

  deleteBlog(blogId) {
    return this.apiSvc.deleteData(`${WebAPI.API_URL}/blog/${blogId}`);
  }

}
