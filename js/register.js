const ME_URL = "https://join.devcontain.de/api/me.php";
const REGISTER_URL = "https://join.devcontain.de/api/register.php";
const LOGIN_API_URL = "https://join.devcontain.de/api/login.php";

const SUMMARY_URL = "summary.html";

const LOCK_IMG = "assets/img/register_lock.png";
const VISIBILITY_OFF_IMG = "assets/img/visibility_off.png";
const VISIBILITY_ON_IMG = "assets/img/visibility.png";

let users = [];
let loaduser = 0;

let todo = [
    {
        title: "Implement User Authentication",
        description: "Integrate secure login, session handling and access control for registered users.",
        date: "30/10/2026",
        category: "Technical Task",
        prio: "urgent",
        subtasks: [
            { idcounter: 3 },
            { id: 1, name: "Implement login endpoint", isChecked: true },
            { id: 2, name: "Validate user sessions", isChecked: false },
            { id: 3, name: "Test access restrictions", isChecked: false }
        ],
        contacts: [
            { idcounter: 1 },
            {
                id: 1,
                firstname: "Sofia",
                lastname: "Müller",
                email: "sofia@example.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8"
            }
        ]
    },
    {
        title: "Improve Mobile Navigation",
        description: "Optimize navigation and interactive elements for smartphones and tablets.",
        date: "04/11/2026",
        category: "User Story",
        prio: "medium",
        subtasks: [
            { idcounter: 3 },
            { id: 1, name: "Review responsive breakpoints", isChecked: true },
            { id: 2, name: "Improve mobile menu", isChecked: false },
            { id: 3, name: "Test different screen sizes", isChecked: false }
        ],
        contacts: [
            { idcounter: 2 },
            {
                id: 2,
                firstname: "Anton",
                lastname: "Mayer",
                email: "anton@example.com",
                phone: "+49 1111 111 11 1",
                color: "#FF7A00"
            }
        ]
    },
    {
        title: "Write API Documentation",
        description: "Document available API endpoints, request parameters and response formats.",
        date: "06/11/2026",
        category: "Technical Task",
        prio: "low",
        subtasks: [
            { idcounter: 2 },
            { id: 1, name: "Document authentication endpoints", isChecked: false },
            { id: 2, name: "Add example API responses", isChecked: false }
        ],
        contacts: [
            { idcounter: 3 },
            {
                id: 3,
                firstname: "Anja",
                lastname: "Schulz",
                email: "anja@example.com",
                phone: "+49 1111 111 11 1",
                color: "#9327FF"
            }
        ]
    }
];

let tasksinprogress = [
    {
        title: "Develop Dashboard Components",
        description: "Build reusable dashboard components with dynamic task statistics.",
        date: "29/10/2026",
        category: "Technical Task",
        prio: "medium",
        subtasks: [
            { idcounter: 3 },
            { id: 1, name: "Create dashboard layout", isChecked: true },
            { id: 2, name: "Integrate task statistics", isChecked: true },
            { id: 3, name: "Optimize component rendering", isChecked: false }
        ],
        contacts: [
            { idcounter: 4 },
            {
                id: 4,
                firstname: "Benedikt",
                lastname: "Ziegler",
                email: "benedikt@example.com",
                phone: "+49 1111 111 11 1",
                color: "#6E52FF"
            }
        ]
    },
    {
        title: "Implement Data Validation",
        description: "Add client-side and server-side validation for form submissions.",
        date: "28/10/2026",
        category: "Technical Task",
        prio: "urgent",
        subtasks: [
            { idcounter: 3 },
            { id: 1, name: "Define validation rules", isChecked: true },
            { id: 2, name: "Implement error messages", isChecked: false },
            { id: 3, name: "Test invalid input scenarios", isChecked: false }
        ],
        contacts: [
            { idcounter: 5 },
            {
                id: 5,
                firstname: "David",
                lastname: "Eisenberg",
                email: "david@example.com",
                phone: "+49 1111 111 11 1",
                color: "#FC71FF"
            }
        ]
    }
];

