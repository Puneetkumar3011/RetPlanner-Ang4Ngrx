import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

import { Blog } from "../blog.model";
import { AppState } from "../../store/app.state";

@Component({
    selector: "ret-blog-list",
    templateUrl: "blog-list.component.html"
})
export class BlogListComponent implements OnInit {
/** variable declaration */
    blogs$ : Observable<Blog[]>;

/** contructor logic */
    constructor(private store: Store<AppState>, private router: Router, 
        private activatedRoute: ActivatedRoute) {
     }

/** angular life cycle events */
    ngOnInit() {
        this.loadBlogs();
    }

/** private methods */
    loadBlogs(){
        this.blogs$ = this.store.select(res => {
            return res.blog || [];
        });
    }

    editClick(id: string): void{
        this.router.navigate(["/blog/input", id], {relativeTo: this.activatedRoute})
    }

}