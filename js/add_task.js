let tasks = [];
let allcategories = [{ idcounter: 1 }, { id: 0, name: "Technical Task" }, { id: 1, name: "User Story" }];
let allsubtasks = [{ idcounter: 0 }];
let selectedcontacts = [];
let currentTask = {};
let currentSubtask = {};

async function fillAddTaskSectionload() {
    fillAddTaskSection();
}

/**
 * This function adds several components to the add-task-page like dropdown-menus, event-listeners, minimum-date and selects a priority.
 *
 * @param {number} i - This optional variable is the index of the task, that gets edited.
 * @param {string} priotodo - This optional variable is the priority of the task, that gets edited.
 */
function initAddTask(i, priotodo) {
    renderAssignedTo();
    if (i === undefined) renderCategory();
    addAddTaskEventListeners();
    setMinDate();
    selectPrio(priotodo);
}

/**
 * This function renders the contacts-dropdown-menu of the assigned-to-section.
 *
 * @param {string} searchterm - This optional variable is the search-term to filter the dropdown-menu on input.
 */
function renderAssignedTo(searchterm) {
    if (users[loaduser].contacts && users[loaduser].contacts.length > 0) {
        let dropdown = document.getElementById("drop_down_assigned_to");
        dropdown.innerHTML = "";
        for (let i = 0; i < users[loaduser].contacts.length; i++) {
            const contact = users[loaduser].contacts[i];
            if (!contact.firstname) continue;
            const contactdata = generateContactData(contact);
            if (!searchterm || contactdata.fullname.toLowerCase().includes(searchterm)) dropdown.innerHTML += generateContactDropdownHtml(contact, contactdata);
        }
    }
}

/**
 * This function generates the abbreviation, fullname and the first Letter of the first name of a contact for further processing.
 *
 * @param {array} contact - This is the contact-array to generate the data from.
 * @returns - the generated contact-data
 */
function generateContactData(contact) {
    const contactdata = {};
    contactdata.abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
    contactdata.fullname = contact.firstname + " " + contact.lastname;
    contactdata.firstLetter = contact.firstname.charAt(0).toUpperCase();
    return contactdata;
}

/**
 * This function selects the correct dropdown-menu and rerenders it filtered by the search-term.
 *
 * @param {string} input - This is the input-field, that contains the search-term.
 */
function setFilter(input) {
    let searchterm = input.value.toLowerCase();
    if (input.id.includes("assigned_to")) {
        renderAssignedTo(searchterm);
    } else if (input.id.includes("category")) {
        renderCategory(searchterm);
    }
}

/**
 * This function renders the dropdown-menu of the category-section.
 *
 * @param {string} searchterm - This optional variable is the search-term to filter the dropdown-menu on input.
 */
function renderCategory(searchterm) {
    let dropdown = document.getElementById("drop_down_category");
    dropdown.innerHTML = "";
    for (let i = 0; i < allcategories.length; i++) {
        const category = allcategories[i];
        if (!category.name) continue;
        if (!searchterm || category.name.toLowerCase().includes(searchterm)) dropdown.innerHTML += generateCategoryHtml(category);
    }
}

/**
 * This function prevents the arrow of the dropdown-menu from taking the focus from the input-field.
 *
 * @param {event} event - This is the event that is supposed to be prevented, in this case changing the focus from the input-field to the arrow.
 */
function dontChangeFocus(event) {
    event.preventDefault();
}

/**
 * This function adds/deletes a contact to/from the selectedcontacts-global-variable and changes its appereance in the dropdown-menu.
 *
 * @param {element} entry - This is the clicked element in the dropdown-menu.
 * @param {number} id - This is the unique-id of the selected contact.
 * @param {boolean} selected - This tells wether the contacts is currently selected or not.
 */
