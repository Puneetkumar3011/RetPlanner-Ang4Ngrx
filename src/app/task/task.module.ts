import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { TaskComponent } from "app/task/task.component";
import { TaskInputComponent } from "app/task/input/task.input.component";
import { TaskListComponent } from "app/task/list/task.list.component";
import { TaskRoutingModule } from "./task-routing.module";

@NgModule({
    declarations:[
        TaskComponent,
        TaskInputComponent,
        TaskListComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        TaskRoutingModule
    ]
})
export class TaskModule{

}