let awaitingfeedback = [
    {
        title: "Review Landing Page Design",
        description: "Review visual consistency, typography, spacing and accessibility.",
        date: "26/10/2026",
        category: "User Story",
        prio: "low",
        subtasks: [
            { idcounter: 2 },
            { id: 1, name: "Complete desktop design", isChecked: true },
            { id: 2, name: "Collect stakeholder feedback", isChecked: false }
        ],
        contacts: [
            { idcounter: 6 },
            {
                id: 6,
                firstname: "Eva",
                lastname: "Fischer",
                email: "eva@example.com",
                phone: "+49 1111 111 11 1",
                color: "#FFBB2B"
            }
        ]
    },
    {
        title: "Test Login and Logout Flow",
        description: "Verify successful authentication, logout behavior and session expiration.",
        date: "27/10/2026",
        category: "Technical Task",
        prio: "medium",
        subtasks: [
            { idcounter: 2 },
            { id: 1, name: "Complete functional testing", isChecked: true },
            { id: 2, name: "Review QA test results", isChecked: false }
        ],
        contacts: [
            { idcounter: 7 },
            {
                id: 7,
                firstname: "Niklas",
                lastname: "Rupert",
                email: "niklas@example.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8"
            }
        ]
    }
];

let Urgent = [todo[0], tasksinprogress[1]];

let contacts = [
    { idcounter: 6 },
    {
        id: 1,
        firstname: "Sofia",
        lastname: "Müller",
        email: "sofia@example.com",
        phone: "+49 1111 111 11 1",
        color: "#00BEE8"
    },
    {
        id: 2,
        firstname: "Anton",
        lastname: "Mayer",
        email: "anton@example.com",
        phone: "+49 1111 111 11 1",
        color: "#FF7A00"
    },
    {
        id: 3,
        firstname: "Anja",
        lastname: "Schulz",
        email: "anja@example.com",
        phone: "+49 1111 111 11 1",
        color: "#9327FF"
    },
    {
        id: 4,
        firstname: "Benedikt",
        lastname: "Ziegler",
        email: "benedikt@example.com",
        phone: "+49 1111 111 11 1",
        color: "#6E52FF"
    },
    {
        id: 5,
        firstname: "David",
        lastname: "Eisenberg",
        email: "david@example.com",
        phone: "+49 1111 111 11 1",
        color: "#FC71FF"
    },
    {
        id: 6,
        firstname: "Eva",
        lastname: "Fischer",
        email: "eva@example.com",
        phone: "+49 1111 111 11 1",
        color: "#FFBB2B"
    },
    {
        id: 7,
        firstname: "Niklas",
        lastname: "Rupert",
        email: "niklas@example.com",
        phone: "+49 1111 111 11 1",
        color: "#00BEE8"
    }
];

async function loadstorageitems() {
    await loadUsers();
    sessionStorage.removeItem("userI");
    sessionStorage.removeItem("Guest");
    sessionStorage.removeItem("handyWelcomePlayed");
}

async function loadUsers() {
    const response = await fetch(ME_URL, {
        credentials: "same-origin"
    });

    if (response.ok) {
        window.location.assign(SUMMARY_URL);
    }
}

async function register() {
    if (!register_email.checkValidity()) {
        register_email.reportValidity();
        return;
    }

    await ifelseRegister();
}

