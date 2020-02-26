import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId : string;
  constructor(private router : Router, private route: ActivatedRoute, private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.listId = params.listId;
    })
  }
  createNewTask(title:string){
    this.taskService.createTask(title, this.listId).subscribe((response:Task) => {
      this.router.navigate([`/lists/${this.listId}`]);
    })
  }
}
