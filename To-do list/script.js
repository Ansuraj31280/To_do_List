let todos = [];

// Get the elements
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const todoItemsList = document.getElementById('todo-items-list');
const filterSelect = document.getElementById('filter-select');

// Load todos from local storage
loadFromLocalStorage();

// Add event listener to add task button
addTaskButton.addEventListener('click', function() {
    const newTask = newTaskInput.value.trim();
    if (newTask) {
        const todo = {
            id: Date.now(),
            name: newTask,
            completed: false
        };
        todos.push(todo);
        addToLocalStorage(todos);
        renderTodos(todos);
        newTaskInput.value = '';
    }
});

// Add event listener to todo items list
todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        const itemId = event.target.parentNode.getAttribute('data-key');
        const todo = todos.find((todo) => todo.id === parseInt(itemId));
        todo.completed = event.target.checked;
        addToLocalStorage(todos);
        renderTodos(todos);
    } else if (event.target.classList.contains('delete-button')) {
        const itemId = event.target.parentNode.getAttribute('data-key');
        const index = todos.findIndex((todo) => todo.id === parseInt(itemId));
        todos.splice(index, 1);
        addToLocalStorage(todos);
        renderTodos(todos);
    }
});

// Add event listener to filter select
filterSelect.addEventListener('change', function() {
    const filterValue = filterSelect.value;
    if (filterValue === 'all') {
        renderTodos(todos);
    } else if (filterValue === 'active') {
        const activeTodos = todos.filter((todo) => !todo.completed);
        renderTodos(activeTodos);
    } else if (filterValue === 'completed') {
        const completedTodos = todos.filter((todo) => todo.completed);
        renderTodos(completedTodos);
    }
});

// Render todos function
function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        const checked = item.completed ? 'checked' : null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button">X</button>
        `;
        todoItemsList.append(li);
    });
}

// Add to local storage function
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load from local storage function
function loadFromLocalStorage() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        renderTodos(todos);
    }
}