
/**
 * start at onload to load all tepmlates to every site
 */
async function init() {
    await includeHTML();
}

/**
 * function fetches HTML content from external files based on elements with a specific attribute,
 * then inserts the content into those elements on a webpage asynchronously
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

/**
 * load white task field
 * @returns - the code as html
 */
function bordAddTaskFieldHtml() {
    return `
        <div class="bord-add-tasks-field" onclick="noCloseContent(event)" id="add_task_page"></div>
    `;
}

/**
 * placeholder for todo, no tasks in array
 * @returns - the code as html
 */
function emptyTaskFieldTodo() {
    return `
        <div class="empty-task-place">No tasks To Do</div>
    `;
}

/**
 * placeholder for in progress, no tasks in array
 * @returns - the code as html
 */
function emptyTaskFieldInprogress() {
    return `
        <div class="empty-task-place">No tasks In progress</div>
    `;
}

/**
 * placeholder for await feedback, no tasks in array
 * @returns - the code as html
 */
function emptyTaskFieldAwaitfeedback() {
    return `
        <div class="empty-task-place">no tasks await feedback</div>
    `;
}

/**
 * placeholder for done, no tasks in array
 * @returns - the code as html
 */
function emptyTaskFieldDone() {
    return `
        <div class="empty-task-place">no tasks done</div>
    `;
}

/**
 * create user story style element
 * @returns - the code as html
 */
function userTaskHtml() {
    return `
          <p class="user-story">user story</p>
      `;
}

/**
 * create technical task style element
 * @returns - the code as html
 */
function technicalTaskHtml() {
    return `
          <p class="technical-task">technical task</p>
      `;
}

/**
 * create empty task style element, no task found per search
 * @returns - the code as html
 */
function nothingFound() {
    return `
        <p class="empty-task-place">nothing found</p>
    `;
}

/**
 * create urgent priority style element, as image
 * @returns - the code as html
 */
function urgentPrioHtml() {
    return `
        <img class="low-image" src="./assets/img/urgent.png"></img>
    `;
}

/**
 * create low priority style element, as image
 * @returns - the code as html
 */
function lowPrioHtml() {
    return `
        <img class="low-image" src="./assets/img/low.png"></img>
    `;
}

/**
 * create medium priority style element, as image
 * @returns - the code as html
 */
function mediumPrioHtml() {
    return `
        <img class="low-image" src="./assets/img/medium_two.png"></img>
    `;
}

/**
 * create urgent priority style element, as image and name it
 * @returns - the code as html
 */
function urgentPrioHtmlOpenTask() {
    return `
        <span>Urgent</span>
        <img class="low-image" src="./assets/img/urgent.png"></img>
    `;
}

/**
 * create low priority style element, as image and name it
 * @returns - the code as html
 */
function lowPrioHtmlOpenTask() {
    return `
        <span>Low</span>
        <img class="low-image" src="./assets/img/low.png"></img>
    `;
}

/**
 * create medium priority style element, as image and name it
 * @returns - the code as html
 */
function mediumPrioHtmlOpenTask() {
    return `
        <span>Medium</span>
        <img class="low-image" src="./assets/img/medium_two.png"></img>
    `;
}

/**
 * generate progressbar in html code
 * @param {number} percent - style the progressbar, by checked subtasks
 * @returns - the code as html for the progressbar
 */
function createProgressBar(percent) {
    return `
        <div class="progress-bar" role="progressbar" aria-label="Example with label" aria-valuenow="25">
            <div class="progressbar" id="progressbar" style ="width: ${percent}%"</div>
        </div>
    `;
}

/**
 * generate a box, and style these box, if hovered by an dragged element
 * @returns - the code as html for the hoverbox
 */
function hoverHtml() {
    return `
        <div ondragover="this.style.background = '#F4F4F4'; this.style.borderStyle = 'dashed';" 
            ondragleave="this.style.background = '#f6f7f8'; this.style.borderStyle = 'none';" 
            class="box-hover">
        </div>
    `;
}

