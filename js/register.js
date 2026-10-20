let users = [];
let loaduser = [];
let todo = [
    {
        title: "CSS Architecture Planning",
        description: "Define CSS naming conventions and structures",
        date: "14/09/2024",
        category: "Technical Task",
        prio: "urgent",
        subtasks: [
            {
                idcounter: 0,
            },
            {
                id: 1,
                name: "who does what",
                isChecked: true
            },
            {
                id: 2,
                name: "what time",
                isChecked: false
            }
        ],
        contacts: [
            { idcounter: 2 },
            {
                id: 1,
                firstname: "Sofia",
                lastname: "Müller",
                email: "sofiam@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8",
            },
            {
                id: 2,
                firstname: "Anton",
                lastname: "Mayer",
                email: "antom@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FF7A00",
            },
        ],
    },
    {
        title: "Add-Task Section",
        description: "Define Add-Task",
        date: "14/09/2024",
        category: "Technical Task",
        prio: "medium",
        subtasks: [
            {
                idcounter: 0,
            },
            {
                id: 1,
                name: "who does what",
                isChecked: true
            },
            {
                id: 2,
                name: "what time",
                isChecked: false
            }
        ],
        contacts: [
            { idcounter: 2 },
            {
                id: 1,
                firstname: "Sofia",
                lastname: "Müller",
                email: "sofiam@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8",
            },
            {
                id: 2,
                firstname: "Anton",
                lastname: "Mayer",
                email: "antom@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FF7A00",
            },
        ],
    },
    {
        title: "Add-Summary",
        description: "Summary structures",
        date: "14/09/2024",
        category: "Technical Task",
        prio: "urgent",
        subtasks: [
            {
                idcounter: 0,
            },
            {
                id: 1,
                name: "who does what",
                isChecked: true
            },
            {
                id: 2,
                name: "what time",
                isChecked: false
            }
        ],
        contacts: [
            { idcounter: 4 },
            {
                id: 1,
                firstname: "Sofia",
                lastname: "Müller",
                email: "sofiam@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8",
            },
            {
                id: 2,
                firstname: "Anton",
                lastname: "Mayer",
                email: "antom@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FF7A00",
            },
            {
                id: 3,
                firstname: "Sebastian",
                lastname: "Gei",
                email: "Sebastian@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FFBB2B",
            },
            {
                id: 4,
                firstname: "Herbert",
                lastname: "Schwabelbabbel",
                email: "Schwabelbabbel@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8",
            },
        ],
    },
    {
        title: "Add-Storage",
        description: "Edit stroage structures",
        date: "14/09/2024",
        category: "Technical Task",
        prio: "urgent",
        subtasks: [
            {
                idcounter: 0,
            },
            {
                id: 1,
                name: "who does what",
                isChecked: true
            },
            {
                id: 2,
                name: "what time",
                isChecked: false
            }
        ],
        contacts: [
            { idcounter: 2 },
            {
                id: 1,
                firstname: "Sebastian",
                lastname: "Gei",
                email: "Sebastian@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FFBB2B",
            },
            {
                id: 2,
                firstname: "Herbert",
                lastname: "Schwabelbabbel",
                email: "Schwabelbabbel@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#00BEE8",
            },
        ],
    },]
let tasksinprogress = [
    {
        title: "Daily Kochwelt Recipe",
        description: "Implement daily recipe and portion calculator",
        date: "14/09/2024",
        category: "User Story",
        prio: "low",
        subtasks: [
            {
                idcounter: 0,
            },
        ],
        contacts: [
            { idcounter: 2 },
            {
                id: 3,
                firstname: "Benedikt",
                lastname: "Ziegler",
                email: "benedikt@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#6E52FF",
            },
            {
                id: 4,
                firstname: "David",
                lastname: "Eisenberg",
                email: "davidberg@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FC71FF",
            },
            {
                id: 5,
                firstname: "Eva",
                lastname: "Fischer",
                email: "eva@gmail.com",
                phone: "+49 1111 111 11 1",
                color: "#FFBB2B",
            },
        ],
    },]
