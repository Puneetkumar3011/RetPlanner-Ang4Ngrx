import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { Blog } from "../blog.model";
import { AppState } from "../../store/app.state";
import { ContextActions } from "../../store/actions/context.actions";

@Component({
    selector: "ret-blog-list",
    templateUrl: "blog-list.component.html"
})
export class BlogListComponent implements OnInit, OnDestroy {
/** variable declaration */
    blogs$ : Observable<Blog[]>;
    blogInContext : Blog;
    contextSubsriber : Subscription;

/** contructor logic */
    constructor(private store: Store<AppState>, private router: Router, 
        private activatedRoute: ActivatedRoute, private contextActions: ContextActions) {
     }

/** angular life cycle events */
    ngOnInit() {
        this.getContextData();
        this.loadBlogs();
    }

    ngOnDestroy(){
        this.contextSubsriber.unsubscribe();
    }

/** private methods */
    loadBlogs(){
        this.blogs$ = this.store.select(res => {
            return res.blog || [];
        });
    }

    getContextData(){
        this.contextSubsriber = this.store.select(s => s.context)
        .subscribe((res) => {
            if(res){
                this.blogInContext = res.blog;
            }
        });
    }

    editClick(id: string): void{
        this.router.navigate(["/blog/input", id], {relativeTo: this.activatedRoute})
    }

     setBlogInContext(blog: Blog){
        this.store.dispatch(this.contextActions.setBlog(blog));
     }

     getRowCssClass(isOdd, isEven, blog){
        let retCss = "";
        if(this.blogInContext && this.blogInContext.id === blog.id){
            retCss = "rowSelected";
        } else{
            retCss = (isOdd) ? "rowOdd" : "rowEven";
        }
        return retCss;
     }

}