function selectTaskContact(entry, id, selected) {
    entry.classList.toggle("selected");
    entry.children[1].attributes[0].value === "./assets/img/check_button_unchecked.svg" ? (entry.children[1].src = "./assets/img/check_button_checked.svg") : entry.children[1].attributes[0].value === "./assets/img/check_button_checked.svg" ? (entry.children[1].src = "./assets/img/check_button_unchecked.svg") : "";
    if (selected === true) {
        const index = selectedcontacts.findIndex((element) => element.id === id);
        selectedcontacts.splice(index, 1);
    } else {
        selectedcontacts.push(users[loaduser].contacts.find((element) => element.id === id));
    }
    entry.setAttribute("onmousedown", `dontChangeFocus(event); selectTaskContact(this, ${id}, ${!selected})`);
    renderSelectedContacts();
}

/**
 * This function sets the selected priority of the task or sets it back to 'medium' on clear.
 *
 * @param {string} prio - This optional variable is the selected priority.
 */
function handleClickPrio(prio) {
    if (prio) {
        selectPrio(prio);
    } else {
        clearPrioButtons();
    }
}

/**
 * This function searches for a specific contact-id in the elements onmousedown-function and sets this contact as selected.
 *
 * @param {number} id - This is the unique-id of the selected contact.
 */
function selectContactById(id) {
    let allContainers = document.querySelectorAll("div.contact-list-entry");
    for (let i = 0; i < allContainers.length; i++) {
        const container = allContainers[i];
        const onMouseDownFunction = container.attributes.onmousedown.value;
        let match = /[0-9]+/g.exec(`${onMouseDownFunction}`);
        if (match == `${id}`) {
            selectTaskContact(container, id);
        }
    }
}

/**
 * This function sets the selected priority for the task and changes the appereances of the priority-buttons.
 *
 * @param {string} prio - This is the selected priority.
 */
function selectPrio(prio) {
    if (!prio) prio = "medium";
    let label = document.getElementById("prio_" + prio + "_label");
    if (label.parentElement.querySelector("label.highlighted-button")) label.parentElement.querySelector("label.highlighted-button").classList.remove("highlighted-button");
    label.classList.add("highlighted-button");
    document.getElementById("prio_" + prio).checked = true;
}

/**
 * This function sets the priority to unselected and then selects the default priority 'medium'.
 */
function clearPrioButtons() {
    document.getElementsByName("prio").forEach((element) => {
        element.checked = false;
    });
    document.querySelector(".highlighted-button").classList.remove("highlighted-button");
    selectPrio();
}

/**
 * This function sets the selected category.
 *
 * @param {number} id - This is the unique-id of the selected category.
 */
function selectTaskCategory(id) {
    const input = document.getElementById("input_with_button_category");
    input.value = allcategories.find((element) => element.id === id).name;
    input.blur();
}

/**
 * This function places the profile-badges under the input-field of the select-contacts-section.
 */
function renderSelectedContacts() {
    let container = document.getElementById("selected_contacts");
    container.innerHTML = "";
    for (let i = 0; i < selectedcontacts.length; i++) {
        const contact = selectedcontacts[i];
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        container.innerHTML += `<span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>`;
    }
}

/**
 * This function opens/closes the dropdown-menu and rotates the arrow-icon on focus in/out.
 *
 * @param {number} id - This is the id of the dropdown-menu.
 * @param {string} focus - This tells wether the focus is in/out.
 */
function openDropDownMenu(id, focus) {
    if (focus === "in") {
        document.getElementById(id).classList.remove("dnone");
        document.getElementById(id + "_arrow").style.transform = "rotate(180deg)";
    } else if (focus === "out") {
        document.getElementById(id).classList.add("dnone");
        document.getElementById(id + "_arrow").style.transform = "rotate(0deg)";
    }
}

/**
 *  This function sets/removes the focus on/from the input-field when clicking on the arrow-icon to open/close the dropdown-menu.
 *
 * @param {number} id - This is the id-snippet to select the correct input-field and dropdown-menu.
 */
