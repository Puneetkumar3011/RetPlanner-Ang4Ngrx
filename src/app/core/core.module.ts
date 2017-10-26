import { NgModule } from "@angular/core";
import { StoreModule, Dispatcher } from '@ngrx/store';
import { AppActions, AppDispacther } from "../store/app.dispatcher";

import reducer from "../store/reducers/app.reducers";
import { BlogService } from "app/blog/blog.service";
import { BlogActions } from "app/store/actions/blog.actions";
import { TaskService } from "../task/task.service";
import { TaskActions } from "app/store/actions/task.actions";
import { ContextActions } from "app/store/actions/context.actions";

@NgModule({
    imports: [
        StoreModule.provideStore(reducer)
    ],
    providers: [
        BlogService, 
        TaskService,
        BlogActions,
        TaskActions,
        ContextActions,
        AppActions,
        { provide: Dispatcher, useClass: AppDispacther }
    ]
})
export class RetCoreModule{

}