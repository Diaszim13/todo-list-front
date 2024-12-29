import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Todo} from '../interfaces/todo'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
  
export class TodoServiceService {

  private URL = "http://localhost:3000/todos";
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.URL);
  }

  createTodo(todo: { title: string; completed: boolean }): Observable<Todo> {
    return this.http.post<Todo>(this.URL, todo);
  }

  // 3. Atualizar um to-do existente
  updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.URL}/${id}`, todo);
  }

  // 4. Deletar um to-do
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }


  checkTodo(id: string): Observable<Todo> {
    return this.http.put<Todo>(`${this.URL}/${id}/complete`, { completed: 1});
  }

  //essa funcao vai ficar pra dps
  completeTodo(id: string, completed: boolean): Observable<Todo> {
    return this.http.put<Todo>(`${this.URL}/${id}`, { completed });
  }
}
