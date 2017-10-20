import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';

import { BlogComponent } from "./blog.component";
import { BlogInputComponent } from "./input/blog-input.component";
import { BlogListComponent } from "./list/blog-list.component";
import { BlogSummaryComponent } from "./summary/blog-summary.component";
import { BlogRoutingModule } from "./blog-routing.module";
import { RepSharedModule } from "app/shared/shared.module";

@NgModule({
    declarations: [
        BlogComponent,
        BlogInputComponent,
        BlogListComponent,
        BlogSummaryComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BlogRoutingModule,
        RepSharedModule
    ]
})
export class BlogModule{

}