function setFocusOnElement(id) {
    let input = document.getElementById("input_with_button_" + id);
    let dropdown = document.getElementById("drop_down_" + id);
    if (dropdown && dropdown.classList.contains("dnone")) {
        input.focus();
    } else if (dropdown && !dropdown.classList.contains("dnone")) {
        input.blur();
    } else {
        input.focus();
    }
}

/**
 * This function exchanges the plus-icon with cross- and check-icon to clear the subtask-input-field or add a new subtask.
 */
function changeSubtaskIcons() {
    document.getElementById("add_subtask_button").classList.toggle("dnone");
    document.getElementById("confirm_subtask_container").classList.toggle("dnone");
}

/**
 * This function clears an input-field by its id.
 *
 * @param {string} id - This is the id of the input-field.
 */
function clearInput(id) {
    document.getElementById(id).value = "";
}

/**
 * This function adds a new or edits an existing subtask.
 *
 * @param {number} inputid - This is the unique-id of the subtask.
 * @param {array} subtask - This is the complete subtask, that is to be edited.
 */
function addSubtask(inputid, subtask) {
    !subtask ? (input = document.getElementById(inputid)) : (input = subtask);
    setSubtaskData(input, subtask);
    allsubtasks.push(currentSubtask);
    allsubtasks[0].idcounter++;
    document.getElementById("selected_subtasks").innerHTML += renderSubtask();
    currentSubtask = {};
    input.value = "";
}

/**
 * This function chooses the correct elements to pull the new subtask-data from.
 *
 * @param {string} input - This is the id of the input-field to pull the name of a new subtask from.
 * @param {array} subtask - This is the complete subtask that is to be edited
 */
function setSubtaskData(input, subtask) {
    currentSubtask;
    if (!subtask) {
        currentSubtask.id = allsubtasks[0].idcounter;
        currentSubtask.name = input.value;
        currentSubtask.isChecked = false;
    } else {
        currentSubtask = subtask;
    }
}

/**
 * This function stops the default event of an element from having an effect.
 *
 * @param {event} event - This is the event, that is to be prevented.
 */
function fstopPropagation(event) {
    event.stopPropagation();
}

/**
 * This function changes a subtask to make it editable.
 *
 * @param {element} entry - This is the subtask-html-element in the dropdown-menu.
 * @param {number} id - This is the id of the subtask that is to be edited.
 */
function editSubtask(entry, id) {
    const index = allsubtasks.findIndex((element) => element.id === id);
    entry.innerHTML = generateEditSubtaskHtml(id);
    entry.classList.add("border-bottom-blue");
    let name = allsubtasks[index].name;
    let input = document.getElementById(`subtask_edition_input_${id}`);
    input.value = name;
}

/**
 * This function deletes a subtask from the array and the dropdown-menu.
 *
 * @param {element} entry - This is the subtask-html-element in the dropdown-menu.
 * @param {number} id - This is the id of the subtask that is to be deleted.
 */
function deleteSubtask(entry, id) {
    const index = allsubtasks.findIndex((element) => element.id === id);
    allsubtasks.splice(index, 1);
    entry.remove();
}

/**
 * This function writes the new data to the array and the dropdown-menu of the edited subtask.
 *
 * @param {element} entry - This is the subtask-html-element in the dropdown-menu.
 * @param {number} id - This is the id of the subtask that is to be edited.
 */
function confirmChangeSubtask(entry, id) {
    const arrayelement = allsubtasks.find((element) => element.id === id);
    let input = document.getElementById(`subtask_edition_input_${id}`);
    arrayelement.name = input.value;
    entry.innerHTML = generateSubtaskHtml(input.value, id);
    entry.classList.remove("border-bottom-blue");
}

/**
 * This function clears all the data from the add-task-page and rerenders it.
 */
function clearAddTaskForm() {
    clearInputs();
    clearContainers();
    handleClickPrio();
    allsubtasks = [{ idcounter: 0 }];
    selectedcontacts = [];
    renderAssignedTo();
    currentTask = [];
    clearErrorStyle();
}

/**
 * This function resets the style of the elements that have been highlighted due to html5-form-validation.
 */
