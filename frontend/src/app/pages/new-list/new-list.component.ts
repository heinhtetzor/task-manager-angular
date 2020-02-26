import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService : TaskServiceService, private router : Router) { }

  ngOnInit(): void {
  }
  createNewList(title:string){
    this.taskService.createList(title).subscribe((response:any) => {
      //redirect to home
      this.router.navigate(['lists', response._id]);
    })
  }

}