async function ifelseRegister() {
    if (register_pw_sign_in.value != register_pw_sign_in_confirm.value) {
        register_pw_sign_in_confirm.setCustomValidity("Passwords Don't Match");
        register_pw_sign_in_confirm.reportValidity();
    } else {
        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: register_name.value,
                    email: register_email.value,
                    password: register_pw_sign_in.value
                })
            });

            if (response.status === 409) {
                register_email.setCustomValidity("Email already exists");
                register_email.reportValidity();
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Registration failed: ${response.status}`);
            }

            resetForm();
        } catch (error) {
            console.error("Registration failed:", error);
        }
    }
    setTimeout(function () {
        register_pw_sign_in_confirm.setCustomValidity("");
        register_email.setCustomValidity("");
    }, 1400);
}


async function login() {
    const response = await fetch(LOGIN_API_URL, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: register_login_value.value,
            password: register_pw_login_value.value
        })
    });

    const result = await response.json();

    if (!response.ok) {
        register_pw_login_value.setCustomValidity("Wrong Password or Email");
        register_pw_login_value.reportValidity();
        return;
    }

    loaduser = 0;
    sessionStorage.setItem("userI", loaduser);
    sessionStorage.removeItem("Guest");
    window.location.assign(SUMMARY_URL);
    console.log(result);
}

/**
 * Allows a guest user to log in by setting up a predefined user object in sessionStorage.
 */

function registerGuestLogin() {
    loaduser = 0;
    users = [{
        name: "Guest",
        email: "",
        password: "",
        todo,
        done: [],
        Urgent,
        tasksinprogress,
        awaitingfeedback,
        contacts,
    },];
    sessionStorage.setItem("userI", loaduser);
    sessionStorage.setItem("Guest", JSON.stringify(users));
}

/**
 * Resets the registration form fields and handles post-registration UI feedback.
 */

function resetForm() {
    registerValueEmpty();
    backToLogin();
    singedUpSucces();
}

/**
 * Clear register Values
 */

function registerValueEmpty() {
    register_name.value = "";
    register_email.value = "";
    register_pw_sign_in.value = "";
    register_pw_sign_in_confirm.value = "";
    register_checkbox.checked = false;
}

/**
 * This function displays a success message screen after a user successfully registers.
 */

function singedUpSucces() {
    let singedupsucces = document.getElementById("singed_Up_Succes");
    singedupsucces.classList.replace("d-none", "singed-Up-Succes");
    setTimeout(singedUpSuccesRemove, 2000);
}

/**
 * This function removes the success message screen after a specified delay.
 */

function singedUpSuccesRemove() {
    let singedupsucces = document.getElementById("singed_Up_Succes");
    singedupsucces.classList.replace("singed-Up-Succes", "d-none");
}

/**
 * This function changes the visibility icon of the login password field when clicked.
 */

function changeLoginImg() {
    let loginpwimg = document.getElementById("register_pw_login_img");
    if (loginpwimg.src.endsWith(LOCK_IMG)) {
        loginpwimg.src = VISIBILITY_OFF_IMG;
    }
}

/**
 * This function changes the visibility icons of the registration password fields when clicked.
 */

function changeSigninImg() {
    let signinimg = document.getElementById("register_pw_sign_in_img");
    let signinimgconfirm = document.getElementById("register_pw_sign_in_confirm_img");
    if (signinimg.src.endsWith(LOCK_IMG)) {
        signinimg.src = VISIBILITY_OFF_IMG;
        signinimgconfirm.src = VISIBILITY_OFF_IMG;
    }
    if (signinimgconfirm.src.endsWith(LOCK_IMG)) {
        signinimg.src = VISIBILITY_OFF_IMG;
        signinimgconfirm.src = VISIBILITY_OFF_IMG;
    }
}

/**
 * This function toggles the visibility of the login password input field when clicked.
 */

function encryptPassword1() {
    let loginpw = document.getElementById("register_pw_login_value");
    let loginpwimg = document.getElementById("register_pw_login_img");
    if (loginpwimg.src.endsWith(VISIBILITY_OFF_IMG)) {
        loginpw.type = "text";
        loginpwimg.src = VISIBILITY_ON_IMG;
    } else {
        loginpw.type = "password";
        loginpwimg.src = VISIBILITY_OFF_IMG;
    }
}

/**
 * This function toggles the visibility of the registration password input fields when clicked.
 */

function encryptPassword2() {
    let signinpw = document.getElementById("register_pw_sign_in");
    let signinpimg = document.getElementById("register_pw_sign_in_img");
    let signinpwconfirm = document.getElementById("register_pw_sign_in_confirm");
    let signinpwconfirmimg = document.getElementById("register_pw_sign_in_confirm_img");
    encryptPassword2IfElse(signinpw, signinpimg, signinpwconfirm, signinpwconfirmimg);
}

/**
 * This function toggles the visibility of the registration password input fields based on their current state.
 * @param {string} signinpimg -The visibility icon image for the registration password field.
 * @param {string} signinpw -The registration password input field.
 * @param {string} signinpwconfirm -The confirmation password input field.
 * @param {string} signinpwconfirmimg -The visibility icon image for the confirmation password field.
 */

function encryptPassword2IfElse(signinpw, signinpimg, signinpwconfirm, signinpwconfirmimg) {
    if (signinpimg.src.endsWith(VISIBILITY_OFF_IMG)) {
        signinpw.type = "text";
        signinpwconfirm.type = "text";
        signinpimg.src = VISIBILITY_ON_IMG;
        signinpwconfirmimg.src = VISIBILITY_ON_IMG;
    } else {
        signinpw.type = "password";
        signinpwconfirm.type = "password";
        signinpimg.src = VISIBILITY_OFF_IMG;
        signinpwconfirmimg.src = VISIBILITY_OFF_IMG;
    }
}
