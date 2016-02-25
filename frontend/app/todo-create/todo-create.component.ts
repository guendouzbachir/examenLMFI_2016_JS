import {Component, OnInit} from 'angular2/core';
import {Todo}              from '../todo-service/todo';
import {TodoService}       from '../todo-service/todo.service';
import {Router, RouteParams} from "angular2/router";

@Component({
    selector: 'todo-list',
    styleUrls:  ['app/todo-create/todo-create.component.css'],
    templateUrl: 'app/todo-create/todo-create.component.html',
    styles: ['.error {color:red;}']
})
export class TodoCreateComponent {
    errorMessage: string;
    todos:Todo[];
    id: string;
    uptodo:Todo;

    constructor (private _todoService: TodoService, private _router: Router, private _routeParams : RouteParams) {
        this.todos = [];
    }

    addTodo (name: string) {
        if (!name) {return;}
        this._todoService.addTodo(name)
            .subscribe(
                todo  => this.todos.push(todo),
                error =>  this.errorMessage = <any>error);
        this._router.navigate(['TodoList']);
    }

    updateTodo (url:string, name: string, stat:string) {
        console.log('update select : '+stat) ;
        if (!name) {return;}
        this._todoService.updateTodo(url,name,stat)
            .subscribe(
                todo  => this.todos.push(todo),
                error =>  this.errorMessage = <any>error);
        this._router.navigate(['TodoList']);

    }

    bonjour() {
        let id = +this._routeParams.get('id');
        this.uptodo = this._todoService.getTodo('http://127.0.0.1:4000/api/v1/todos'+id.toString()).subscribe( res => this.uptodo = res) ;
        /*this._todoService.getTodo(id.toString())
            .then(todo => this.uptodo = todo);*/
    }

}