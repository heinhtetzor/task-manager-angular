import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { TaskServiceService } from '../services/task-service.service';
import { List } from '../models/list.model';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent implements OnInit {
  listId : string;
  oldTitle : string;
  constructor(private route : ActivatedRoute, private taskService : TaskServiceService, private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId

      this.taskService.getList(this.listId).subscribe((response : List) => {
        this.oldTitle = response.title;
      })
    })
  }
  updateList(){
    this.taskService.updateList(this.listId, this.oldTitle).subscribe((response:any) => {
      this.router.navigate([`/lists/${this.listId}`]);
    })
  }

}
