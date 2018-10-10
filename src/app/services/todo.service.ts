import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
  todoCounter = 0;

  constructor(
    private storage: Storage
  ) {
  }

  getTodos(): Promise<Todo[]> {
    this.storage.get('todoCounter').then(
      data => {
        if (data) {
          this.todoCounter = data;
        }
      }
    );

    return this.storage.get('todos').then(
      (data) => {
        if (data) {
          this.todos = data;
        }
        return data;
      }
    );
  }

  saveTodo(t): Promise<Todo[]> {
    this.todos[this.todos.findIndex(todo => todo.id === t.id)] = t;

    return this.storage.set('todos', this.todos);
  }

  newTodo(t): Promise<Todo[]> {
    this.todos.push(t);
    this.todoCounter++;

    return this.storage.set('todos', this.todos).then(
      () => this.storage.set('todoCounter', this.todoCounter)
    );
  }


  deleteTodo(id: number): Promise<Todo[]> {
    this.todos = this.todos.filter(t => t.id !== id);
    return this.storage.set('todos', this.todos);
  }

  getTodoById(id: number): Todo {
    return this.todos.find(t => t.id === id);
  }
}
