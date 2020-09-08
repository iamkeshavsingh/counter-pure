var todos = [];


var todo_helper = (function () {

    function getId(todos) {
        return todos[todos.length - 1].id + 1;
    }

    function createTodo(todos, newTodo) {
        return [...todos, { ...newTodo, id: getId(todos) }];
    }

    function deleteTodo(todos, todoId) {
        return todos.filter(function (todo) {
            return todo.id !== todoId;
        });
    }

    function editTodo(todos, todoId, newTodo) {
        var idx = todos.findIndex(function (todo) {
            return todo.id === todoId;
        });
        if (idx == -1) return todos;

        var newTodos = [...todos];
        newTodos[idx] = { ...newTodo, id: todoId };
        return newTodos;
    }

    return {
        createTodo,
        editTodo,
        deleteTodo
    };

})();



function render(todos) {

    if (Array.isArray(todos)) {

        if (todos.length == 0) {

            var div = document.createElement('div');
            div.textContent = 'No Todos Yet';
            div.classList.add('todos_no_items');
            return div;
        }
        else {

        }
    }
    else {
        return -1;
    }
}

var updateContent = (function () {

    var todo_items = document.querySelector('.todo_items');


    return function (content) {
        todo_items.innerHTML = content;
    }
})();

var content = render(todos);
updateContent(content);