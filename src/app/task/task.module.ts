import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { TaskComponent } from "../task/task.component";
import { TaskInputComponent } from "../task/input/task.input.component";
import { TaskListComponent } from "../task/list/task.list.component";
import { TaskRoutingModule } from "./task-routing.module";

@NgModule({
    declarations:[
        TaskComponent,
        TaskInputComponent,
        TaskListComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TaskRoutingModule
    ]
})
export class TaskModule{

}