{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex.done],
            },
            ...tasks.slice(taskIndex + 1),
        ]

        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const markAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneAll = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };


    const renderTasks = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
    <li
     class="list__item ${task.done && hideDoneTasks ? " list__item--hidden" : ""} js-tasks">
      <button class="list__button list__button--toggleDone js-toggleDone">
        ${task.done ? "✓" : ""}
      </button>
      <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>
      <button class="list__button list__button--remove js-remove">
        🗑
     </button>
    </li>
     `;
        }

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
        //jeśli nie ma zadań, to nic nie wyświetlaj//
        if (!tasks.lenght) {
            buttonsElement.innerHTML = "";
            return;
        }

        //a jeśli są to wtedy//

        buttonsElement.innerHTML = `
        <button class="buttons__button js-togglehideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__button js-markAllDone"
        ${tasks.every(({done}) => done) ? "disabled" : ""}>
        Ukończ wszystkie
        </button>
        `;
    };


    const bindButtonsEvents = () => { };


    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}