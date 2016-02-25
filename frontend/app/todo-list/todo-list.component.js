System.register(['angular2/core', '../todo-service/todo.service', "angular2/router"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, todo_service_1, router_1;
    var TodoListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TodoListComponent = (function () {
                function TodoListComponent(_router, _todoService) {
                    this._router = _router;
                    this._todoService = _todoService;
                    this.statuts = ['A faire', 'Fait', 'En cours'];
                    this.afaire = 'A faire';
                    this.encours = "En cours";
                    this.fait = "Fait";
                    this.todos = [];
                }
                TodoListComponent.prototype.ngOnInit = function () { this.getTodos(); };
                TodoListComponent.prototype.getTodos = function () {
                    var _this = this;
                    this._todoService.getTodos()
                        .subscribe(function (todos) { return _this.todos = todos; }, function (error) { return _this.errorMessage = error; });
                };
                TodoListComponent.prototype.onSelect = function (todo) { this.selectedTodo = todo; };
                TodoListComponent.prototype.updateTodo = function (url, name, stat) {
                    var _this = this;
                    console.log('update select : ' + stat);
                    if (!name) {
                        return;
                    }
                    this._todoService.updateTodo(url, name, stat)
                        .subscribe(function (todo) { return _this.todos.push(todo); }, function (error) { return _this.errorMessage = error; });
                };
                TodoListComponent.prototype.deleteTodo = function (url) {
                    var _this = this;
                    this._todoService.deleteTodo(url)
                        .subscribe(function (error) { return _this.errorMessage = error; });
                    this._router.navigate(['TodoList']);
                };
                TodoListComponent.prototype.goToUpdate = function (id) {
                    this._router.navigate(['TodoCreate', { id: id }]);
                };
                TodoListComponent = __decorate([
                    core_1.Component({
                        selector: 'todo-list',
                        styleUrls: ['app/todo-list/todo-list.component.css'],
                        templateUrl: 'app/todo-list/todo-list.component.html',
                        styles: ['.error {color:red;}']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, todo_service_1.TodoService])
                ], TodoListComponent);
                return TodoListComponent;
            })();
            exports_1("TodoListComponent", TodoListComponent);
        }
    }
});
//# sourceMappingURL=todo-list.component.js.map