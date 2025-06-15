document.addEventListener('DOMContentLoaded', () => {
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email) {
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'success';
            formMessage.classList.remove('hidden');

          
            contactForm.reset();

            setTimeout(() => {
                formMessage.classList.add('hidden');
                formMessage.classList.remove('success');
            }, 5000);
        } else {
            formMessage.textContent = 'Please fill in all required fields (Name and Email).';
            formMessage.className = 'error';
            formMessage.classList.remove('hidden');
        }
    });

    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = ''; 
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = todo.completed ? 'completed' : '';
            listItem.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions">
                    <button data-action="toggle" data-index="${index}">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button data-action="delete" data-index="${index}">Delete</button>
                </div>
            `;
            todoList.appendChild(listItem);
        });
    };

    addTodoBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            todos.push({ text: taskText, completed: false });
            todoInput.value = ''; 
            saveTodos();
            renderTodos();
        }
    });

    todoList.addEventListener('click', (event) => {
        const target = event.target;
        const index = target.dataset.index;

        if (target.dataset.action === 'delete') {
            todos.splice(index, 1); 
            saveTodos();
            renderTodos();
        } else if (target.dataset.action === 'toggle') {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        }
    }); 

    renderTodos();
});