let awaitingfeedback = [{
    title: "HTML Base Template Creation",
    description: "Create reusable HTML base templates",
    date: "14/09/2024",
    category: "Technical Task",
    prio: "low",
    subtasks: [
        {
            idcounter: 0,
        },
    ],
    contacts: [
        { idcounter: 2 },
        {
            id: 3,
            firstname: "Benedikt",
            lastname: "Ziegler",
            email: "benedikt@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#6E52FF",
        },
        {
            id: 4,
            firstname: "David",
            lastname: "Eisenberg",
            email: "davidberg@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#FC71FF",
        },
    ],
},]
let Urgent = [{
    title: "CSS Architecture Planning",
    description: "Define CSS naming conventions and structures",
    date: "14/09/2024",
    category: "Technical Task",
    prio: "urgent",
    subtasks: [
        {
            idcounter: 0,
        },
        {
            id: 1,
            name: "who does what",
            isChecked: true
        },
        {
            id: 2,
            name: "what time",
            isChecked: false
        }
    ],
    contacts: [
        { idcounter: 2 },
        {
            id: 1,
            firstname: "Sofia",
            lastname: "Müller",
            email: "sofiam@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#00BEE8",
        },
        {
            id: 2,
            firstname: "Anton",
            lastname: "Mayer",
            email: "antom@gmail.com",
            phone: "+49 1111 111 11 1",
            color: "#FF7A00",
        },
    ],
},]
let contacts = [
    { idcounter: 8 },
    {
        id: 0,
        firstname: "Sofia",
        lastname: "Müller",
        email: "sofiam@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#00BEE8",
    },
    {
        id: 1,
        firstname: "Anton",
        lastname: "Mayer",
        email: "antom@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#FF7A00",
    },
    {
        id: 2,
        firstname: "Anja",
        lastname: "Schulz",
        email: "schulz@hotmail.com",
        phone: "+49 1111 111 11 1",
        color: "#9327FF",
    },
    {
        id: 3,
        firstname: "Benedikt",
        lastname: "Ziegler",
        email: "benedikt@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#6E52FF",
    },
    {
        id: 4,
        firstname: "David",
        lastname: "Eisenberg",
        email: "davidberg@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#FC71FF",
    },
    {
        id: 5,
        firstname: "Eva",
        lastname: "Fischer",
        email: "eva@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#FFBB2B",
    },
    {
        id: 6,
        firstname: "Niklas",
        lastname: "Fififi",
        email: "Fififi@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#00BEE8",
    },
    {
        id: 7,
        firstname: "Sebastian",
        lastname: "Gei",
        email: "Sebastian@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#FFBB2B",
    },
    {
        id: 8,
        firstname: "Herbert",
        lastname: "Schwabelbabbel",
        email: "Schwabelbabbel@gmail.com",
        phone: "+49 1111 111 11 1",
        color: "#00BEE8",
    },]

/**
 * This function checks if user information exists in localStorage. If it doesn't, it redirects to another HTML page. It also handles the initial loading of user data and resets specific sessionStorage items.
 */

async function loadstorageitems() {
    if (localStorage.getItem("userI") === null) {
    } else {
        if (localStorage.getItem("userI").length > 0) {
            window.location.assign("summary.html");
        }
    }
    loadUsers();
    sessionStorage.removeItem("userI");
    sessionStorage.removeItem("Guest");
    sessionStorage.removeItem("handyWelcomePlayed");
}

/**
 * Asynchronously retrieves user data from storage.
 */

async function loadUsers() {
    users = await getItem("users");
}

/**
 * Handles user registration by checking if an email already exists and if not, proceeds with registration.
 */

async function register() {
    let sameemail = users.find((u) => u.email == register_email.value);
    if (sameemail) {
        register_email.setCustomValidity("Email already exists");
        register_email.reportValidity();
    } else {
        ifelseRegister();
    }
    setTimeout(function () {
        register_email.setCustomValidity("");
    }, 1400);
}

/**
 * Checks if the entered passwords match during registration. If they do, a new user is created and added to the users array.
 */

