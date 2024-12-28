$(document).ready(async () => {


    const loadTodos = () => {

        $.get('/todos', (todos) => {
            $('#todoList').empty();
            todos.forEach(todo => {
                $('#todoList').append(`
                    <li data-id = "${todo.id}">
                        <span>${todo.task}</span>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </li>
                `);
            });
        });

    };

    const loadTodo = () => {

        $.get('/todos', (todos) => {
            todos.forEach(todo => {
                $('#todoList').append(`
                    <li data-id = "${todo.id}">
                        <span>${todo.task}</span>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </li>
                `);
            });
        });

    };


    $('#todoForm').off('submit').submit((e) => {
        e.preventDefault();
        const task = $('#taskInput').val();
        $.post('/todos', { task }, () => {
            $('#taskInput').val('');
        });
    });
    
    $('#todoList').on('click', '.edit', function () {
        const id = $(this).parent().data('id'); 
        const task = prompt('Edit your task:'); 
    
        if (task) {
            $.ajax({
                url: `/todos/${id}`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ task }),
                success: () => {
                    alert('Task updated successfully');
                },
                error: (err) => {
                    console.error('Error in updating task:', err);
                },
            });
        }
    });
    
    $('#todoList').on('click', '.delete', function () {
        const id = $(this).parent().data('id'); 
        if (confirm('Are you sure you want to delete this task?')) {
            $.ajax({
                url: `/todos/${id}`,
                type: 'DELETE',
                success: () => {
                    alert('Task deleted successfully!');
                    loadTodos();
                },
                error: (err) => {
                    console.error('Error in deleting task:', err);
                },
            });
        }
    });
    

    loadTodos();
});
