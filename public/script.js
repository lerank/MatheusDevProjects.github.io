document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskPriority = document.getElementById('task-priority');
    const taskList = document.getElementById('tasks');
    const message = document.getElementById('message');

    // Adiciona uma nova tarefa
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        const priority = taskPriority.value;
        if (taskText) {
            addTask(taskText, priority);
            taskInput.value = '';
            showMessage('Tarefa adicionada com sucesso!');
        }
    });

    // Adiciona uma tarefa à lista
    function addTask(text, priority) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${text}</span>
            <span class="priority">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
            <div>
                <button class="edit">✏️</button>
                <button class="delete">🗑️</button>
            </div>
        `;

        // Editar tarefa
        li.querySelector('.edit').addEventListener('click', () => {
            const newText = prompt('Editar tarefa:', text);
            const newPriority = prompt('Editar prioridade (low, medium, high):', priority);
            if (newText && ['low', 'medium', 'high'].includes(newPriority)) {
                li.querySelector('.task-text').textContent = newText;
                li.querySelector('.priority').textContent = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);
                showMessage('Tarefa atualizada com sucesso!');
            }
        });

        // Deletar tarefa
        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            showMessage('Tarefa removida com sucesso!');
        });

        taskList.appendChild(li);
    }

    // Mostra uma mensagem
    function showMessage(msg) {
        message.textContent = msg;
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
        }, 3000);
    }
});

