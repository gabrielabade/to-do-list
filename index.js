// Selecionando elementos do DOM
    const form = document.querySelector('#to-do-form');
    const taskTitleInput = document.querySelector('#task-title-input');
    const todoListUl = document.querySelector('#todo-list');

    // Array para armazenar as tarefas
    let tasks = [];

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
      tasks.push(taskTitle);

      // Adiciona a nova tarefa no HTML
      const li = document.createElement('li'); // Cria um elemento <li>
      
      const input = document.createElement('input')// cria o input
      input.setAttribute("type","checkbox")// input type checkbox

      const span = document.createElement("span")
      span.textContent = taskTitle

      const button = document.createElement("button")
      button.textContent = 'Remover'

      li.appendChild(input)
      li.appendChild(span)
      li.appendChild(button)

      todoListUl.appendChild(li); // Adiciona o <li> à lista
      taskTitleInput.value = ''; // Limpa o campo de entrada
    });