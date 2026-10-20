/**
 * A predefined token used to authenticate requests to a storage service.
 */

const STORAGE_TOKEN = "GGZFU08ASMNAH3MBMGAP9RUCKGE5H1V5Z9CP0MF1";

/**
 * The base URL for the storage API.
 */

const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Stores data in the remote storage using a POST request.
 * @param {string} key - The key under which the value should be stored.
 * @param {any} value - The data to store.
 * @returns - A promise that resolves with the JSON response from the storage API.
 */

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

/**
 * Retrieves data from the remote storage using a GET request.

 * @param {string} key -The key of the data to retrieve.
 * @returns - A promise that resolves to the parsed value stored under the specified key.
 */

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then((res) => res.json())
        .then((res) => res.data.value)
        .then((value) => JSON.parse(value));
}

/**
 * Loads the storage data and initializes the user interface based on session status. Uses session storage to determine if guest data is available. If no guest data, it loads all required data from local or session storage.
 */

async function loadStorage() {
    if (sessionStorage.getItem("Guest") === null) {
        await loadAllIfElseLocalOrSession();
    } else {
        loaduser = sessionStorage.getItem("userI");
        users = JSON.parse(sessionStorage.getItem("Guest"));
    }
    loadAllIfElse();
    if (sessionStorage.getItem("Guest")) {
        await includeHTML();
    }
    menuLoginName();
}

/**
 * Determines whether to load data from local storage or session storage. Checks the session storage for a user indicator and loads user data accordingly. Calls ifLocalStorageExist() or ifSessionStorageExist() based on where the user data was found.
 */

async function loadAllIfElseLocalOrSession() {
    if (sessionStorage.getItem("userI") === null) {
        users = await getItem("users");
        loaduser = localStorage.getItem("userI");
        ifLocalStorageExist();
    } else {
        users = await getItem("users");
        loaduser = sessionStorage.getItem("userI");
        ifSessionStorageExist;
    }
}

/**
 * Redirects to the start page if no user data is found in local storage.
 */

async function ifLocalStorageExist() {
    if (localStorage.getItem("userI") === null) {
        window.location.assign("index.html");
    }
}

/**
 * Redirects to the start page if no user data is found in session storage.
 */

async function ifSessionStorageExist() {
    if (sessionStorage.getItem("userI") === null) {
        window.location.assign("index.html");
    }
}

/**
 * Loads different parts of the application based on available global functions and session state.
 */

async function loadAllIfElse() {
    if (window.loadSummaryProject) {
        loadSummaryProject();
        timeIfElse();
    }
    if (window.boardinit) {
        boardinit();
    }
    if (window.fillAddTaskSectionload && window.boardinit == null) {
        fillAddTaskSection();
    }
    if (window.initContacts) {
        contactsIfElse();
    }
}

/**
 * Determines how to load contact information based on the presence of guest data in session storage.
 */

async function contactsIfElse() {
    if (sessionStorage.getItem("Guest") === null) {
        await initContacts();
    } else {
        renderContacts();
    }
}

/**
 * Handles time-related information based on user session.
 * Calls userTime() for logged-in users or guestTime() for guests.
 * Clears the summary name if guest data is present.
 */

async function timeIfElse() {
    if (sessionStorage.getItem("Guest") === null) {
        userTime();
    } else {
        guestTime();
        sommary_name.innerHTML = "";
    }
}