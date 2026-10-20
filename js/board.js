let searchresults = [];
let currenttask = 0;
let currentdragged;
let currentdraggedarray;
let task;
/**
 * start functions onload, render tasks, empty fields informations and empty Box hover
 */
function boardinit() {
    renderTasks();
    showEmptyHtmlTodo();
    showEmptyHtmlInprogress();
    showEmptyHtmlAwaitfeedback();
    showEmptyHtmlDone();
    emptyBoxHtml();
}

/**
 * start function creat hover Box, return to function and set const
 * iterate through the IDs for the html places
 * get ID and place HTML
 */
function emptyBoxHtml() {
    const empty = hoverHtml();
    ["to_do_place", "in_progress_place", "await_feedback_place", "done_place"].forEach((container) => {
        document.getElementById(container).innerHTML += empty;
    });
}

/**
 * if no elements of an array are present, the empty task field is created and placed using the ID
 * @param {element} elementId - element ID from html
 * @param {array} userProperty - one of four arrays
 * @param {element} emptyTaskFunction - one of four html elements
 */
function updateEmptyHtml(elementId, userProperty, emptyTaskFunction) {
    if (users[loaduser][userProperty] == 0) {
        const empty = emptyTaskFunction();
        document.getElementById(elementId).innerHTML = empty;
    }
}

/**
 * get the id, array and html element for todo
 */
function showEmptyHtmlTodo() {
    updateEmptyHtml("to_do_place", "todo", emptyTaskFieldTodo);
}

/**
 * get the id, array and html element for tasksinprogress
 */
function showEmptyHtmlInprogress() {
    updateEmptyHtml("in_progress_place", "tasksinprogress", emptyTaskFieldInprogress);
}

/**
 * get the id, array and html element for awaitingfeedback
 */
function showEmptyHtmlAwaitfeedback() {
    updateEmptyHtml("await_feedback_place", "awaitingfeedback", emptyTaskFieldAwaitfeedback);
}

/**
 * get the id, array and html element for done
 */
function showEmptyHtmlDone() {
    updateEmptyHtml("done_place", "done", emptyTaskFieldDone);
}

/**
 * get the ID for close the screen with the class
 * clear the seleted contact array
 * start init function, to refresh the page
 */
function closeCard() {
    document.getElementById("fullscreen_information").classList.add("d-none");
    selectedcontacts = [];
    boardinit();
}

/**
 * open the generated HTML, to add an task
 * @param {string} array - defines the space for the created task
 */
function bordAddNewTask(array) {
    const card = bordAddTaskFieldHtml();
    let getplacecard = document.getElementById("add_bordtask_data");
    document.getElementById("fullscreen_information").classList.remove("d-none");
    getplacecard.innerHTML = card;
    fillAddTaskSection(array);
}

/**
 * uses if-else statements to determine the parent container's ID and
 * triggers specific actions accordingly,
 * such as dragging tasks and opening tasks with specific statuses
 * @param {number} id - identifer for one of four arrays
 * @param {object} element - HTML element triggered that event
 */
function openBordTask(id, element) {
    element.parentElement && element.parentElement.id === "to_do_place" ? (dragTodo(id), openTask(id, "todo")) : element.parentElement && element.parentElement.id === "in_progress_place" ? (dragInProgress(id), openTask(id, "tasksinprogress")) : element.parentElement && element.parentElement.id === "await_feedback_place" ? (dragAwaitFeedback(id), openTask(id, "awaitingfeedback")) : element.parentElement && element.parentElement.id === "done_place" && (dragDone(id), openTask(id, "done"));
}

/**
 * populates a task card with data based on the provided index and task type and
 * get all task informations
 * @param {number} i - identifer for one of four arrays
 * @param {type} key - one of four array
 */
function openTask(i, key) {
    let getplacecard = document.getElementById("add_bordtask_data");
    document.getElementById("fullscreen_information").classList.remove("d-none");
    const selectarray = currentdraggedarray[i];
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo, datetodo } = informationTodo(selectarray);
    const choosencategory = selectCategory(categorytodo);
    const choosensubtasks = selectSubtasks(subtaskstodo);
    const getsubtaskhtml = selectSubtaskHtml(choosensubtasks, selectarray);
    const choosenpriority = selectPriorityOpenTask(priotodo);
    const selectcontacts = selectContactsOpenTask(contactstodo);
    getplacecard.innerHTML = fullTaskHtml(choosencategory, titletodo, descriptiontodo, i, choosenpriority, datetodo, getsubtaskhtml, selectcontacts, key);
}

