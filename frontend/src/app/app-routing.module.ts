import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { TestComponent } from './test/test.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'new-list', component: NewListComponent },
  { path: 'lists/edit/:listId', component: UpdateListComponent },
  { path: 'lists/:listId/tasks/edit/:taskId', component: UpdateTaskComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