/**
 * generate html element to check up the subtasks in numbers
 * @param {number} subtasklenght - created number of all subtasks
 * @param {number} selectedCheckboxCount - created number of all checked subtasks
 * @returns - the code as html for the subtasks in numbers
 */
function subtaskProgressbarHtml(subtasklenght, selectedCheckboxCount) {
    return `
        <p class="subtasktxt">${selectedCheckboxCount - 1}/${subtasklenght}Subtasks</p>
    `;
}

/**
 * generate an epmty html place field
 * @returns - the code as html
 */
function empty() {
    return ``;
}

/**
 * generate an styled html menu, to move single tasks in mobile version
 * @returns - the code as html for the mobile menu
 */
function moveTaskMenue() {
    return `
        <div class="menu-move-container" onclick="noCloseContent(event)">
            <h3 class="move-to">move to menu</h3>
            <div onclick="moveTask('todo')" id="light_todo" class="styled-arrays">To do</div>
            <div onclick="moveTask('tasksinprogress')" id="light_inprogress" class="styled-arrays">In progress</div>
            <div onclick="moveTask('awaitingfeedback')" id="light_awaitfeedback" class="styled-arrays">Await feedback</div>
            <div onclick="moveTask('done')" id="light_done" class="styled-arrays">Done</div>
        </div>
    `;
}

/**
 * enerates HTML markup for a single subtask element, including a checkbox, an image label, and a text label. It accepts parameters for the subtasks
 * @param {number} index - the number of the current subtasks
 * @param {boolean} isChecked - true or false of checked subtask
 * @param {string} subtask - named subtasks
 * @param {string} imgSrc - image for the checked / and unchecked checkbox
 * @returns - the code as html for subtasks
 */
function generateSubsHtml(index, isChecked, subtask, imgSrc) {
    let subHtml = "";
    subHtml += `<li><input class="check-bord" id="toggle_button${index}" type="checkbox" onchange="updateSelectedCheckboxes(${index}, this.checked)" ${isChecked}>`;
    subHtml += `<label for="toggle_button${index}"><img id="subtask${index}" src="${imgSrc}"></label>`;
    subHtml += `<label class="single-subtask-element" for="subtask${index}">${subtask}</label></li>`;
    return subHtml;
}

/**
 * generates HTML markup for a todo task container with dynamic content based on provided parameters
 * @param {array} choosencategory - representing task catgeroy  
 * @param {array} title - representing task title
 * @param {array} description - representing task description
 * @param {number} i - current task
 * @param {string} subtaskstodo - representing task subtasks html as progressbar
 * @param {array} contactstodo - representing task contacts
 * @param {array} priority - representing task priority
 * @param {string} choosensubs - representing task check / unched subtasks and all subtasks as html
 * @returns - a formatted string with dynamic content based on the provided parameters
 */
function todoTaskHtml(choosencategory, title, description, i, subtaskstodo, contactstodo, priority, choosensubs) {
    return `
        <div id="${i}" class="todo-task-container" onclick="openBordTask(${i}, this)" draggable="true" ondragstart="drag(${i}, this)">
            <div class="mobile-move-place" onclick="noCloseContent(event)">
                <div class="collect-category">${choosencategory}</div>
                <button class="move-mobile" onclick="openMoveMenue(${i}, this)">move</button>
            </div>
            <h3 class="bord-title">${title}</h3>    
            <div class="bord-descript-max-height">
                <span class="bord-descript">${description}</span>
            </div>
            <div class="place-task-progress">
                <div class="collect-subtask">${subtaskstodo}</div>
                <p class="subtasktxt">${choosensubs}</p>
            </div>
            <div class="place-user-status">
                <div class="place-user">
                    ${contactstodo}
                </div>
                <div class="low-image">
                    ${priority}
                </div>
            </div>
        </div>
    `;
}

