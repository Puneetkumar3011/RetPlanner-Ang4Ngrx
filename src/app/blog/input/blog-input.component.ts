import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Store, Dispatcher } from "@ngrx/store";
import { Actions } from '@ngrx/effects';
import { Subscription } from "rxjs/Subscription";

import { AppActions } from "../../store/app.dispatcher";
import { BlogActions } from "../../store/actions/blog.actions";
import { Blog } from "../blog.model";
import { AppState } from "../../store/app.state";
import { BlogCategories } from "../../app.constants";

@Component({
    selector: "ret-blog-input",
    templateUrl: "blog-input.component.html"
})
export class BlogInputComponent implements OnInit, OnDestroy {
/** variable declaration */
    blogForm: FormGroup;
    blogData: Blog;
    subForParam: any;
    categoryTypes = BlogCategories;
    getSubsription: Subscription; 
    addSubsription: Subscription; 
    deleteSubsription: Subscription;

/** contructor logic */
    constructor(private store: Store<AppState>, private blogActions: BlogActions, private update$: Actions,
        private dispatcher: Dispatcher, private router: Router, private activatedRoute: ActivatedRoute, 
        private actions : AppActions){
        this.addSubsription = actions.ofType(BlogActions.ADD_BLOG_SUCCESS)
        .subscribe(() => {
            this.router.navigate(["/blog/list"], {relativeTo: this.activatedRoute});
            },
            (err) => console.log()
        );

        this.deleteSubsription = actions.ofType(BlogActions.DELETE_BLOG_SUCCESS)
        .subscribe(() => {
            this.router.navigate(["/blog/list"], {relativeTo: this.activatedRoute});
            },
            (err) => console.log()
        );
    }

/** angular life cycle events */
    ngOnInit(){
        this.blogData = null;
        this.subForParam = this.activatedRoute.params.subscribe((params) => {
            let blogId = params['id'];
            if(blogId){
                this.getBlogData(blogId);                
            }
          });
        this.initializeForm();
    }

    onsubmit(){
        if(this.blogForm && this.blogForm.value){
            let blog : Blog = {
                id: this.blogForm.value.id,
                title: this.blogForm.value.title,
                content: this.blogForm.value.content,
                categories : this.blogForm.value.categories
            };
            this.store.dispatch(this.blogActions.addBlog(blog));
        }
    }

    ngOnDestroy(){
        this.addSubsription.unsubscribe();
        this.deleteSubsription.unsubscribe();
        if(this.getSubsription){
            this.getSubsription.unsubscribe();
        }
    }

/** private methods */
    private getBlogData(blogId){
        this.getSubsription = this.store.select(s => s.blog)
            .subscribe((res) => { 
                if(res && res.length > 0){
                this.blogData = this.filterBlog(res, blogId);
                this.initializeForm();
                }
            },
            (err) => console.log()
        );
    }

    private filterBlog(blogs: Blog[], blogId){
        var retBlog: Blog = null;
        for(var i=0; i < blogs.length; i++){
            if(String(blogs[i].id) === String(blogId)){
                retBlog = blogs[i];
            }
        }
        return retBlog;
    }

    private initializeForm(){
        this.blogForm = new FormGroup({
            id: new FormControl(this.blogData ? this.blogData.id : null),
            title: new FormControl(this.blogData ? this.blogData.title : null, [Validators.required]),
            categories: new FormControl(this.blogData ? this.blogData.categories : this.categoryTypes[0]),
            content: new FormControl(this.blogData ? this.blogData.content : null, Validators.required)
        });
    }

    private deleteSelectedBlog(){
        this.store.dispatch(this.blogActions.deleteBlog(this.blogForm.value.id));
    }

}
