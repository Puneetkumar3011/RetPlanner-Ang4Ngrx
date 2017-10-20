import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogListComponent } from "app/blog/list/blog-list.component";
import { BlogInputComponent } from "app/blog/input/blog-input.component";
import { BlogComponent } from "app/blog/blog.component";

const BLOG_ROUTES : Routes = [
    {   
        path: "", 
        component: BlogComponent, 
        children: [
            {path: "", component: BlogListComponent},
            {path: "list", component: BlogListComponent},
            {path: "input", component: BlogInputComponent},
            {path: "input/:id", component: BlogInputComponent}
        ] 
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(BLOG_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class BlogRoutingModule{

}