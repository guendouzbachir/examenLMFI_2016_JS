System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, http_2;
    var TodoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            TodoService = (function () {
                function TodoService(_http) {
                    this._http = _http;
                    this._todosUrl = 'http://127.0.0.1:4000/api/v1/todos';
                }
                TodoService.prototype.getTodos = function () {
                    var _this = this;
                    return this._http.get(this._todosUrl)
                        .map(function (res) {
                        if (res.status === 200)
                            return res.json();
                        else
                            return [];
                    })
                        .flatMap(function (links) { return Observable_1.Observable.forkJoin(links.map(function (link) { return _this.getTodo(link); })); })
                        .catch(this._handleError);
                };
                TodoService.prototype.getTodo = function (url) {
                    return this._http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this._handleError);
                };
                /*getTodo2 (url: string) : Todo {
                    return this._http.get(this._todosUrl+'/'+url).
                        .map(res => <Todo> res.json())
                        .catch(this._handleError);
                }*/
                TodoService.prototype.addTodo = function (name) {
                    var body = JSON.stringify({ name: name });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this._http.post(this._todosUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this._handleError);
                };
                TodoService.prototype.updateTodo = function (url, name, stat) {
                    var body = JSON.stringify({ name: name, statut: stat });
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this._http.put(url, body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this._handleError);
                };
                TodoService.prototype.deleteTodo = function (url) {
                    var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this._http.delete(url, options)
                        .catch(this._handleError);
                };
                TodoService.prototype._handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.text() || 'Server error');
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], TodoService);
                return TodoService;
            })();
            exports_1("TodoService", TodoService);
        }
    }
});
//# sourceMappingURL=todo.service.js.map