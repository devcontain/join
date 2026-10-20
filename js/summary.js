
/**
 * These functions update the innerHTML of an element (presumably identified by summary_good_morning) to greet the user appropriately based on the current time.
 */

async function guestTime() {
    const guesttime = new Date().getHours();

    if (guesttime >= 18) {
        summary_good_morning.innerHTML = 'Good evening!';
    } else if (guesttime >= 12) {
        summary_good_morning.innerHTML = 'Good afternoon!';
    } else {
        summary_good_morning.innerHTML = 'Good morning!';
    }
}

/**
 * These functions update the innerHTML of an element (presumably identified by summary_good_morning) to greet the user appropriately based on the current time.
 */

async function userTime() {
    const usertime = new Date().getHours();

    if (usertime >= 18) {
        summary_good_morning.innerHTML = 'Good evening,';
    } else if (usertime >= 12) {
        summary_good_morning.innerHTML = 'Good afternoon,';
    } else {
        summary_good_morning.innerHTML = 'Good morning,';
    }
}

/**
 * This function retrieves various DOM elements related to task summaries and passes them to another function to update their contents.
 * 
 */

async function loadSummaryProject() {
    let todo = document.getElementById('summary_to_do');
    let done = document.getElementById('summary_done');
    let urgent = document.getElementById('summary_urgent');
    let deadline = document.getElementById('summary_deadline');
    let inprogress = document.getElementById('summary_progress');
    let awaitfeedback = document.getElementById('summary_feedback');
    let inboard = document.getElementById('summary_in_board')
    let name = document.getElementById('sommary_name');
    loadSummaryInnerhtml(inboard, todo, done, urgent, deadline, inprogress, awaitfeedback, name)
}

/**
 * Updates the inner HTML of elements related to task summaries using data from a user object.
 * @param {Array} inboard - A DOM element that is likely used to display the total count of all tasks associated with a user.
 * @param {Array} todo - A DOM element used to display the number of tasks that are currently marked as 'todo'.
 * @param {Array} done - A DOM element intended to show the number of tasks that have been completed by the user.
 * @param {Array} urgent - A DOM element that displays the count of tasks labeled as 'urgent'.
 * @param {Array} deadline - This element is used to display information about the nearest upcoming deadline among the tasks.
 * @param {Array} inprogress - A DOM element where the number of tasks currently in progress is shown.
 * @param {Array} awaitfeedback - This element is used to show how many tasks are awaiting feedback.
 * @param {Array} name - A DOM element that displays the name of the user.
 */

async function loadSummaryInnerhtml(inboard, todo, done, urgent, deadline, inprogress, awaitfeedback, name) {
    todo.innerHTML = users[loaduser].todo.length
    done.innerHTML = users[loaduser].done.length
    urgent.innerHTML = users[loaduser].Urgent.length
    inboard.innerHTML = users[loaduser].todo.length + users[loaduser].done.length + users[loaduser].tasksinprogress.length + users[loaduser].awaitingfeedback.length
    inprogress.innerHTML = users[loaduser].tasksinprogress.length
    awaitfeedback.innerHTML = users[loaduser].awaitingfeedback.length
    name.innerHTML = users[loaduser].name
    summaryDeadline(deadline)
}

/**
 * Displays the nearest deadline from a user's tasks.
 * 
 */

function summaryDeadline(deadline) {
    if (users[loaduser].todo.length === 0) {
        deadline.innerHTML = ''
        summary_deadline_string.innerHTML = 'No Upcoming Deadline'
    }
    else {
        let date = users[loaduser].todo.map(urgent => urgent.date)
        let minDate = new Date(Math.min.apply(null, date.map(date => new Date(formatDate(date)))));
        deadline.innerHTML = formatOutputDate(minDate)
    }
}

/**
 * Convert and format date strings for internal use and display.
 * @param {string} date - The date parameter here is expected to be a string representing a date in the format DD/MM/YYYY.
 */

function formatDate(date) {
    let [day, month, year] = date.split('/');
    return `${month}/${day}/${year}`;
}

/**
 * Manages a welcome animation that only plays once per session.
 * @param {string} date -  the date parameter is expected to be a JavaScript Date object. This function's role is to format this Date object into a more human-readable string format.
 */

function formatOutputDate(date) {
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * show the welcome animation just one time
 */

document.addEventListener("DOMContentLoaded", function () {
    let alreadyPlayed = sessionStorage.getItem("handyWelcomePlayed");
    let summaryWelcome = document.querySelector('.summary-welcome');

    if (!alreadyPlayed) {
        summaryWelcome.classList.add('animateOnce');
        summaryWelcome.addEventListener('animationend', function () {
            sessionStorage.setItem("handyWelcomePlayed", true);
        }, { once: true });
    } else {
        summaryWelcome.style.display = 'none';
    }
});