 // Selecionando elementos do DOM
        const form = document.querySelector('#to-do-form');
        const taskTitleInput = document.querySelector('#task-title-input');
        const todoListUl = document.querySelector('#todo-list');
        const searchBar = document.querySelector('#search-bar');
        const toggleThemeBtn = document.querySelector('#toggle-theme');

        // Array para armazenar as tarefas
        let tasks = [];

        // Função para renderizar as tarefas
        function renderTaskOnHTML(taskTitle, done = false, priority = 'low') {
            // Cria um elemento <li>
            const li = document.createElement('li');
            li.classList.add(priority);

            // Checkbox para marcar a tarefa como concluída
            const input = document.createElement('input');
            input.setAttribute("type", "checkbox");
            input.checked = done;
            input.addEventListener('change', (event) => {
                const liToToggle = event.target.parentElement;
                const spanToToggle = liToToggle.querySelector('span');
                const isDone = event.target.checked;

                spanToToggle.style.textDecoration = isDone ? 'line-through' : 'none';

                tasks = tasks.map(t =>
                    t.title === spanToToggle.textContent ? { ...t, done: isDone } : t
                );

                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            // Span para o texto da tarefa
            const span = document.createElement('span');
            span.textContent = taskTitle;
            if (done) {
                span.style.textDecoration = 'line-through';
            }

            // Botões de ação
            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('task-actions');

            // Botão para editar a tarefa
            const editButton = document.createElement('button');
            editButton.textContent = '✏️';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => {
                const newTitle = prompt('Edite sua tarefa:', taskTitle);
                if (newTitle && newTitle.trim().length >= 3) {
                    tasks = tasks.map(t => t.title === taskTitle ? { ...t, title: newTitle } : t);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks();
                } else if (newTitle !== null) {
                    alert('O título da tarefa deve ter pelo menos 3 caracteres.');
                }
            });

            // Botão para remover a tarefa
            const removeButton = document.createElement('button');
            removeButton.textContent = '🗑️';
            removeButton.classList.add('delete-btn');
            removeButton.addEventListener('click', () => {
                tasks = tasks.filter(t => t.title !== taskTitle);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });

            // Monta o item da lista
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(removeButton);
            li.appendChild(input);
            li.appendChild(span);
            li.appendChild(actionsDiv);

            todoListUl.appendChild(li);
        }

        // Função para renderizar todas as tarefas
        function renderTasks() {
            todoListUl.innerHTML = '';
            tasks.forEach(t => renderTaskOnHTML(t.title, t.done, t.priority));
        }

        // Evento de submissão do formulário
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const taskTitle = taskTitleInput.value.trim();
            const priority = document.querySelector('#priority-select').value;

            if (taskTitle.length < 3) {
                alert('Sua tarefa precisa ter, pelo menos, 3 caracteres.');
                return;
            }

            tasks.push({ title: taskTitle, done: false, priority });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskTitleInput.value = '';
        });

        // Evento de busca
        searchBar.addEventListener('input', () => {
            const query = searchBar.value.toLowerCase();
            todoListUl.innerHTML = '';
            tasks.filter(t => t.title.toLowerCase().includes(query))
                .forEach(t => renderTaskOnHTML(t.title, t.done, t.priority));
        });

        // Alternar tema claro/escuro
        toggleThemeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });

        // Carrega as tarefas ao carregar a página
        window.onload = () => {
            const tasksFromLocalStorage = localStorage.getItem('tasks');
            if (tasksFromLocalStorage) {
                tasks = JSON.parse(tasksFromLocalStorage);
            }
            renderTasks();
        };