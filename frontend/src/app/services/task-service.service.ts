import { Injectable } from '@angular/core';
import { WebRequestServiceService } from './web-request-service.service';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private webReqService : WebRequestServiceService) { }

  createList(title:string){
    return this.webReqService.post('lists', {title});
  }
  getLists(){
    return this.webReqService.get('lists');
  }


  createTask(title:string, listId:string){
    return this.webReqService.post(`lists/${listId}/tasks`, { title : title, listId : listId });
  }
  getTasks(listId:string){
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  setCompleted(task:Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, 
    {
      completed : !task.completed
    })
  }
  deleteList(id:string){
    return this.webReqService.delete(`lists/${id}`);
  }
  updateList(listId:string, title:string){
    return this.webReqService.patch(`lists/${listId}`,
    {
      title : title
    });
  }
  deleteTask(listId:string, taskId:string){
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }
  updateTask(listId:string, taskId:string, title:string){
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`,
    {
      title : title
    })
  }
  getTask(listId:string, taskId:string){
    return this.webReqService.get(`lists/${listId}/tasks/${taskId}`);
  }
  getList(listId:string){
    return this.webReqService.get(`lists/${listId}`);
  }

}
