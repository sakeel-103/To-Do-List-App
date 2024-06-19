document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');

    let editingTaskItem = null;

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!editingTaskItem) {
            addTask();
        } else {
            editTask();
        }
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (!task) {
            alert('Please enter a task.');
            return;
        }
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskContent = document.createElement('span');
        taskContent.className = 'task-content';
        taskContent.textContent = task;

        const editButton = document.createElement('button');
        editButton.id = 'edit';
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.id = 'delete';
        deleteButton.textContent = 'Delete';

        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.insertAdjacentElement('afterbegin', taskItem);
        taskInput.value = '';

        editButton.addEventListener('click', function () {
            taskInput.value = taskContent.textContent;
            addButton.textContent = 'Edit';
            editingTaskItem = taskItem;
        });

        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
            resetForm();
        });
    }

    function editTask() {
        const editedTask = taskInput.value.trim();
        if (!editedTask) {
            alert('Please enter a task.');
            return;
        }
        const editedTaskContent = editingTaskItem.querySelector('.task-content');
        editedTaskContent.textContent = editedTask;
        resetForm();
    }

    function resetForm() {
        addButton.textContent = 'Add';
        editingTaskItem = null;
        taskInput.value = '';
    }
});
