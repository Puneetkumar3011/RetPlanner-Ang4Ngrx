import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";

const APP_ROUTES : Routes = [
    {path: "", component : HomeComponent, pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "blog", loadChildren: "./blog/blog.module#BlogModule"},
    {path: "task", loadChildren: "./task/task.module#TaskModule"}
];

export const appRoutes = RouterModule.forRoot(APP_ROUTES);