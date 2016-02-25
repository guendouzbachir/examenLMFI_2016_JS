System.register([], function(exports_1) {
    var Todo;
    return {
        setters:[],
        execute: function() {
            Todo = (function () {
                function Todo(id, name, statut, link, creationDate, modificationDate) {
                    this.id = id;
                    this.name = name;
                    this.statut = statut;
                    this.link = link;
                    this.creationDate = creationDate;
                    this.modificationDate = modificationDate;
                }
                return Todo;
            })();
            exports_1("Todo", Todo);
        }
    }
});
//# sourceMappingURL=todo.js.map