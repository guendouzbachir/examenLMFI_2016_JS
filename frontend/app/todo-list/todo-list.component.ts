import {Component, OnInit} from 'angular2/core';
import {Todo}              from '../todo-service/todo';
import {TodoService}       from '../todo-service/todo.service';
import {Router} from "angular2/router";
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'todo-list',
    styleUrls:  ['app/todo-list/todo-list.component.css'],
    templateUrl: 'app/todo-list/todo-list.component.html',
    styles: ['.error {color:red;}']
})
export class TodoListComponent implements OnInit {
    errorMessage: string;
    todos: Todo[];
    selectedTodo: Todo;
    statuts = ['A faire','Fait','En cours'] ;
    afaire = 'A faire' ;
    encours = "En cours" ;
    fait = "Fait" ;

    constructor (private _router: Router, private _todoService: TodoService) {
        this.todos = [];
    }

    ngOnInit() { this.getTodos(); }

    getTodos() {
        this._todoService.getTodos()
            .subscribe(
                todos => this.todos = todos,
                error =>  this.errorMessage = <any>error);
    }

    onSelect(todo: Todo) { this.selectedTodo = todo; }

    updateTodo (url:string, name: string, stat:string) {
        console.log('update select : '+stat) ;
        if (!name) {return;}
        this._todoService.updateTodo(url,name,stat)
            .subscribe(
                todo  => this.todos.push(todo),
                error =>  this.errorMessage = <any>error);

    }

    deleteTodo (url:string) {
        this._todoService.deleteTodo(url)
            .subscribe(
                error =>  this.errorMessage = <any>error);
        this._router.navigate(['TodoList']);
    }

    goToUpdate(id:string) {
        this._router.navigate(['TodoCreate', { id: id }]);
    }

}
