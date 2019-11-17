import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: Todo = {
    task: 'Chakep',
    createdAt: new Date().getTime(),
    priority: 2
  }

  todoId = null;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading ...'
    })
    await loading.present();
  }

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Saving ...'
    })
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.navController.navigateBack('home');
      })
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.navController.navigateBack('home');
      })
    }
  }

}
 