const PRIVACY_URL = "privacy_policy.html";
const LEGAL_URL = "legal_notice.html";
const LOGOUT_URL = "https://join.devcontain.de/api/logout.php";
const LOGIN_URL = "index.html";

/**
 * This function updates the HTML content of an element with the ID menu_user to show the initials of the currently logged-in user. It processes the user's name to extract the first letter of each of the first two names and converts them to uppercase.
 */

function menuLoginName() {
    let menuuser = document.getElementById("menu_user");
    let username = users[loaduser].name
        .split(" ")
        .slice(0, 2)
        .map((wort) => wort[0])
        .join("")
        .toUpperCase();
    menuuser.innerHTML = username;
}

/**
 * This function displays a navigation menu by updating the HTML content of an element with the ID menu_open using the HTML structure returned by menuInnerHTML().
 */

function openMenu() {
    let openmenu = document.getElementById("menu_open");
    openmenu.innerHTML = menuInnerHTML();
}

/**
 * This function clears the content of the element with the ID menu_open, effectively hiding the menu.
 */

function closeMenu() {
    let openmenu = document.getElementById("menu_open");
    openmenu.innerHTML = "";
}

/**
 *  This function generates the HTML content for the navigation menu, including links for privacy policy, legal notice, and a logout option.
 */

function menuInnerHTML() {
    let menu = `        
    <div class="open-menu">
        <a href="${PRIVACY_URL}" class="open-menu-up"> <p>Privacy Policy</p> </a>
        <a href="${LEGAL_URL}" class="open-menu-mid"> <p>Legal notice</p> </a>
        <a href="#" class="open-menu-down" onclick="logOut(); return false;"> <p>Log out</p> </a>
    </div>
    <div class="menu-close" onclick="closeMenu()"></div>
    `;

    return menu;
}

async function logOut() {
    try {
        const response = await fetch(LOGOUT_URL, {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Logout failed: ${response.status}`);
        }

        loaduser = 0;
        localStorage.removeItem("userI");
        sessionStorage.removeItem("userI");
        sessionStorage.removeItem("Guest");
        sessionStorage.removeItem("handyWelcomePlayed");

        window.location.assign(LOGIN_URL);
    } catch (error) {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
    }
}
