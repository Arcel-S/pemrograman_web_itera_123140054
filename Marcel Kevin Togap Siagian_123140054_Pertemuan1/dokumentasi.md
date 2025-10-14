# Student Task Management Application

A simple web application to help students manage their academic task list. Built with pure HTML, CSS, and JavaScript, this application stores all data locally in the user's browser using `localStorage`.

## ✨ Features

-   **Add New Task**: Users can add tasks with information including task name, course, and deadline.
-   **Edit Task**: Modify details of existing tasks.
-   **Delete Task**: Remove tasks that are no longer relevant.
-   **Mark Complete/Incomplete**: Change task status with one click.
-   **Local Storage**: All task data is saved in `localStorage`, so it won't be lost when the browser is closed.
-   **Filter & Search**:
    -   Search tasks by name.
    -   Filter tasks by status (Completed, Incomplete, or All).
-   **Task Statistics**: Display the count of incomplete tasks.
-   **Form Validation**: Ensures users cannot submit forms with empty or invalid data (including past deadlines).
-   **Responsive Design**: Good display on various screen sizes.
-   **Modern UI/UX**: Clean, modern interface with smooth animations and intuitive interactions.

## 📸 Application Screenshots

Here are several views of the application:

**1. Main View with Several Tasks**

![Main View](https://github.com/Arcel-S/pemrograman_web_itera_123140054/blob/main/Marcel%20Kevin%20Togap%20Siagian_123140054_Pertemuan1/image/homepage.png)
*Shows the main interface of the application, including both completed and incomplete tasks. The modern card-based design makes it easy to scan through tasks.*

**2. Form for Adding or Editing Tasks**

![Add Task Form](https://github.com/Arcel-S/pemrograman_web_itera_123140054/blob/main/Marcel%20Kevin%20Togap%20Siagian_123140054_Pertemuan1/image/homepage.png)
*The form includes validation - all fields are required and the deadline cannot be in the past. Error messages appear inline below invalid fields.*

**3. View After Using "Completed" Status Filter**

![Filter View](https://github.com/Arcel-S/pemrograman_web_itera_123140054/blob/main/Marcel%20Kevin%20Togap%20Siagian_123140054_Pertemuan1/image/complete%2C%20undo%2C%20edit%2C%20and%20delete.png)
*Demonstrates the functionality, showing completed, undo, edit and delete tasks. The search bar allows filtering by task name or course name as well.*

**4. Form Validation in Action**

![Validation](https://github.com/Arcel-S/pemrograman_web_itera_123140054/blob/main/Marcel%20Kevin%20Togap%20Siagian_123140054_Pertemuan1/image/validation%20deadline.png)
*Shows inline error messages when users attempt to submit invalid data (empty fields or past deadlines).*

**5. Empty State**

![Empty State](https://github.com/Arcel-S/pemrograman_web_itera_123140054/blob/e9787facd4d9d2f17337cb0c0ee1023a768a2d25/Marcel%20Kevin%20Togap%20Siagian_123140054_Pertemuan1/image/empty-state.png)
*User-friendly message displayed when no tasks match the current filter or when the list is empty.*

*(Note: Add actual screenshots by replacing the placeholder paths above)*

## 🚀 How to Run the Application

1.  Download or copy all files (`index.html`, `style.css`, `script.js`) into one folder on your computer.
2.  Open the `index.html` file using a modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft Edge.
3.  The application is ready to use!

**Alternative method using Live Server (recommended for development):**
1.  Install the "Live Server" extension in VS Code
2.  Right-click on `index.html` and select "Open with Live Server"
3.  The application will open in your default browser with auto-reload on changes

## � Implemented Features Checklist

All mandatory features have been successfully implemented:

- ✅ **CRUD Operations (Create, Read, Update, Delete)**
  - Add new tasks with name, course, and deadline
  - Edit existing tasks
  - Delete tasks
  - Mark tasks as complete/incomplete
  
- ✅ **Local Storage Implementation**
  - Data persists across browser sessions
  - Automatic save on every change
  - Data loaded on page initialization
  
- ✅ **Form Validation**
  - Required field validation (name, course, deadline)
  - Deadline cannot be in the past
  - Inline error messages with visual feedback
  - Input fields highlight when invalid
  
- ✅ **Filter and Search**
  - Search tasks by name (real-time)
  - Filter by status (All, Incomplete, Completed)
  - Combined search and filter functionality
  
- ✅ **Statistics**
  - Display count of incomplete tasks
  - Updates automatically when tasks change
  
- ✅ **UI/UX Design**
  - Modern, clean interface with gradient accents
  - Responsive design for mobile and desktop
  - Smooth animations and transitions
  - Empty state message when no tasks
  - Accessible with ARIA labels

## 🔧 Technical Explanation

### Using `localStorage`

This application utilizes `localStorage` for data persistence. `localStorage` is a browser storage mechanism that allows data to persist even after the browser is closed and reopened.

-   **Saving Data**: Every time there's a change to the task list (adding, editing, deleting, or changing status), the `saveTasks()` function is called. This function converts the `tasks` object array into JSON string format using `JSON.stringify()` and saves it to `localStorage` with the key `'tasks'`.
    ```javascript
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    ```

-   **Retrieving Data**: When the page first loads, task data is retrieved from `localStorage` using `localStorage.getItem('tasks')`. The retrieved data is still in string format, so it needs to be converted back into a JavaScript object array using `JSON.parse()`. If there's no data (`null`), an empty array will be initialized.
    ```javascript
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    ```

**Data Flow:**
1. User performs action (add/edit/delete/toggle)
2. `tasks` array is updated in memory
3. `saveTasks()` is called to persist to localStorage
4. `renderTasks()` updates the UI
5. On page reload, data is loaded from localStorage back into `tasks` array

### Form Validation

To ensure data integrity, comprehensive validation is implemented:

1.  **HTML Validation**: The `required` attribute is added to `<input>` elements in `index.html`. This is the first line of defense preventing form submission if any field is empty.

2.  **JavaScript Validation**: Inside the event listener for form `submit`, we check the value of each input again. The `.trim()` function is used to remove spaces at the beginning and end of strings, ensuring that inputs containing only spaces are considered empty.
    
    ```javascript
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        
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
        
        // Validate required fields
        if (!name) { 
            errName.textContent = 'Task name is required.'; 
            taskNameInput.classList.add('invalid'); 
            hasError = true; 
        }
        if (!course) { 
            errCourse.textContent = 'Course is required.'; 
            taskCourseInput.classList.add('invalid'); 
            hasError = true; 
        }
        if (!deadline) { 
            errDeadline.textContent = 'Deadline is required.'; 
            taskDeadlineInput.classList.add('invalid'); 
            hasError = true; 
        }

        // Validate deadline is not in the past
        if (deadline) {
            const today = new Date();
            today.setHours(0,0,0,0);
            const picked = new Date(deadline);
            if (picked < today) {
                errDeadline.textContent = 'Deadline cannot be in the past.'; 
                taskDeadlineInput.classList.add('invalid'); 
                hasError = true;
            }
        }

        if (hasError) return; // Stop execution if validation fails

        // ...continue with add/edit process
    });
    ```

3.  **Visual Feedback**: Invalid fields are highlighted with a red border and error messages appear below each field with problems. The `.invalid` CSS class provides visual feedback, and `aria-live="polite"` ensures screen readers announce errors.

### Event Delegation

The application uses event delegation for efficiency when handling button clicks in the task list:

```javascript
taskList.addEventListener('click', (e) => {
    const target = e.target;
    const parentLi = target.closest('.task-item');
    if (!parentLi) return;

    const taskId = Number(parentLi.dataset.id);
    
    // Handle different button clicks based on class
    if (target.classList.contains('btn-complete')) { /* ... */ }
    if (target.classList.contains('btn-delete')) { /* ... */ }
    if (target.classList.contains('btn-edit')) { /* ... */ }
});
```

This approach attaches a single event listener to the parent `<ul>` instead of individual listeners on each button, improving performance especially with many tasks.

## 💻 Technologies Used

- **HTML5**: Semantic markup and form elements
- **CSS3**: Modern styling with CSS Grid, Flexbox, custom properties (variables), and gradients
- **JavaScript (ES6+)**: Arrow functions, template literals, array methods, localStorage API
- **No external dependencies**: Pure vanilla JavaScript implementation

## 🎨 Design Features

- **CSS Custom Properties**: For consistent theming and easy customization
- **Responsive Grid Layout**: Adapts form and container to different screen sizes
- **Smooth Animations**: Entry animations for tasks, hover effects on buttons
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support
- **Visual Hierarchy**: Clear distinction between headers, forms, and task items

## 📊 Project Structure

```
TUGAS/
├── index.html          # Main HTML structure
├── style.css           # All styling and responsive design
├── script.js           # Application logic and localStorage management
└── dokumentasi.md      # This documentation file
```

## 🔮 Future Enhancements (Optional)

- Add task priority levels (High, Medium, Low)
- Sort tasks by deadline or priority
- Export tasks to CSV or JSON file
- Import tasks from file
- Add categories/tags beyond just course names
- Dark mode toggle
- Task notifications/reminders
- Drag-and-drop reordering


