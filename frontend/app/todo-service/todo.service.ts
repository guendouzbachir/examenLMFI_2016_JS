import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Todo}           from './todo';
import {Observable}     from 'rxjs/Observable';
import {Headers, RequestOptions} from 'angular2/http';

@Injectable()
export class TodoService {
    constructor (private _http: Http) {}

    private _todosUrl = 'http://127.0.0.1:4000/api/v1/todos';

    getTodos () : Observable<Todo[]> {
        return this._http.get(this._todosUrl)
            .map(res => {
                if(res.status === 200)
                    return <string[]> res.json();
                else
                    return <string[]>[];
            })
            .flatMap(links => Observable.forkJoin(links.map((link) => this.getTodo(link))))
            .catch(this._handleError);
    }

    getTodo (url: string) : Observable<Todo> {
        return this._http.get(url)
            .map(res => <Todo> res.json())
            .catch(this._handleError);
    }

    /*getTodo2 (url: string) : Todo {
        return this._http.get(this._todosUrl+'/'+url).
            .map(res => <Todo> res.json())
            .catch(this._handleError);
    }*/

    addTodo (name: string) : Observable<Todo>  {

        const body = JSON.stringify({ name });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this._http.post(this._todosUrl, body, options)
            .map(res =>  <Todo> res.json())
            .catch(this._handleError)
    }

    updateTodo (url: string, name: string, stat:string) : Observable<Todo> {

        const body = JSON.stringify({ name:name, statut:stat });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http.put(url, body, options)
            .map(res => <Todo> res.json())
            .catch(this._handleError);
    }

    deleteTodo(url:string) : Observable<Response> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this._http.delete(url,options)
            /*.map(res => res.json())*/
            .catch(this._handleError);

    }

    private _handleError (error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.text() || 'Server error');
    }
}