async function ifelseRegister() {
    if (register_pw_sign_in.value != register_pw_sign_in_confirm.value) {
        register_pw_sign_in_confirm.setCustomValidity("Passwords Don't Match");
        register_pw_sign_in_confirm.reportValidity();
    } else {
        users.push({
            name: register_name.value,
            email: register_email.value,
            password: register_pw_sign_in.value,
            todo,
            done: [],
            Urgent,
            tasksinprogress,
            awaitingfeedback,
            contacts,
        });
        await setItem("users", JSON.stringify(users));
        resetForm();
    }
    setTimeout(function () {
        register_pw_sign_in_confirm.setCustomValidity("");
    }, 1400);
}

/**
 * Performs user login by verifying credentials. Depending on a checkbox, it decides whether to save session information in localStorage or sessionStorage.
 */

function login() {
    let findusers = users.find((u) => u.email == register_login_value.value && u.password == register_pw_login_value.value);

    if (login_checkbox.checked == true) {
        LoginLocalstorage(findusers);
    } else {
        Loginsessionstorage(findusers);
    }
}

/**
 * These functions handle user login with localstorage
 * @param {object} findusers -The user object found that matches the credentials.
 */

function LoginLocalstorage(findusers) {
    if (findusers) {
        let userI = users.findIndex((u) => u.email == register_login_value.value && u.password == register_pw_login_value.value);
        loaduser.push(userI);
        localStorage.setItem("userI", loaduser);
        window.location.assign("summary.html");
        loginValueEmpty();
    } else {
        register_pw_login_value.setCustomValidity("Wrong Password or Email");
        register_pw_login_value.reportValidity();
    }
    setTimeout(function () {
        register_pw_login_value.setCustomValidity("");
    }, 1400);
}

/**
 * These functions handle user login with sessionstorage
 * @param {object} findusers -The user object found that matches the credentials.
 */

function Loginsessionstorage(findusers) {
    if (findusers) {
        let userI = users.findIndex((u) => u.email == register_login_value.value && u.password == register_pw_login_value.value);
        loaduser.push(userI);
        sessionStorage.setItem("userI", loaduser);
        window.location.assign("summary.html");
        loginValueEmpty();
    } else {
        register_pw_login_value.setCustomValidity("Wrong Password or Email");
        register_pw_login_value.reportValidity();
    }
    setTimeout(function () {
        register_pw_login_value.setCustomValidity("");
    }, 1400);
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
    if (loginpwimg.src.endsWith("assets/img/register_lock.png")) {
        loginpwimg.src = "assets/img/visibility_off.png";
    }
}

/**
 * This function changes the visibility icons of the registration password fields when clicked.
 */

function changeSigninImg() {
    let signinimg = document.getElementById("register_pw_sign_in_img");
    let signinimgconfirm = document.getElementById("register_pw_sign_in_confirm_img");
    if (signinimg.src.endsWith("assets/img/register_lock.png")) {
        signinimg.src = "assets/img/visibility_off.png";
        signinimgconfirm.src = "assets/img/visibility_off.png";
    }
    if (signinimgconfirm.src.endsWith("assets/img/register_lock.png")) {
        signinimg.src = "assets/img/visibility_off.png";
        signinimgconfirm.src = "assets/img/visibility_off.png";
    }
}

/**
 * This function toggles the visibility of the login password input field when clicked.
 */

function encryptPassword1() {
    let loginpw = document.getElementById("register_pw_login_value");
    let loginpwimg = document.getElementById("register_pw_login_img");
    if (loginpwimg.src.endsWith("assets/img/visibility_off.png")) {
        loginpw.type = "text";
        loginpwimg.src = "assets/img/visibility.png";
    } else {
        loginpw.type = "password";
        loginpwimg.src = "assets/img/visibility_off.png";
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
    if (signinpimg.src.endsWith("assets/img/visibility_off.png")) {
        signinpw.type = "text";
        signinpwconfirm.type = "text";
        signinpimg.src = "assets/img/visibility.png";
        signinpwconfirmimg.src = "assets/img/visibility.png";
    } else {
        signinpw.type = "password";
        signinpwconfirm.type = "password";
        signinpimg.src = "assets/img/visibility_off.png";
        signinpwconfirmimg.src = "assets/img/visibility_off.png";
    }
}
