export class Todo {
    constructor(
        public id:string,
        public name:string,
        public statut:string,
        public link:string,
        public creationDate?:Date,
        public modificationDate?:Date) { }
}