/**
 * markup for a full single task card with dynamic content based on provided parameters
 * @param {array} choosencategory - representing task category
 * @param {array} title - representing task title
 * @param {array} description - representing task descript
 * @param {number} i - current task
 * @param {array} priotodo - representing task priority
 * @param {array} date - representing task date
 * @param {string} subtaskstodo - representing task subtasks
 * @param {string} contacts - representing task contacts
 * @param {array} key - representing current task array
 * @returns - a formatted string with dynamic content based on the provided parameters
 */
function fullTaskHtml(choosencategory, title, description, i, priotodo, date, subtaskstodo, contacts, key) {
    return `
        <div class="single-task-field" onclick="noCloseContent(event)">
            <div class="place-categorie-cross">
                <div class="collect-category">${choosencategory}</div>
                <img onclick="closeCard()" class="single-task-close" src="./assets/img/close.png">
            </div>
            <div class="place-single-information">
                <h1 class="task-head-bord">${title}</h1>
                <div class="descript">${description}</div>
                <div class="place-due-date-bord">
                    <span class="single-task-design">Due date:&nbsp;</span>
                    <span class="due-date-bord">${date}</span>
                </div>
                <div class="place-priority-bord single-task-design">
                    <span>Priority:&nbsp;</span>
                    <span class="priority-bord">${priotodo}</span>
                </div>
                <div class="assigned-to-bord single-task-design">Assigned To:</div>
                    <div class="place-user-single-card">
                        ${contacts}
                    </div>
                    <span class="subtasks-bord single-task-design">Subtasks:</span>
                    <div class="subtasks-input-bord">
                        <ul>
                            ${subtaskstodo}
                        </ul>
                    </div>
                </div>
                <div class="place-delete-edit">
                    <div onclick="deleteSingleTask(${i})" class="delete-place">
                        <img class="delete" src="./assets/img/delete.png">
                        <span>Delete</span>
                    </div>
                    <div class="one-px-line"></div>
                <div onclick="editSingleTask(${i}, '${key}')" class="edit-place">
                    <img class="edit" src="./assets/img/edit.png">
                    <span>Edit</span>
                </div>
            </div>
        </div>
      `;
}

/**
 * markup for a full single task card with dynamic content based on provided parameters, to edit the single choosen task
 * @param {array} titletodo - representing task title
 * @param {array} descriptiontodo - representing task description
 * @param {array} i - current task
 * @param {array} choosenpriority - representing task description
 * @param {array} datetodo - representing task date
 * @param {array} key - representing current task array
 * @returns - a formatted string with dynamic content based on the provided parameters
 */
