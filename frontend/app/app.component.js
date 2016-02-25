System.register(['angular2/core', 'angular2/http', 'angular2/router', './todo-list/todo-list.component', './todo-create/todo-create.component', './todo-service/todo.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, todo_list_component_1, todo_create_component_1, todo_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (todo_list_component_1_1) {
                todo_list_component_1 = todo_list_component_1_1;
            },
            function (todo_create_component_1_1) {
                todo_create_component_1 = todo_create_component_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = "Todo MVC";
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styleUrls: ['app/app.component.css'],
                        template: "\n    <div class=\"container\">\n        <div class=\"jumbotron\">\n            <h1 align=\"center\">Todo MVC</h1>\n        </div>\n        <nav class=\"navbar navbar-default\">\n            <a class=\"navbar-brand\" [routerLink]=\"['TodoList']\">List of Todo</a>\n            <a class=\"navbar-brand\" [routerLink]=\"['TodoCreate']\">Create a Todo</a>\n         </nav>\n        <router-outlet></router-outlet>\n    </div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            todo_service_1.TodoService,
                            router_1.ROUTER_PROVIDERS
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/todo-list',
                            name: 'TodoList',
                            component: todo_list_component_1.TodoListComponent
                        },
                        {
                            path: '/todo-create',
                            name: 'TodoCreate',
                            component: todo_create_component_1.TodoCreateComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map