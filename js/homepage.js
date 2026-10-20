/**
 * This function manages the display when switching from a login view to a sign-up view.
 */

function signUpBox() {
    let loginpwimg = document.getElementById("register_pw_login_img");
    let registerlogin = document.getElementById("register_login");
    let registersignin = document.getElementById("register_sign_in");
    let registersignupbox = document.getElementById("register_sign_up_box");

    registerlogin.classList.replace("register-login", "d-none");
    registersignin.classList.replace("d-none", "register-sign-up-box");
    registersignupbox.classList.replace("register-sign-up-flex", "d-none");
    loginpwimg.src = "assets/img/register_lock.png";
    loginValueEmpty();
}

/**
 * Clears the input values in the login form.
 */

function loginValueEmpty() {
    register_login_value.value = "";
    register_pw_login_value.value = "";
    login_checkbox.checked = false;
}

/**
 * Handles the UI transition from the sign-up view back to the login view.
 */

function backToLogin() {
    let registerlogin = document.getElementById("register_login");
    let registersignin = document.getElementById("register_sign_in");
    let registersignupbox = document.getElementById("register_sign_up_box");
    let signinimg = document.getElementById("register_pw_sign_in_img");
    let signinimgconfirm = document.getElementById("register_pw_sign_in_confirm_img");

    registerlogin.classList.replace("d-none", "register-login");
    registersignin.classList.replace("register-sign-up-box", "d-none");
    registersignupbox.classList.replace("d-none", "register-sign-up-flex");
    signinimgconfirm.src = "assets/img/register_lock.png";
    signinimg.src = "assets/img/register_lock.png";
    registerValueEmpty();
}

/**
 * Manages the style of input borders based on focus events.
 */

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".login-input input").forEach(function (input) {
        let loginInput = input.closest(".login-input");

        input.addEventListener("focus", function () {
            loginInput.style.borderColor = "rgb(41, 171, 226)";
        });
        input.addEventListener("blur", function () {
            if (input.checkValidity()) {
                loginInput.style.borderColor = "#D1D1D1";
            }
        });
    });
});

/**
 * Handles the styling of input borders on validation failure.
 */

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".login-input input").forEach(function (input) {
        let loginInput = input.closest(".login-input");

        input.addEventListener("invalid", function () {
            loginInput.style.borderColor = "red";
            setTimeout(function () {
                if (!input.matches(":focus")) {
                    loginInput.style.borderColor = "#D1D1D1";
                }
            }, 3000);
        });
    });
});
