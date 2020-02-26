import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    TestComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    UpdateListComponent,
    UpdateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
