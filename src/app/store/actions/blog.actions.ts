import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

import { Blog } from "../../blog/blog.model";

@Injectable()
export class BlogActions{
    /* static variables */
    static LOAD_BLOG = "LOAD_BLOG";
    static LOAD_BLOG_SUCCESS = "LOAD_BLOG_SUCCESS";
    static ADD_BLOG = "ADD_BLOG";
    static ADD_BLOG_SUCCESS = "ADD_BLOG_SUCCESS";
    static DELETE_BLOG = "DELETE_BLOG";
    static DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";

    loadBlog(): Action{
        return{
            type: BlogActions.LOAD_BLOG
        };
    }

    loadBlogSuccess(blogs: Array<Blog>): Action{
        return{
            type: BlogActions.LOAD_BLOG_SUCCESS,
            payload: blogs
        }
    }

    addBlog(blog: Blog): Action{
        return{
            type: BlogActions.ADD_BLOG,
            payload: blog
        }
    }

    addBlogSuccess(blog: Blog): Action{
        return{
            type: BlogActions.ADD_BLOG_SUCCESS,
            payload: blog
        }
    }

    deleteBlog(blogId: string){
        return{
            type: BlogActions.DELETE_BLOG,
            payload: blogId
        }
    }

    deleteBlogSuccess(blog: Blog){
        return{
            type: BlogActions.DELETE_BLOG_SUCCESS,
            payload: blog
        }
    }

}