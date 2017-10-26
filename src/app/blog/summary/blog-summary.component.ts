import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { Blog } from "../blog.model";
import { AppState } from "../../store/app.state";

@Component({
    selector: "ret-blog-summ",
    templateUrl: "blog-summary.component.html"
})
export class BlogSummaryComponent implements OnInit, OnDestroy{
/** variable declaration */
    blogCount: Number = 0;
    blogSubscriber: Subscription;

/** contructor logic */
    constructor(private store: Store<AppState>){

    }

/** angular life cycle events */
    ngOnInit(){
        this.blogSubscriber = this.store.select(s => s.blog)
        .subscribe((res) => {
            if(res){
            this.blogCount = res.length;
            }
        });
    }

    ngOnDestroy(){
        this.blogSubscriber.unsubscribe();
    }

}