/**
 * updates a task card with data based on the provided index and task type and
 * fetches task information
 * updates the HTML of the task card
 * initializes task addition, edits contacts, and subtasks
 * @param {number} i - identifer for one of four arrays
 * @param {type} key - one of four array
 */
function editSingleTask(i, key) {
    let getplacetaskvariantbord = document.getElementById("add_bordtask_data");
    const selectarray = currentdraggedarray[i];
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo, datetodo } = informationTodo(selectarray);
    categorytodo;
    const choosenpriority = selectPriority(priotodo);
    getplacetaskvariantbord.innerHTML = editTaskHtml(titletodo, descriptiontodo, i, choosenpriority, datetodo, key);
    initAddTask(i, priotodo);
    editContactsFactory(contactstodo);
    editSubtaskFactory(subtaskstodo);
}

/**
 * refreshes task sections with user data
 * clears each section, fetches tasks based on section ID from user data
 * displays task HTML in each section
 */
function renderTasks() {
    const taskSections = ["to_do_place", "in_progress_place", "await_feedback_place", "done_place"];
    taskSections.forEach((sectionId) => {
        let sectionElement = document.getElementById(sectionId);
        sectionElement.innerHTML = ``;
        let tasks = sectionId === "to_do_place" ? users[loaduser]["todo"] : sectionId === "in_progress_place" ? users[loaduser]["tasksinprogress"] : sectionId === "await_feedback_place" ? users[loaduser]["awaitingfeedback"] : sectionId === "done_place" ? users[loaduser]["done"] : [];
        tasks.forEach((task, index) => {
            showTaskHtml(task, index, sectionId);
        });
    });
}

/**
 * retrieves the HTML element
 * extracts specific details from the object using helper function
 * generates HTML content for the task using the extracted information
 * create the HTML
 * @param {object} task - containing information about the task
 * @param {number} index - identifer for one of four arrays
 * @param {string} sectionId - representing one of four possible IDs for sections
 */
function showTaskHtml(task, index, sectionId) {
    let sectionElement = document.getElementById(sectionId);
    const { categorytodo, titletodo, descriptiontodo, subtaskstodo, contactstodo, priotodo } = informationTodo(task);
    const { choosencategory, choosenpriority, selectedCheckboxCount, barupdated, choosensubs, selectcontacts } = informationsFactory(categorytodo, priotodo, subtaskstodo, contactstodo);
    sectionElement.innerHTML += todoTaskHtml(choosencategory, titletodo, descriptiontodo, index, barupdated, selectcontacts, choosenpriority, choosensubs, selectedCheckboxCount, sectionId);
}

/**
 * extracts properties from a object
 * returns them in a new object with renamed keys
 * @param {object} task - containing information about the task
 * @returns - as an object
 */
function informationTodo(task) {
    let { category, title, description, subtasks, contacts, prio, date } = task;
    return { categorytodo: category, titletodo: title, descriptiontodo: description, subtaskstodo: subtasks, contactstodo: contacts, priotodo: prio, datetodo: date };
}

/**
 * helper functions to process each array and generate specific informations
 * returns an object containing the processed information
 * @param {array} category - representing task categories
 * @param {array} priority - representing task priorities
 * @param {array} subtasks - representing subtasks of a task
 * @param {array} contacts - representing contacts related to the task
 * @returns - as an object
 */
function informationsFactory(category, priority, subtasks, contacts) {
    const choosencategory = selectCategory(category);
    const choosenpriority = selectPriority(priority);
    const selectedCheckboxCount = countSelectedCheckboxes(subtasks);
    const barupdated = updateProgressBar(subtasks, selectedCheckboxCount);
    const choosensubs = choosenSubtasks(subtasks, selectedCheckboxCount);
    const selectcontacts = selectContacts(contacts);
    return { choosencategory, choosenpriority, selectedCheckboxCount, barupdated, choosensubs, selectcontacts };
}

