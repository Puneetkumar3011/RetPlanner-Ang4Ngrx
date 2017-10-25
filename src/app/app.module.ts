import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRoutes } from "./app.routing";
import { AppComponent } from './app.component';
// import { TaskModule } from './task/task.module';
import { HomeComponent } from './home/home.component';
import { RetCoreModule } from "./core/core.module";
/** Do not move this to core component. It will cause to call service multiple time */
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from './store/effects/blog.effect';
import { TaskEffects } from "./store/effects/task.effect";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRoutes,
    RetCoreModule,
    EffectsModule.run(BlogEffects),
    EffectsModule.run(TaskEffects)
  ],
  providers: [
    BlogEffects,
    TaskEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
