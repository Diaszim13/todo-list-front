import { Component } from '@angular/core';
import { TodoServiceService } from './services/todo.service.service';
import { Todo } from './interfaces/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list-front';
  constructor(private TodoServiceService: TodoServiceService) {}
  todos: Todo[] = [];
  newTodo: string = '';

  ngOnInit(): void {
    this.getTodos();
  }
  getTodos(): void {
    this.TodoServiceService.getTodos().subscribe((todos) => {
      console.log(todos);
      
      this.todos = todos;
    });
  }
  addTodo(data: String) {
    const newTodo: any = { title: data, completed: false }
    this.TodoServiceService.createTodo(newTodo).subscribe((todo) => {
      this.todos.push(todo);
    })

    if(this.newTodo){
      this.newTodo = '';
    }
  }

  removeTodo(id: any) {
    this.TodoServiceService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => Number(todo.id) !== id);
    });

    this.getTodos();
  }

  completeTodo(id: any) {
    this.TodoServiceService.checkTodo(id).subscribe((todo) => {
      this.todos = this.todos.map((todo) => {
        console.log(todo);
        
        if (Number(todo.id) === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    });
  }
}

