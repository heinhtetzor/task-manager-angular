import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists : List[];
  tasks : Task[];
  listId : string;
  constructor(private taskService : TaskServiceService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.listId = params.listId;
      this.taskService.getTasks(params.listId).subscribe((tasks:Task[]) => {
        this.tasks = tasks;
      })
    });
    this.taskService.getLists().subscribe((lists:List[]) => {
      this.lists = lists;
    });

  }
  setCompleted(task:Task){
    this.taskService.setCompleted(task).subscribe((response:Task) => {
      task.completed = !task.completed;
    })
  }
  deleteList(){
    this.taskService.deleteList(this.listId).subscribe((response:any) => {
        console.log(response);
        this.router.navigate(['/lists']);
    })
  }
  deleteTask(id:string){
    this.taskService.deleteTask(this.listId, id).subscribe((response:any) => {
      this.tasks = this.tasks.filter(x => x._id !== id);
    })
  }
}