/**
 * choose the right category
 * @param {array} category - representing task categories and returns HTML content
 * @returns - that in an paramter
 */
function selectCategory(category) {
    return category == "Technical Task" ? technicalTaskHtml() : userTaskHtml();
}

/**
 * creates HTML for displaying contacts and return styled HTML
 * iterates through the array of contacts, generates a profile badge for each,
 * only contacts with a non-empty first name are processed
 * @param {array} contactstodo - representing task contacts  
 * @returns - returns HTML content
 */
function selectContacts(contactstodo) {
    let contacthtml = "";
    for (let s = 0; s < contactstodo.length; s++) {
        const contact = contactstodo[s];
        if (!contact.firstname) continue;
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        contacthtml += `
            <div class="contact-name-place">
                <span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>
            </div>`;
    }
    return contacthtml;
}

/**
 * creates HTML for displaying contacts and return styled HTML with names
 * iterates through the array of contacts, generates a profile badge for each,
 * only contacts with a non-empty first name are processed
 * @param {array} contactstodo - representing task contacts and returns HTML content
 * @returns - that in an html
 */
function selectContactsOpenTask(contactstodo) {
    let contacthtml = "";
    for (let s = 0; s < contactstodo.length; s++) {
        const contact = contactstodo[s];
        if (!contact.firstname) continue;
        const selectfirstnamecon = contact["firstname"];
        const selectlastnamecon = contact["lastname"];
        const abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
        contacthtml += `
            <div class="contact-name-place">
                <span class="profile-badge" style="background-color: ${contact.color};">${abbreviation}</span>
                <span>${selectfirstnamecon}&nbsp;${selectlastnamecon}</span>
            </div>`;
    }
    return contacthtml;
}

/**
 * returns HTML content based on the priority of a task, utilizing different functions for each priority level
 * @param {array} priority - representing task priorities
 * @returns - that in an paramter  
 */
function selectPriority(priority) {
    return priority === "urgent" ? urgentPrioHtml() : priority === "low" ? lowPrioHtml() : priority === "medium" ? mediumPrioHtml() : mediumPrioHtml();
}

/**
 * returns HTML content based on the priority of a task, utilizing different functions for each priority level with there names
 * @param {array} priority - representing task priorities
 * @returns - that in an paramter 
 */
function selectPriorityOpenTask(priority) {
    return priority === "urgent" ? urgentPrioHtmlOpenTask() : priority === "low" ? lowPrioHtmlOpenTask() : priority === "medium" ? mediumPrioHtmlOpenTask() : mediumPrioHtmlOpenTask();
}

/**
 * displays task categories in a larger format,
 * utilizing different HTML generation functions for technical tasks and user tasks
 * @param {array} category - representing the task category
 */
function showTaskCategoryBig(category) {
    const html = category === "Technical Task" ? technicalTaskHtml() : userTaskHtml();
    document.getElementById("task_variant_bord").innerHTML = html;
}

/**
 * allow an item to drop of, when is dragged over
 * @param {object} ev - ensures proper drop handling by disabling default drag behavior
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * determines the parent element's ID of the dragged item and
 * triggers a corresponding drag function based on that ID
 * if a matching function is found, it calls it with the ID
 * @param {number} id - identifer for one of four arrays
 * @param {object} element - HTML element triggered that event
 */
function drag(id, element) {
    const parentElementId = element.parentElement ? element.parentElement.id : null;
    const dragFunctions = {
        to_do_place: dragTodo,
        in_progress_place: dragInProgress,
        await_feedback_place: dragAwaitFeedback,
        done_place: dragDone,
    };
    const dragFunction = dragFunctions[parentElementId];
    dragFunction ? dragFunction(id) : null;
}

/**
 * generates HTML informations for a progress bar based on the length of an array subtask and
 * and a count of selected checkboxes
 * if there's only one subtask or none, it returns an empty value
 * otherwise, it creates and returns HTML informations for the progress bar
 * @param {array} subtasks - returns either an empty value or HTML informations for a progress bar
 * @param {number} selectedCheckboxCount - number of selected checkbox
 * @returns - that as an emptys field or checked subs
 */
