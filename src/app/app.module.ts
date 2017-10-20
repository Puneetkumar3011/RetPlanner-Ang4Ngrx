import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRoutes } from "./app.routing";
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';
import { RetCoreModule } from "./core/core.module";
/** Do not move this to core component. It will cause to call service multiple time */
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from 'app/store/effects/blog.effect';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutes,
    RetCoreModule,
    EffectsModule.run(BlogEffects)
  ],
  providers: [
    BlogEffects, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
