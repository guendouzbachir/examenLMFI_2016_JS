import {Component}         from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {Todo}              from './todo-service/todo';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoCreateComponent} from './todo-create/todo-create.component' ;
import {TodoService}       from './todo-service/todo.service';


@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    template: `
    <div class="container">
        <div class="jumbotron">
            <h1 align="center">Todo MVC</h1>
        </div>
        <nav class="navbar navbar-default">
            <a class="navbar-brand" [routerLink]="['TodoList']">List of Todo</a>
            <a class="navbar-brand" [routerLink]="['TodoCreate']">Create a Todo</a>
         </nav>
        <router-outlet></router-outlet>
    </div>
  `,
    directives:[ROUTER_DIRECTIVES],
    providers: [
        HTTP_PROVIDERS,
        TodoService,
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([
    {
        path: '/todo-list',
        name: 'TodoList',
        component: TodoListComponent
    },
    {
        path: '/todo-create',
        name: 'TodoCreate',
        component: TodoCreateComponent
    }
])
export class AppComponent {
    title="Todo MVC";
}