function clearErrorStyle() {
    document.querySelectorAll("input").forEach(function (input) {
        input.style.borderColor = "#D1D1D1";
    });
    document.querySelectorAll(".required-field").forEach(function (requiredfield) {
        requiredfield.classList.add("dnone");
    });
}

/**
 * This function empties all the input-fields of the add-task-page.
 */
function clearInputs() {
    let inputs = getAllAddTaskFormInputs();
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (document.getElementById(`${input}`)) document.getElementById(`${input}`).value = "";
    }
    document.getElementById("input_with_button_assigned_to").value = "";
    document.getElementById("input_with_button_subtask").value = "";
}

/**
 * This function deletes the selected contacts and subtasks from the add-task-page.
 */
function clearContainers() {
    ["selected_contacts", "selected_subtasks"].forEach((container) => {
        document.getElementById(container).innerHTML = "";
    });
}

/**
 * This function returns the id's of the input-field of the add-task-page.
 *
 * @param {boolean} withKey - This optional variable defines if the return-array should have a key or not.
 * @returns - The array with all the input-field-id's.
 */
function getAllAddTaskFormInputs(withKey) {
    if (withKey) {
        return { title: "add_task_title_input", description: "add_task_description_textarea", date: "input_with_button_date", category: "input_with_button_category" };
    } else {
        return ["add_task_title_input", "add_task_description_textarea", "input_with_button_date", "input_with_button_category"];
    }
}

/**
 * This function transfers the date from the calendar-date-picker to the date-input-field.
 */
function transferDate() {
    let date = formatDate(document.getElementById("input_calendar").value);
    let result = [day, month, year].join("/");
    document.getElementById("input_with_button_date").value = result;
}

/**
 * This function sets the earliest pickable date to today.
 */
function setMinDate() {
    let date = formatDate();
    let result = [year, month, day].join("-");
    document.getElementById("input_calendar").setAttribute("min", result);
    document.getElementById("input_with_button_date").setAttribute("min", result);
}

/**
 * This function takes the incoming or todays date and makes an writes day, month and year into an array.
 *
 * @param {date} date - This is the incoming date from the calendar-date-picker.
 * @returns - The date as array.
 */
function formatDate(date) {
    !date ? (formatteddate = new Date()) : (formatteddate = new Date(date));
    formatteddate, (month = "" + (formatteddate.getMonth() + 1)), (day = "" + formatteddate.getDate()), (year = formatteddate.getFullYear());
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return { day, month, year };
}

/**
 * This function saves the values from the input-fields as task.
 *
 * @param {} array - This optional variable is the board-section to which the task has to be added.
 */
async function addToTasks(array) {
    addDataToCurrentTask();
    await saveTask(array);
    clearAddTaskForm();
    clearAddTaskArrays();
    await showTaskNotification();
    window.location.assign("./board.html");
}

/**
 * This function saves the new data for the selected task on edit.
 *
 * @param {number} i - This is the index of the task in the board-section.
 * @param {string} key - This optional variable is the board-section to which the task has to be added.
 */
async function applyChangesToTask(i, key) {
    addDataToCurrentTask(i);
    if (currentdraggedarray[i].prio != "urgent" && currentTask.prio === "urgent") users[loaduser].Urgent.push(currentTask);
    if (currentdraggedarray[i].prio === "urgent" && currentTask.prio != "urgent") users[loaduser].Urgent.splice(0, 1);
    await saveEditedTask(i, key);
    clearAddTaskForm();
    clearAddTaskArrays();
}

/**
 * This function adds all data to the currentTask-array.
 *
 * @param {number} i - This is the index of the task in the board-section.
 */
function addDataToCurrentTask(i) {
    addDataFromInputs(i);
    addPrio();
    currentTask.subtasks = allsubtasks;
    currentTask.contacts = selectedcontacts;
}

/**
 * This function empties the temporary global variables.
 */
