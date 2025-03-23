// Função para atualizar o relógio
function updateClock() {
    const now = new Date();

    // Horário
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

    // Data
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    const date = now.toLocaleDateString('en-US');

    document.getElementById('day-of-week').textContent = dayOfWeek;
    document.getElementById('full-date').textContent = date;
}

// Atualiza a hora e data a cada segundo
setInterval(updateClock, 1000);
updateClock();  // Chama a função imediatamente para mostrar a hora sem espera

// Função para adicionar tarefas à lista
document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const taskValue = taskInput.value.trim();
    const categoryValue = categoryInput.value;

    if (taskValue && categoryValue) {
        // Criar elemento de tarefa
        const li = document.createElement('li');
        li.textContent = taskValue;
        li.classList.add('task');
        li.dataset.category = categoryValue;  // Atribui a categoria à tarefa

        // Adicionar a categoria ao lado da tarefa entre aspas e com fonte menor
        const categorySpan = document.createElement('span');
        categorySpan.textContent = ` "${categoryValue}"`;  // Categoria entre aspas
        categorySpan.classList.add('category-name');
        li.appendChild(categorySpan);

        // Botão de remover com "X"
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';  // Usando "X" como texto para o botão de remover
        removeButton.classList.add('remove-task-btn');
        removeButton.addEventListener('click', () => {
            li.remove(); // Remove a tarefa
            updateCategoryButtons(); // Atualiza os botões de categoria após remoção
        });

        li.appendChild(removeButton);

        // Adiciona a tarefa à lista da categoria escolhida
        const categoryList = document.getElementById(`task-list-${categoryValue}`);
        categoryList.appendChild(li);
        taskInput.value = ''; // Limpa o campo de input após adicionar

        // Atualiza os botões de filtro
        updateCategoryButtons();
    }
});

// Função para atualizar os botões de categoria com base nas tarefas
function updateCategoryButtons() {
    const categories = ['Personal', 'Work', 'Study']; // As categorias possíveis
    categories.forEach(category => {
        const categoryList = document.getElementById(`task-list-${category}`);
        const filterButton = document.getElementById(`show-${category.toLowerCase()}`);

        // Se houver tarefas, habilita o botão da categoria, senão, desabilita
        if (categoryList.children.length > 0) {
            filterButton.disabled = false;
            filterButton.style.cursor = 'pointer';
        } else {
            filterButton.disabled = true;
            filterButton.style.cursor = 'not-allowed';
        }
    });
}

// Função para alternar entre mostrar e esconder a lista de tarefas de uma categoria
function toggleCategoryList(category) {
    const categoryList = document.getElementById(`task-list-${category}`);
    const filterButton = document.getElementById(`show-${category.toLowerCase()}`);
    
    // Alterna entre mostrar e esconder a lista de tarefas
    if (categoryList.style.display === 'none' || categoryList.style.display === '') {
        categoryList.style.display = 'block';
        // Adiciona a classe para destacar o botão da categoria
        filterButton.classList.add('active-category');
    } else {
        categoryList.style.display = 'none';
        // Remove o destaque do botão
        filterButton.classList.remove('active-category');
    }
}

// Função para alternar entre mostrar e esconder todas as tarefas
let allVisible = false; // Flag para saber se as tarefas estão visíveis ou não
function toggleAllTasks() {
    const allCategoryLists = ['Personal', 'Work', 'Study'];
    allCategoryLists.forEach(category => {
        const categoryList = document.getElementById(`task-list-${category}`);
        const filterButton = document.getElementById(`show-${category.toLowerCase()}`);
        if (allVisible) {
            categoryList.style.display = 'none'; // Esconde todas as listas
            // Remove o destaque do botão
            filterButton.classList.remove('active-category');
        } else {
            categoryList.style.display = 'block'; // Exibe todas as listas
            // Adiciona a classe para destacar o botão da categoria
            filterButton.classList.add('active-category');
        }
    });
    allVisible = !allVisible; // Alterna o estado de visibilidade
}

// Função de inicialização dos botões de categoria
function initializeCategoryButtons() {
    // Adiciona os eventos de clique nos botões de categoria
    const categories = ['Personal', 'Work', 'Study'];
    categories.forEach(category => {
        const filterButton = document.getElementById(`show-${category.toLowerCase()}`);
        filterButton.addEventListener('click', () => {
            toggleCategoryList(category);
        });
    });

    // Evento do botão "ALL" para mostrar/ocultar todas as tarefas
    document.getElementById('show-all').addEventListener('click', () => {
        toggleAllTasks();
    });
}

// Chama a função para inicializar os botões de categoria ao carregar a página
initializeCategoryButtons();

// Inicializa a página com todas as listas de categorias escondidas
document.getElementById('task-list-Personal').style.display = 'none';
document.getElementById('task-list-Work').style.display = 'none';
document.getElementById('task-list-Study').style.display = 'none';
