import { Component } from '@angular/core';
import { TaskModel } from './task/task.model';
import { Blog } from './blog/blog.model';
import { ContextActions } from './store/actions/context.actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTask: TaskModel;
  selectedBlog: Blog;
  constructor(private contextActions: ContextActions, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(s => s.context)
    .subscribe((res) => {
        if(res){
          this.selectedTask = res.task;
          this.selectedBlog = res.blog;
        }
    });
  }

}
