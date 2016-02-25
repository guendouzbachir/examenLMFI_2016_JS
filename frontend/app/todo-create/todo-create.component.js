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
    var TodoCreateComponent;
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
            TodoCreateComponent = (function () {
                function TodoCreateComponent(_todoService, _router, _routeParams) {
                    this._todoService = _todoService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.todos = [];
                }
                TodoCreateComponent.prototype.addTodo = function (name) {
                    var _this = this;
                    if (!name) {
                        return;
                    }
                    this._todoService.addTodo(name)
                        .subscribe(function (todo) { return _this.todos.push(todo); }, function (error) { return _this.errorMessage = error; });
                    this._router.navigate(['TodoList']);
                };
                TodoCreateComponent.prototype.updateTodo = function (url, name, stat) {
                    var _this = this;
                    console.log('update select : ' + stat);
                    if (!name) {
                        return;
                    }
                    this._todoService.updateTodo(url, name, stat)
                        .subscribe(function (todo) { return _this.todos.push(todo); }, function (error) { return _this.errorMessage = error; });
                    this._router.navigate(['TodoList']);
                };
                TodoCreateComponent.prototype.bonjour = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this.uptodo = this._todoService.getTodo('http://127.0.0.1:4000/api/v1/todos' + id.toString()).subscribe(function (res) { return _this.uptodo = res; });
                    /*this._todoService.getTodo(id.toString())
                        .then(todo => this.uptodo = todo);*/
                };
                TodoCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'todo-list',
                        styleUrls: ['app/todo-create/todo-create.component.css'],
                        templateUrl: 'app/todo-create/todo-create.component.html',
                        styles: ['.error {color:red;}']
                    }), 
                    __metadata('design:paramtypes', [todo_service_1.TodoService, router_1.Router, router_1.RouteParams])
                ], TodoCreateComponent);
                return TodoCreateComponent;
            })();
            exports_1("TodoCreateComponent", TodoCreateComponent);
        }
    }
});
//# sourceMappingURL=todo-create.component.js.map