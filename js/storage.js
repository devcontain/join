const DATA_API_URL = "https://join.devcontain.de/api/data.php";
const USER_API_URL = "https://join.devcontain.de/api/me.php";

const INDEX_URL = "index.html";

async function setItem(key, value) {
    if (key !== "users") {
        throw new Error("Unsupported storage key");
    }

    const data = JSON.parse(value)[0];
    const projectData = { ...data };
    delete projectData.name;
    delete projectData.email;
    delete projectData.password;

    const response = await fetch(DATA_API_URL, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
    });

    if (!response.ok) {
        throw new Error(`Saving failed: ${response.status}`);
    }

    return response.json();
}

async function getItem(key) {
    if (key !== "users") {
        throw new Error("Unsupported storage key");
    }

    const response = await fetch(DATA_API_URL, {
        credentials: "same-origin"
    });

    if (!response.ok) {
        throw new Error(`Loading failed: ${response.status}`);
    }

    const data = await response.json();
    return [data];
}

async function loadStorage() {
    if (sessionStorage.getItem("Guest") === null) {
        try {
            await loadProjectData();
        } catch (error) {
            console.error("Loading user failed:", error);
            window.location.replace(INDEX_URL);
            return;
        }
    } else {
        loaduser = 0;
        users = JSON.parse(sessionStorage.getItem("Guest"));
    }

    await initPage();

    if (sessionStorage.getItem("Guest")) {
        await includeHTML();
    }

    menuLoginName();
}

async function loadProjectData() {
    users = await getItem("users");
    loaduser = 0;

    const response = await fetch(USER_API_URL, {
        credentials: "same-origin"
    });

    if (!response.ok) {
        throw new Error(`User loading failed: ${response.status}`);
    }

    const user = await response.json();
    users[0].name = user.name;
}

/**
 * Loads different parts of the application based on available global functions and session state.
 */
async function initPage() {
    if (window.initSummary) {
        initSummary();
        updateGreeting();
    }

    if (typeof window.initBoard === "function") {
        initBoard();
    }

    if (document.getElementById("add_task_page") && typeof window.fillAddTaskSection === "function") {
        window.fillAddTaskSection();
    }

    if (window.initContacts) {
        await initContactsPage();
    }
}

/**
 * Determines how to load contact information based on the presence of guest data in session storage.
 */
async function initContactsPage() {
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
function updateGreeting() {
    if (sessionStorage.getItem("Guest") === null) {
        userTime();
    } else {
        guestTime();
        summary_name.textContent = "";
    }
}