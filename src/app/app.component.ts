import { Component } from '@angular/core';
import { TaskModel } from 'app/task/task.model';
import { Blog } from 'app/blog/blog.model';
import { ContextActions } from 'app/store/actions/context.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
