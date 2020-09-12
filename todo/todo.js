var state = {
    todos: [],
    isEdit: false,
    id: null
};

var form = document.querySelector('.form');


var input_helper = (function () {
    var title = document.querySelector('#title');
    var description = document.querySelector('#description')
    var time = document.querySelector('#time')

    function getValues() {
        return {
            title: title.value,
            description: description.value,
            time: time.value
        };
    }

    function reset() {
        title.value = '';
        description.value = '';
        time.value = '';
    }

    function fill(todo) {
        title.value = todo.title;
        description.value = todo.description;
        time.value = todo.time;
    }

    return {
        getValues,
        reset,
        fill
    };
})();


form.addEventListener('submit', function (event) {
    event.preventDefault();
    var todo = input_helper.getValues();

    if (state.isEdit) {

        state.todos = todo_helper.editTodo(state.id, todo);

        state.isEdit = false;
    }
    else {
        state.todos = todo_helper.createTodo(todo);
    }

    init();
    input_helper.reset();
})


var todo_helper = (function (state) {

    function getTodo(todoId) {
        var { todos } = state;
        return todos.find(function (todo) {
            return todo.id === todoId;
        });
    }

    function getId() {
        var { todos } = state;
        if (todos.length == 0) return 1;
        return todos[todos.length - 1].id + 1;
    }

    function createTodo(newTodo) {
        var { todos } = state;
        return [...todos, { ...newTodo, id: getId(todos) }];
    }

    function deleteTodo(todoId) {
        var { todos } = state;
        return todos.filter(function (todo) {
            return todo.id !== todoId;
        });
    }

    function editTodo(todoId, newTodo) {
        var { todos } = state;
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
        deleteTodo,
        getTodo
    };

})(state);

function deleteTodoFromList(id) {

    state.todos = todo_helper.deleteTodo(id);
    init();
}


function render(todos) {

    if (Array.isArray(todos)) {

        if (todos.length == 0) {

            var div = document.createElement('div');
            div.textContent = 'No Todos Yet';
            div.classList.add('todos_no_items');
            return div;
        }
        else {

            var todoMapToList = todos.map(function (todo) {
                var todo_item_wrapper = document.createElement('div');
                todo_item_wrapper.classList.add('todo_item_wrapper');

                var title = document.createElement('h2');
                var description = document.createElement('h3');
                var time = document.createElement('h3');

                title.textContent = todo.title;
                description.textContent = todo.description
                time.textContent = todo.time;

                var deleteTodo = document.createElement('button');
                var editTodo = document.createElement('button');

                deleteTodo.textContent = 'Delete';
                editTodo.textContent = 'Edit';

                deleteTodo.addEventListener('click', function () {
                    deleteTodoFromList(todo.id);
                });

                editTodo.addEventListener('click', function () {
                    var newTodo = todo_helper.getTodo(todo.id);
                    input_helper.fill(newTodo);
                    state.isEdit = true;
                    state.id = todo.id;
                });

                var content_wrapper = document.createElement('div');
                var action_wrapper = document.createElement('div');

                content_wrapper.appendChild(title);
                content_wrapper.appendChild(description);

                action_wrapper.appendChild(deleteTodo);
                action_wrapper.appendChild(editTodo);

                todo_item_wrapper.appendChild(content_wrapper);
                todo_item_wrapper.appendChild(time);
                todo_item_wrapper.appendChild(action_wrapper);

                return todo_item_wrapper;
            });

            return todoMapToList;

        }
    }
    else {
        return -1;
    }
}


var updateContent = (function () {

    var todo_items = document.querySelector('.todo_items');


    return function (content) {
        todo_items.innerHTML = '';
        if (Array.isArray(content)) {
            content.reduce(function (acc, val) {
                acc.appendChild(val);
                return acc;
            }, todo_items);
        }
        else {
            todo_items.appendChild(content);
        }
    }
})();


function init() {
    var content = render(state.todos);
    updateContent(content);
}

init();