function editTaskHtml(titletodo, descriptiontodo, i, choosenpriority, datetodo, key) {
    return `
        <div class="single-task-field" onclick="noCloseContent(event)">
            <main class="edit-task">
                <form class="add-task-form-section" onsubmit="applyChangesToTask(${i}, '${key}');return false"  autocomplete="off">
                    <div class="input-wrapper scroll-wrapper">
                        <section class="input-box">
                            <div id="add_task_title">
                                <div class="required-header">
                                    <h3>Title</h3>
                                    <h3 style="color: #FF8190;">*</h3>
                                </div>
                                <input class="styled-input focus-blue" placeholder="Enter a title" required type="text"
                                    id="add_task_title_input" maxlength="35" value="${titletodo}">
                            </div>
                            <span class="required-field dnone">This field is required</span>
                            <div id="add_task_description">
                                <h3>Description</h3>
                                <div class="textarea-wrapper">
                                    <textarea class="focus-blue" placeholder="Enter a Description" name="add_task_description"
                                        id="add_task_description_textarea" spellcheck="false">${descriptiontodo}</textarea>
                                </div>
                            </div>
                        </section>
                        <section class="input-box">
                            <div id="add_task_due_date">
                                <div class="required-header">
                                    <h3>Due date</h3>
                                    <h3 style="color: #FF8190;">*</h3>
                                </div>
                                <div class="input-with-button-wrapper">
                                    <input id="input_with_button_date" class="styled-input focus-blue" placeholder="dd/mm/yyyy"
                                        type="text" required pattern="([0-9]{2}\/[0-9]{2}\/[0-9]{4})" value="${datetodo}">
                                    <input id="input_calendar" class="calendar-input" type="date" value=""
                                        onchange="transferDate()" min='1899-01-01'>
                                </div>
                                <span class="required-field dnone">This field is required</span>
                            </div>
                            <div class="add_task_prio">
                                <h3>Prio</h3>
                                <div id="prio-buttons">
                                    <input id="prio_urgent" name="prio" type="radio" value="urgent">
                                    <label id="prio_urgent_label" for="prio_urgent" onclick="handleClickPrio('urgent')">
                                        <span>Urgent</span>
                                        <img src="./assets/img/urgent.svg" alt="urgent">
                                    </label>
                                    <input id="prio_medium" name="prio" type="radio" value="medium">
                                    <label id="prio_medium_label" for="prio_medium" onclick="handleClickPrio('medium')">
                                        <span>Medium</span>
                                        <img src="./assets/img/medium.svg" alt="medium">
                                    </label>
                                    <input id="prio_low" name="prio" type="radio" value="low">
                                    <label id="prio_low_label" for="prio_low" onclick="handleClickPrio('low')">
                                        <span>Low</span>
                                        <img src="./assets/img/low.svg" alt="low">
                                    </label>
                                </div>
                            </div>
                            <div id="add_task_assigned_to">
                                <h3>Assigned to</h3>
                                <div class="input-with-button-wrapper">
                                    <input class="styled-input focus-blue" placeholder="Select contacts to assign" type="text"
                                        id="input_with_button_assigned_to"
                                        onfocusin="openDropDownMenu('drop_down_assigned_to', 'in')"
                                        onfocusout="openDropDownMenu('drop_down_assigned_to', 'out')" oninput="setFilter(this)">
                                    <a onclick="setFocusOnElement('input_with_button_assigned_to', event)">
                                        <img id="drop_down_assigned_to_arrow" src="./assets/img/arrow_drop_down.png" alt="add">
                                    </a>
                                    </div>
                                    <div class="drop-down dnone custom-scrollbar" id="drop_down_assigned_to"></div>
                                <div id="selected_contacts"></div>
                            </div>
                            <div class="edit-place-user-single-card">
                            </div>
                            <div id="add_task_subtask">
                                <h3>Subtask</h3>
                                <div class="input-with-button-wrapper">
                                    <input class="styled-input focus-blue" placeholder="Add new subtask" type="text"
                                        id="input_with_button_subtask" onfocusin="changeSubtaskIcons('in')"
                                        onfocusout="changeSubtaskIcons('out')" maxlength="35">
                                    <a id="add_subtask_button" onclick="setFocusOnElement('subtask')">
                                        <img src="./assets/img/add.png" alt="add">
                                    </a>
                                    <div id="confirm_subtask_container" class="input-with-double-button dnone">
                                        <a id="clear_subtask_button"
                                            onmousedown="dontChangeFocus(event); clearInput('input_with_button_subtask')">
                                            <img src="./assets/img/cross.svg" alt="cross">
                                        </a>
                                        <div class="separator-vertical"></div>
                                        <a id="confirm_subtask_button"
                                            onmousedown="dontChangeFocus(event); addSubtask('input_with_button_subtask')">
                                            <img src="./assets/img/check.svg" alt="check">
                                        </a>
                                    </div>
                                </div>
                                <div id="selected_subtasks"></div>
                            </div>
                        </section>
                    </div>
                    <section class="bottom-section">
                        <div class="bottom-buttons">
                            <button class="blue-button create-task-button">
                                <span>Ok</span>
                                <img src="./assets/img/check.png" alt="create task">
                            </button>
                        </div>
                    </section>
                </form>
            </main>
        </div>    
    `;
}
