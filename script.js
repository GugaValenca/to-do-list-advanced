// Função para atualizar o relógio
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    document.getElementById('day-of-week').textContent = daysOfWeek[now.getDay()];
    document.getElementById('full-date').textContent = now.toLocaleDateString('en-US');
}

setInterval(updateClock, 1000);
updateClock();

// Adicionar tarefa
document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const categoryInput = document.getElementById('category-input');
    const taskValue = taskInput.value.trim();
    const categoryValue = categoryInput.value;

    if (taskValue && categoryValue) {
        const li = document.createElement('li');
        li.textContent = taskValue;
        li.classList.add('task');
        li.dataset.category = categoryValue;

        const categorySpan = document.createElement('span');
        categorySpan.textContent = ` "${categoryValue}"`;
        categorySpan.classList.add('category-name');
        li.appendChild(categorySpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-task-btn');
        removeButton.addEventListener('click', () => {
            li.remove();
            updateCategoryButtons();
        });

        li.appendChild(removeButton);

        document.getElementById(`task-list-${categoryValue}`).appendChild(li);
        taskInput.value = '';

        updateCategoryButtons();
    }
});

// Atualizar botões de categoria
function updateCategoryButtons() {
    const categories = ['Personal', 'Work', 'Study'];
    let allListsEmpty = true;

    categories.forEach(category => {
        const categoryList = document.getElementById(`task-list-${category}`);
        const filterButton = document.getElementById(`show-${category.toLowerCase()}`);

        if (categoryList.children.length > 0) {
            filterButton.disabled = false;
            filterButton.style.cursor = 'pointer';
            allListsEmpty = false;
        } else {
            filterButton.disabled = true;
            filterButton.style.cursor = 'not-allowed';
            categoryList.style.display = 'none'; // Esconde a lista se estiver vazia
            filterButton.classList.remove('active-category'); // Remove destaque do botão
        }
    });

    const showAllButton = document.getElementById('show-all');
    showAllButton.disabled = allListsEmpty;
    showAllButton.style.cursor = allListsEmpty ? 'not-allowed' : 'pointer';
}

// Alternar visibilidade das tarefas por categoria
function toggleCategoryList(category) {
    const categoryList = document.getElementById(`task-list-${category}`);
    const filterButton = document.getElementById(`show-${category.toLowerCase()}`);

    if (categoryList.style.display === 'none' || categoryList.style.display === '') {
        categoryList.style.display = 'block';
        filterButton.classList.add('active-category');
    } else {
        categoryList.style.display = 'none';
        filterButton.classList.remove('active-category');
    }

    updateCategoryButtons();
}

// Alternar visibilidade de todas as tarefas
let allVisible = false;
function toggleAllTasks() {
    const categories = ['Personal', 'Work', 'Study'];

    categories.forEach(category => {
        const categoryList = document.getElementById(`task-list-${category}`);
        const filterButton = document.getElementById(`show-${category.toLowerCase()}`);
        categoryList.style.display = allVisible ? 'none' : 'block';
        filterButton.classList.toggle('active-category', !allVisible);
    });

    allVisible = !allVisible;
}

// Inicializar botões de categoria
function initializeCategoryButtons() {
    const categories = ['Personal', 'Work', 'Study'];
    categories.forEach(category => {
        document.getElementById(`show-${category.toLowerCase()}`).addEventListener('click', () => {
            toggleCategoryList(category);
        });
    });

    document.getElementById('show-all').addEventListener('click', toggleAllTasks);
    updateCategoryButtons();
}

// Chamar funções de inicialização
initializeCategoryButtons();
document.getElementById('task-list-Personal').style.display = 'none';
document.getElementById('task-list-Work').style.display = 'none';
document.getElementById('task-list-Study').style.display = 'none';
