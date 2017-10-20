import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { TaskComponent } from "./task/task.component";
import { BlogComponent } from "./blog/blog.component";

const APP_ROUTES : Routes = [
    {path: "", component : HomeComponent, pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "blog", loadChildren: "./blog/blog.module#BlogModule"},
    {path: "task", component: TaskComponent}
];

export const appRoutes = RouterModule.forRoot(APP_ROUTES);