window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const priorityInput = document.querySelector("#new-task-priority");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        const priority = priorityInput.value;

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        // Create a unique ID for each task based on timestamp
        const taskId = `task_${Date.now()}`;
        task_el.setAttribute('data-task-id', taskId);

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_priority_el = document.createElement('div');
        task_priority_el.classList.add('priority');
        task_priority_el.innerText = `Priority: ${priority}`;

        task_el.appendChild(task_priority_el);


        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        // Find the correct position based on priority
        let inserted = false;
        const existingTasks = list_el.querySelectorAll('.task');
        for (const existingTask of existingTasks) {
            const existingPriority = parseInt(existingTask.querySelector('.priority').innerText.match(/\d+/)[0]);
            if (priority <= existingPriority) {
                list_el.insertBefore(task_el, existingTask);
                inserted = true;
                break;
            }
        }

        // If the task has the highest priority, append it to the end
        if (!inserted) {
            list_el.appendChild(task_el);
        }

        input.value = '';
        priorityInput.value = '';

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
        });
    });
});