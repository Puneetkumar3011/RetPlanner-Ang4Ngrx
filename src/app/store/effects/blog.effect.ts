import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/switchMap';

import { BlogActions } from "../actions/blog.actions";
import { BlogService } from "../../blog/blog.service";

@Injectable()
export class BlogEffects{
    constructor(private update$: Actions, private blogActions: BlogActions, private blogSvc: BlogService){}

    @Effect() loadBlog$ = this.update$
    .ofType(BlogActions.LOAD_BLOG)
    .switchMap(() => { 
        return this.blogSvc.getBlogs();
    }) 
    .map(blogs => { 
        return this.blogActions.loadBlogSuccess(blogs); 
    })
    .catch((err) => Observable.throw(err));

    @Effect() addBlog$ = this.update$
    .ofType(BlogActions.ADD_BLOG)
    .map(action => action.payload)
    .switchMap(blog => 
        { 
        return this.blogSvc.addBlog(blog);
    })
    .map(blog => this.blogActions.addBlogSuccess(blog))
    .catch((err) => Observable.throw(err))

    @Effect() deleteBlog$ = this.update$
    .ofType(BlogActions.DELETE_BLOG)
    .map(blogId => blogId)
    .switchMap(req => {
        return this.blogSvc.deleteBlog(req.payload);
    })
    .map(blog => this.blogActions.deleteBlogSuccess(blog))
    .catch((err) => Observable.throw(err));

}