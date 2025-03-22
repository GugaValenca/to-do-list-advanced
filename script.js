// Seletores de elementos HTML
const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const categoryInput = document.getElementById('category-input');
const taskList = document.getElementById('task-list');
const showAllButton = document.getElementById('show-all');
const showPessoalButton = document.getElementById('show-pessoal');
const showTrabalhoButton = document.getElementById('show-trabalho');
const showEstudosButton = document.getElementById('show-estudos');

// Função para carregar as tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Função para salvar as tarefas no localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para criar um novo item de tarefa
function createTaskElement(task) {
    const li = document.createElement('li');
    li.classList.add(task.completed ? 'completed' : '');
    li.dataset.id = task.id;

    li.innerHTML = `
        <span>${task.name} - ${task.category}</span>
        <button class="delete-btn">Excluir</button>
        <button class="complete-btn">${task.completed ? 'Desmarcar' : 'Concluir'}</button>
    `;

    // Função para excluir tarefa
    li.querySelector('.delete-btn').addEventListener('click', () => {
        deleteTask(task.id);
    });

    // Função para marcar/desmarcar tarefa
    li.querySelector('.complete-btn').addEventListener('click', () => {
        toggleCompleteTask(task.id);
    });

    taskList.appendChild(li);
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskName = taskInput.value.trim();
    const category = categoryInput.value;

    if (!taskName) {
        alert('Por favor, adicione uma descrição para a tarefa.');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        id: Date.now(),
        name: taskName,
        category: category,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    createTaskElement(newTask);

    taskInput.value = '';
}

// Função para excluir uma tarefa
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    loadTasks();
}

// Função para marcar/desmarcar uma tarefa como concluída
function toggleCompleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasks(tasks);
    loadTasks();
}

// Filtros para tarefas por categoria
showAllButton.addEventListener('click', () => {
    loadTasks();
});

showPessoalButton.addEventListener('click', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.category === 'Pessoal');
    taskList.innerHTML = '';
    filteredTasks.forEach(task => createTaskElement(task));
});

showTrabalhoButton.addEventListener('click', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.category === 'Trabalho');
    taskList.innerHTML = '';
    filteredTasks.forEach(task => createTaskElement(task));
});

showEstudosButton.addEventListener('click', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.category === 'Estudos');
    taskList.innerHTML = '';
    filteredTasks.forEach(task => createTaskElement(task));
});

// Event listener para adicionar tarefa
addTaskButton.addEventListener('click', addTask);

// Carregar as tarefas ao iniciar
loadTasks();

const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const dataAtual = document.getElementById('data-atual');

const relogio = setInterval(function time() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;
    if (min < 10) min = '0' + min;
    if (s < 10) s = '0' + s;

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = s;

    // Exibindo a data no formato "Dia da semana, DD/MM/AAAA"
    let diaDaSemana = dateToday.toLocaleDateString('pt-BR', { weekday: 'long' });
    let data = dateToday.toLocaleDateString('pt-BR');
    dataAtual.textContent = `${diaDaSemana}, ${data}`;
}, 1000);
