import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskServiceService } from '../services/task-service.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  listId : string;
  taskId : string;
  oldTitle : string;
  constructor(private route : ActivatedRoute, private taskService : TaskServiceService, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.listId = params.listId;
      this.taskId = params.taskId;

      this.taskService.getTask(this.listId, this.taskId).subscribe((response:Task) => {
        this.oldTitle = response[0].title;
      })
    })
  }
  updateTask(title:string){
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe((response:any) => {
      this.router.navigate(['/lists', this.listId]);
    })
  }
}