function choosenSubtasks(subtasks, selectedCheckboxCount) {
    let subtasklength = subtasks.length;
    if (subtasklength <= 1) {
        let nullsubs = empty();
        return nullsubs;
    } else {
        let checksubs = subtaskProgressbarHtml(subtasklength - 1, selectedCheckboxCount);
        return checksubs;
    }
}

/**
 * returning either an empty value or HTML for the progress bar based on completion percentage
 * @param {array} subtasks - returns either an empty value or the HTML for the progress bar
 * @param {number} selectedCheckboxCount - number of selected checkbox
 * @returns - that as an emptys field or checked subs
 */
function updateProgressBar(subtasks, selectedCheckboxCount) {
    let percent = selectedCheckboxCount === 1 ? 0 : Math.round((selectedCheckboxCount / subtasks.length) * 100);
    if (subtasks.length <= 1) {
        let nullsubs = empty();
        return nullsubs;
    } else {
        let checksubs = createProgressBar(percent);
        return checksubs;
    }
}

/**
 * iterates over the array, extracting the "name" property from each subtask object and storing it in a new array
 * @param {array} subtaskstodo - representing the task subtasks
 * @returns - that as an list 
 */
function selectSubtasks(subtaskstodo) {
    let iteratedList = [];
    for (let st = 1; st < subtaskstodo.length; st++) {
        let sublistplace = subtaskstodo[st];
        let list = sublistplace["name"];
        iteratedList.push(list);
    }
    return iteratedList;
}

/**
 * asynchronously updates the checkbox status and
 * create the input style as image
 * @param {number} index - identifer for one of four arrays
 * @param {boolean} isChecked - true or false from the checked input
 */
async function updateSelectedCheckboxes(index, isChecked) {
    task["subtasks"][index]["isChecked"] = isChecked;
    await saveToServer();

    const imgElement = document.getElementById(`subtask${index}`);
    if (isChecked == true) {
        imgElement.src = "./assets/img/bord_check.png";
    } else {
        imgElement.src = "./assets/img/bord_uncheck.png";
    }
}

/**
 * iterates through the array, incrementing the count when a checkbox is checked, and returns the total count
 * @param {array} subtaskstodo - representing the task subtasks
 * @returns - that at a count
 */
function countSelectedCheckboxes(subtaskstodo) {
    let count = 1;
    for (let checkindex = 0; checkindex < subtaskstodo.length; checkindex++) {
        const check = subtaskstodo[checkindex]["isChecked"];
        check == true ? count++ : "";
    }
    return count;
}

/**
 * generates HTML for each subtask based on two arrays, sublist and selectarray
 * determines the checkbox status and image source for each subtask and returns the HTML
 * updates the task object before returning the HTML
 * @param {array} sublist - representing the task subtasks
 * @param {array} selectarray - representing the task subtasks from the selected array
 * @returns - that as an html 
 */
function selectSubtaskHtml(sublist, selectarray) {
    let html = "";
    for (let i = 0; i < sublist.length; i++) {
        const subtask = sublist[i];
        const isChecked = selectarray["subtasks"][i]["isChecked"] ? "checked" : "";
        const imgSrc = selectarray["subtasks"][i]["isChecked"] ? "./assets/img/bord_check.png" : "./assets/img/bord_uncheck.png";
        html += generateSubsHtml(i, isChecked, subtask, imgSrc);
    }
    task = selectarray;
    return html;
}

/**
 * sets the global currentdragged variable to the provided id
 * assigns the corresponding todo array from the users object to global currentdraggedarray
 * @param {number} id - identifer for one of four arrays
 */
function dragTodo(id) {
    currentdragged = id;
    currentdraggedarray = users[loaduser]["todo"];
}

/**
 * sets the global currentdragged variable to the provided id
 * assigns the corresponding tasksinprogress array from the users object to global currentdraggedarray
 * @param {number} id - identifer for one of four arrays
 */
function dragInProgress(id) {
    currentdragged = id;
    currentdraggedarray = users[loaduser]["tasksinprogress"];
}

