import { NgModule } from "@angular/core";
import { StoreModule, Dispatcher } from '@ngrx/store';
import { AppActions, AppDispacther } from "../store/app.dispatcher";

import reducer from "../store/reducers/app.reducers";
import { BlogService } from "app/blog/blog.service";
import { BlogActions } from "app/store/actions/blog.actions";

@NgModule({
    imports: [
        StoreModule.provideStore(reducer)
    ],
    providers: [
        BlogService, 
        BlogActions,
        AppActions,
        { provide: Dispatcher, useClass: AppDispacther }
    ]
})
export class RetCoreModule{

}