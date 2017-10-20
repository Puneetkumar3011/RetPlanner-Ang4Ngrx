import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { BlogActions } from "../store/actions/blog.actions";

@Component({
  selector: 'ret-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  constructor(private store: Store<any>, private blogActions: BlogActions) { }

  ngOnInit(){
    this.store.dispatch(this.blogActions.loadBlog());
  }

}