function clearAddTaskArrays() {
    allsubtasks = [{ idcounter: 0 }];
    selectedcontacts = [];
    currentTask = {};
}

/**
 * This funtions displays a notification when a task was added.
 */
async function showTaskNotification() {
    document.getElementById("task-added-notification").classList.add("notification-display");
    await delay(1000);
}

/**
 * This function adds the data of the input-fields to the currentTask-array.
 *
 * @param {number} i - This is the index of the task in the board-section.
 */
function addDataFromInputs(i) {
    let inputs = getAllAddTaskFormInputs(true);
    Object.entries(inputs).forEach((entry) => {
        let [key, value] = entry;
        if (document.getElementById(`${value}`)) {
            currentTask[`${key}`] = document.getElementById(`${value}`).value;
        }
    });
    if (!currentTask.category) currentTask.category = currentdraggedarray[i].category;
}

/**
 * This function adds the selected priority to the durrentTask-array.
 */
function addPrio() {
    document.getElementsByName("prio").forEach((prio) => {
        prio.checked ? (currentTask["prio"] = prio.value) : "";
    });
}

/**
 * This function saves the new task in the array of the user.
 *
 * @param {string} array - This optional variable is the board-section to which the task has to be added.
 */
function pushTaskToUserArray(array) {
    if (array && array.id === "in_progress_head") {
        users[loaduser].tasksinprogress.push(currentTask);
    } else if (array && array.id === "await_feedback_head") {
        users[loaduser].awaitingfeedback.push(currentTask);
    } else {
        users[loaduser].todo.push(currentTask);
    }
}

/**
 * This function edits the selected task in the array of the user.
 *
 * @param {number} i - This is the index of the task in the board-section.
 * @param {string} key - This optional variable is the board-section to which the task has to be added.
 */
function changeTaskInUserArray(i, key) {
    if (key === "tasksinprogress") {
        users[loaduser].tasksinprogress[i] = currentTask;
    } else if (key === "awaitingfeedback") {
        users[loaduser].awaitingfeedback[i] = currentTask;
    } else if (key === "done") {
        users[loaduser].done[i] = currentTask;
    } else {
        users[loaduser].todo[i] = currentTask;
    }
}

/**
 * This function saves the user-array on the server or in session-storage for the guest-user.
 *
 * @param {string} array - This optional variable is the board-section to which the task has to be added.
 */
async function saveTask(array) {
    pushTaskToUserArray(array);
    currentTask.prio === "urgent" ? users[loaduser].Urgent.push(currentTask) : "";
    sessionStorage.getItem("Guest") === null ? await setItem("users", JSON.stringify(users)) : sessionStorage.setItem("Guest", JSON.stringify(users));
    tasks.push(currentTask);
}

/**
 * This function saves the edited task on the server or in session-storage for the guest-user.
 *
 * @param {number} i - This is the index of the task in the board-section.
 * @param {string} key - This optional variable is the board-section to which the task has to be added.
 */
async function saveEditedTask(i, key) {
    changeTaskInUserArray(i, key);
    sessionStorage.getItem("Guest") === null ? await setItem("users", JSON.stringify(users)) : sessionStorage.setItem("Guest", JSON.stringify(users));
    tasks.push(currentTask);
    closeCard();
}

/**
 * This function adds event-listeners to change the style of the input-fields on invalid.
 */
function addAddTaskEventListeners() {
    document.querySelectorAll("[required]").forEach(function (input) {
        input.addEventListener("invalid", function () {
            input.style.borderColor = "#FF8190";
            document.querySelectorAll(".required-field").forEach(function (requiredfield) {
                requiredfield.classList.remove("dnone");
            });
        });
        input.addEventListener("change", function () {
            input.style.borderColor = "#D1D1D1";
            input.parentElement.nextElementSibling.classList.add("dnone");
        });
    });
}

/**
 * This function sets a timeout for a specific time in milliseconds.
 *
 * @param {*} milliseconds - This is the time in milliseconds.
 * @returns - The timeout.
 */
async function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
