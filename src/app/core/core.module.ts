import { NgModule, ErrorHandler } from "@angular/core";
import { StoreModule, Dispatcher } from '@ngrx/store';
import { AppActions, AppDispacther } from "../store/app.dispatcher";

import reducer from "../store/reducers/app.reducers";
import { BlogActions } from "../store/actions/blog.actions";
import { TaskService } from "../task/task.service";
import { TaskActions } from "../store/actions/task.actions";
import { ContextActions } from "../store/actions/context.actions";
import { BlogService } from "../blog/blog.service";
import { GlobalErrorHandler } from "./app.globalerrorhandler";
import { LogService } from "./log.service";
import { ErrorComponent } from "../error/error.component";
import { ApiService } from "./core-api.service";

@NgModule({
    declarations: [
        ErrorComponent,
    ],
    imports: [
        StoreModule.provideStore(reducer)
    ],
    providers: [
        BlogService, 
        TaskService,
        BlogActions,
        TaskActions,
        ContextActions,
        LogService,
        AppActions,
        ApiService,
        { provide: Dispatcher, useClass: AppDispacther },
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ]
})
export class RetCoreModule{

}