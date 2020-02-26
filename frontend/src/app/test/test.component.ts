import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  random;
  constructor(){
    setInterval(() => this.random = Math.random(), 500);
  };
    
}
