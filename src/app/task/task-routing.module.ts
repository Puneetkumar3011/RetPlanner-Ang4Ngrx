import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TaskComponent } from "app/task/task.component";
import { TaskListComponent } from "app/task/list/task.list.component";
import { TaskInputComponent } from "app/task/input/task.input.component";

const TASK_ROUTES : Routes = [
    {   
        path: "", 
        component: TaskComponent, 
        children: [
            {path: "", component: TaskListComponent},
            {path: "list", component: TaskListComponent},
            {path: "input", component: TaskInputComponent},
            {path: "input/:id", component: TaskInputComponent}
        ] 
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(TASK_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class TaskRoutingModule{

}