/**
 * sets the global currentdragged variable to the provided id
 * assigns the corresponding awaitingfeedback array from the users object to global currentdraggedarray
 * @param {number} id - identifer for one of four arrays
 */
function dragAwaitFeedback(id) {
    currentdragged = id;
    currentdraggedarray = users[loaduser]["awaitingfeedback"];
}

/**
 * sets the global currentdragged variable to the provided id
 * assigns the corresponding done array from the users object to global currentdraggedarray
 * @param {number} id - identifer for one of four arrays
 */
function dragDone(id) {
    currentdragged = id;
    currentdraggedarray = users[loaduser]["done"];
}

/**
 * ensures proper drop handling by preventing the default drag behavior
 * updates the selected droparray by pushing the item from the currentdraggedarray,
 * then removes the item from currentdraggedarray
 * initializes the board and saves the changes to the server
 * @param {object} ev - ensures proper drop handling by disabling default drag behavior
 * @param {array} droparray - the choosen array
 */
async function dropOn(ev, droparray) {
    ev.preventDefault();
    let select = users[loaduser];
    select[droparray].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
}

/**
 * revents the propagation of the event to parent elements
 * @param {object} event - captures the click action
 */
function noCloseContent(event) {
    event.stopPropagation();
}

/**
 * returns an object with references to HTML elements identified by their IDs
 * @returns - that in an object
 */
function searchTaskPlace() {
    return {
        todoplace: document.getElementById(`to_do_place`),
        inprogressplace: document.getElementById(`in_progress_place`),
        awaitfeedbackplace: document.getElementById(`await_feedback_place`),
        doneplace: document.getElementById(`done_place`),
    };
}

/**
 * retrieves the value from the search input element,
 * trims whitespace, converts it to lowercase, and
 * returns an object with the search string and its length
 * @returns - that in an object
 */
function getSearchInput() {
    const search = document.getElementById("search_input").value.trim().toLowerCase();
    return { search, searchlength: search.length };
}

/**
 * ilters and renders results based on the search query if the query length is at least one character
 * otherwise, it initializes the board
 */
function searchTitleStart() {
    const { search, searchlength } = getSearchInput();
    const { todoplace, inprogressplace, awaitfeedbackplace, doneplace } = searchTaskPlace();
    searchlength >= 1 ? renderResults(filterResults(search), todoplace, inprogressplace, awaitfeedbackplace, doneplace) : boardinit();
}

/**
 * sorts tasks based on input, returning filtered results
 * @param {object} search - refers to the keyword
 * @returns - all as the parameter
 */
function filterResults(search) {
    return {
        resultstodo: filterArray(users[loaduser]["todo"], search),
        resultsinprogress: filterArray(users[loaduser]["tasksinprogress"], search),
        resultsawaitfeedback: filterArray(users[loaduser]["awaitingfeedback"], search),
        resultsdone: filterArray(users[loaduser]["done"], search),
    };
}

/**
 * filters an array based on a search term found in each item's title
 * @param {arry} array - representing one of four arrays
 * @param {object} search - refers to the keyword
 * @returns - statement filters the array by checking if each item's title includes the search term, returning only matching items
 */
function filterArray(array, search) {
    return array.filter((item) => item.title.toLowerCase().includes(search));
}

/**
 * places filtered task results into their corresponding bord categories
 * @param {object} filteredResults - filtered task results
 * @param {string} todoplace - placement for tasks to do
 * @param {string} inprogressplace - placement for tasks in progress
 * @param {string} awaitfeedbackplace - placement for tasks awaiting feedback
 * @param {string} doneplace - placement for completed tasks
 */
function renderResults(filteredResults, todoplace, inprogressplace, awaitfeedbackplace, doneplace) {
    renderResultsCategory(filteredResults.resultstodo, todoplace);
    renderResultsCategory(filteredResults.resultsinprogress, inprogressplace);
    renderResultsCategory(filteredResults.resultsawaitfeedback, awaitfeedbackplace);
    renderResultsCategory(filteredResults.resultsdone, doneplace);
}

/**
 * updates a webpage element with either filtered task results or a message if no results are found
 * @param {*} results - filtered task results
 * @param {*} place - placement for tasks
 */
