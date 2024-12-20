// Selecionando elementos do DOM
const form = document.querySelector('#to-do-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

// Array para armazenar as tarefas
let tasks = [];

// Função para renderizar as tarefas
function renderTaskOnHTML(taskTitle, done = false) {
  // Cria um elemento <li>
  const li = document.createElement('li');

  // Checkbox para marcar a tarefa como concluída
  const input = document.createElement('input');
  input.setAttribute("type", "checkbox");
  input.checked = done; // Define o estado inicial do checkbox
  input.addEventListener('change', (event) => {
    const liToToggle = event.target.parentElement;
    const spanToToggle = liToToggle.querySelector('span');
    const isDone = event.target.checked; // Obtém o valor do checkbox

    // Atualiza a estilização do texto da tarefa
    spanToToggle.style.textDecoration = isDone ? 'line-through' : 'none';

    // Atualiza o estado da tarefa no array
    tasks = tasks.map(t =>
      t.title === spanToToggle.textContent ? { ...t, done: isDone } : t
    );

    // Atualiza o localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  // Span para o texto da tarefa
  const span = document.createElement('span');
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = 'line-through'; // Mantém o estilo riscado se concluída
  }

  // Botão para remover a tarefa
  const button = document.createElement('button');
  button.textContent = 'Remover';
  button.addEventListener('click', (event) => {
    const liToRemove = event.target.parentElement;
    const titleToRemove = liToRemove.querySelector('span').textContent;

    // Remove a tarefa do array
    tasks = tasks.filter(t => t.title !== titleToRemove);

    // Atualiza o localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Remove o <li> do DOM
    todoListUl.removeChild(liToRemove);
  });

  // Monta o item da lista
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  // Adiciona o <li> à lista
  todoListUl.appendChild(li);
}

// Carrega as tarefas ao carregar a página
window.onload = () => {
  const tasksFromLocalStorage = localStorage.getItem('tasks');
  if (tasksFromLocalStorage) {
    tasks = JSON.parse(tasksFromLocalStorage); // Carrega as tarefas salvas
    tasks.forEach(t => renderTaskOnHTML(t.title, t.done)); // Renderiza cada tarefa
  }
};

// Evento de submissão do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o recarregamento da página ao submeter o formulário

  // Obtém o valor do campo de entrada
  const taskTitle = taskTitleInput.value.trim();

  // Valida se a tarefa tem, pelo menos, 3 caracteres
  if (taskTitle.length < 3) {
    alert('Sua tarefa precisa ter, pelo menos, 3 caracteres.');
    return;
  }

  // Adiciona a nova tarefa ao array
  tasks.push({
    title: taskTitle,
    done: false,
  });

  // Atualiza o localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Adiciona a tarefa ao HTML
  renderTaskOnHTML(taskTitle);

  // Limpa o campo de entrada
  taskTitleInput.value = '';
});
