
const list = document.getElementById('list');
const form = document.getElementById('form');
const input = document.getElementById('text');
const message = document.getElementById('message');

let tasks = [];

// Load saved tasks when the page opens
try {
    const saved = JSON.parse(
        localStorage.getItem('practice-tasks') || '[]'
    );

    if (Array.isArray(saved)) {
        tasks = saved.filter(task => typeof task === 'string');
    }
} catch (error) {
    tasks = [];
}

// Save tasks in browser storage
function save() {
    localStorage.setItem('practice-tasks', JSON.stringify(tasks));
}

// Display all tasks
function render() {
    list.replaceChildren();

    tasks.forEach((task, index) => {
        const row = document.createElement('li');
        row.textContent = task + ' ';

        const button = document.createElement('button');
        button.textContent = 'Delete';

        // Delete the selected task
        button.onclick = () => {
            tasks.splice(index, 1);
            save();
            render();
            message.textContent = 'Task deleted successfully!';
        };

        row.append(button);
        list.append(row);
    });
}

// Add a new task
form.onsubmit = (event) => {
    event.preventDefault();

    const text = input.value.trim();

    // Do not allow empty tasks
    if (text === '') {
        message.textContent = 'Please enter a task!';
        input.focus();
        return;
    }

    tasks.push(text);

    save();
    render();

    input.value = '';
    message.textContent = 'Task added successfully!';
};

render();
