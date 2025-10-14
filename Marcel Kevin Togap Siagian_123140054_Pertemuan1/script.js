document.addEventListener('DOMContentLoaded', () => {
    // === DOM ELEMENT REFERENCES ===
    const taskForm = document.getElementById('task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskNameInput = document.getElementById('task-name');
    const taskCourseInput = document.getElementById('task-course');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const submitButton = document.getElementById('submit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    const taskList = document.getElementById('task-list');
    const unfinishedCountSpan = document.getElementById('unfinished-count');
    const searchInput = document.getElementById('search-input');
    const filterStatus = document.getElementById('filter-status');

    // === STATE MANAGEMENT ===
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let editTaskId = null;

    // === FUNCTIONS ===

    /**
     * Save tasks array to localStorage
     */
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    /**
     * Render (display) task list to the page
     */
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear list before re-rendering
        const emptyState = document.getElementById('empty-state');

        // Get filter values
        const searchTerm = searchInput.value.toLowerCase();
        const statusFilter = filterStatus.value;

        // Filter tasks based on search and status
        const filteredTasks = tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchTerm) || task.course.toLowerCase().includes(searchTerm);
            const matchesStatus = (statusFilter === 'all') ||
                                  (statusFilter === 'completed' && task.completed) ||
                                  (statusFilter === 'incomplete' && !task.completed);
            return matchesSearch && matchesStatus;
        });

        if (filteredTasks.length === 0) {
            emptyState.setAttribute('aria-hidden', 'false');
            emptyState.style.display = 'block';
        } else {
            emptyState.setAttribute('aria-hidden', 'true');
            emptyState.style.display = 'none';

            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.dataset.id = task.id;

                li.innerHTML = `
                    <div class="task-details">
                        <strong>${task.name}</strong>
                        <div class="meta">
                            <span>Course: ${task.course}</span> | 
                            <span>Deadline: ${task.deadline}</span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="btn-complete">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button class="btn-edit">Edit</button>
                        <button class="btn-delete">Delete</button>
                    </div>
                `;
                li.classList.add('enter');
                taskList.appendChild(li);
                requestAnimationFrame(() => {
                    li.classList.remove('enter');
                });
            });
        }
        updateStats();
    };

    /**
     * Update count of incomplete tasks
     */
    const updateStats = () => {
        const unfinishedCount = tasks.filter(task => !task.completed).length;
        unfinishedCountSpan.textContent = unfinishedCount;
    };

    /**
     * Clear form and reset edit state
     */
    const resetForm = () => {
        taskForm.reset();
        taskIdInput.value = '';
        editTaskId = null;
        submitButton.textContent = 'Add Task';
        cancelEditButton.classList.add('hidden');
    };

    // === EVENT LISTENERS ===

    /**
     * Handle form submit to add or edit task
     */
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Form Validation
        const name = taskNameInput.value.trim();
        const course = taskCourseInput.value.trim();
        const deadline = taskDeadlineInput.value;

        // Clear previous errors
        const errName = document.getElementById('error-name');
        const errCourse = document.getElementById('error-course');
        const errDeadline = document.getElementById('error-deadline');
        errName.textContent = '';
        errCourse.textContent = '';
        errDeadline.textContent = '';

        let hasError = false;
        taskNameInput.classList.remove('invalid');
        taskCourseInput.classList.remove('invalid');
        taskDeadlineInput.classList.remove('invalid');

        if (!name) { errName.textContent = 'Task name is required.'; taskNameInput.classList.add('invalid'); hasError = true; }
        if (!course) { errCourse.textContent = 'Course is required.'; taskCourseInput.classList.add('invalid'); hasError = true; }
        if (!deadline) { errDeadline.textContent = 'Deadline is required.'; taskDeadlineInput.classList.add('invalid'); hasError = true; }

        if (deadline) {
            const today = new Date();
            today.setHours(0,0,0,0);
            const picked = new Date(deadline);
            if (picked < today) {
                errDeadline.textContent = 'Deadline cannot be in the past.'; taskDeadlineInput.classList.add('invalid'); hasError = true;
            }
        }

        if (hasError) return;

        if (editTaskId) {
            // Edit logic
            const taskIndex = tasks.findIndex(task => task.id === editTaskId);
            if (taskIndex > -1) {
                tasks[taskIndex] = { ...tasks[taskIndex], name, course, deadline };
            }
        } else {
            // Add logic
            const newTask = {
                id: Date.now(),
                name,
                course,
                deadline,
                completed: false
            };
            tasks.push(newTask);
        }

        saveTasks();
        renderTasks();
        resetForm();
    });

    /**
     * Handle click on Cancel Edit button
     */
    cancelEditButton.addEventListener('click', () => {
        resetForm();
    });

    /**
     * Handle clicks on buttons in task list
     */
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const parentLi = target.closest('.task-item');
        if (!parentLi) return;

        const taskId = Number(parentLi.dataset.id);

        // Mark Complete / Undo
        if (target.classList.contains('btn-complete')) {
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            if (taskIndex > -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                saveTasks();
                renderTasks();
            }
        }

        // Delete Task
        if (target.classList.contains('btn-delete')) {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks = tasks.filter(task => task.id !== taskId);
                saveTasks();
                renderTasks();
            }
        }

        // Edit Task
        if (target.classList.contains('btn-edit')) {
            const taskToEdit = tasks.find(task => task.id === taskId);
            if (taskToEdit) {
                taskNameInput.value = taskToEdit.name;
                taskCourseInput.value = taskToEdit.course;
                taskDeadlineInput.value = taskToEdit.deadline;
                editTaskId = taskId;
                submitButton.textContent = 'Update Task';
                cancelEditButton.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
    
    // Listeners for filter and search
    searchInput.addEventListener('input', renderTasks);
    filterStatus.addEventListener('change', renderTasks);

    // === INITIALIZATION ===
    renderTasks();
});