function renderResultsCategory(results, place) {
    place.innerHTML = "";
    results.length <= 0 ? (place.innerHTML = nothingFound()) : results.forEach((item, index) => showHtml(item, place, index));
}

/**
 * places filtered task items in their designated locations
 * @param {object} item - filtered itmes
 * @param {string} place - placement for tasks
 * @param {number} index - identifer for one of four arrays
 */
function showHtml(item, place, index) {
    place.id === "to_do_place" && showTaskHtml(item, index, "to_do_place");
    place.id === "in_progress_place" && showTaskHtml(item, index, "in_progress_place");
    place.id === "await_feedback_place" && showTaskHtml(item, index, "await_feedback_place");
    place.id === "done_place" && showTaskHtml(item, index, "done_place");
}

/**
 * removes a task from the current array
 * @param {number} i - identifer for one of four arrays
 */
async function deleteSingleTask(i) {
    if (currentdraggedarray[i].prio === "urgent") users[loaduser].Urgent.splice(0, 1);
    currentdraggedarray.splice(i, 1);
    boardinit();
    closeCard();
    await saveToServer();
}

/**
 * stores user data, if the user is not a guest,
 * otherwise, it stores the data as a session storage item for the user
 */
async function saveToServer() {
    sessionStorage.getItem("Guest") === null ? await setItem("users", JSON.stringify(users)) : sessionStorage.setItem("Guest", JSON.stringify(users));
}

/**
 * iterates through an array of contacts, selects each contact by its ID
 * @param {array} selectcontacts - representing the array contacts
 */
function editContactsFactory(selectcontacts) {
    for (let j = 0; j < selectcontacts.length; j++) {
        const selected = selectcontacts[j];
        const idselected = selected["id"];
        selectContactById(idselected);
    }
}

/**
 * iterates through an array of subtasks
 * if a subtask has a name, it adds the subtasks
 * @param {array} subtaskstodo - representing the array subtasks
 */
function editSubtaskFactory(subtaskstodo) {
    for (let h = 0; h < subtaskstodo.length; h++) {
        const selected = subtaskstodo[h];
        if (selected.name) addSubtask(0, selected);
    }
}

/**
 * identifies the parent ID of an HTML element and initiates task dragging accordingly
 * opening the move task menu
 * @param {number} i - identifer for one of four arrays
 * @param {element} ele - html element
 */
function openMoveMenue(i, ele) {
    const parentId = ele.parentElement.parentElement.parentElement.id;
    parentId === "to_do_place" ? (dragTodo(i), openMoveTaskMenu("todo")) : parentId === "in_progress_place" ? (dragInProgress(i), openMoveTaskMenu("tasksinprogress")) : parentId === "await_feedback_place" ? (dragAwaitFeedback(i), openMoveTaskMenu("awaitingfeedback")) : parentId === "done_place" && (dragDone(i), openMoveTaskMenu("done"));
}

/**
 * function displays the move task menu based on the selected array and
 * highlights the corresponding option
 * @param {object} movekey - the selected array
 */
function openMoveTaskMenu(movekey) {
    let getplacecard = document.getElementById("add_bordtask_data");
    document.getElementById("fullscreen_information").classList.remove("d-none");
    getplacecard.innerHTML = moveTaskMenue(movekey);
    movekey === "todo" ? document.getElementById("light_todo").classList.add("highlight-color") : movekey === "tasksinprogress" ? document.getElementById("light_inprogress").classList.add("highlight-color") : movekey === "awaitingfeedback" ? document.getElementById("light_awaitfeedback").classList.add("highlight-color") : movekey === "done" && document.getElementById("light_done").classList.add("highlight-color");
}

/**
 * moves a task from the current dragged array to the specified category array,
 * updates the board, saves to the server, and hides the fullscreen information
 * @param {array} category - representing the array category
 */
async function moveTask(category) {
    let select = users[loaduser];
    select[category].push(currentdraggedarray[currentdragged]);
    currentdraggedarray.splice(currentdragged, 1);
    boardinit();
    await saveToServer();
    document.getElementById("fullscreen_information").classList.add("d-none");
}
