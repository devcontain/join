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
        <a href="privacy_policy.html" class="open-menu-up"> <p>Privacy Policy</p> </a>
        <a href="legal_notice.html" class="open-menu-mid"> <p>Legal notice</p> </a>
        <a href="index.html" class="open-menu-down" onclick="logOut()"> <p>Log out</p> </a>
    </div>
    <div class="menu-close" onclick="closeMenu()"></div>
    `;

    return menu;
}
/**
 * This function handles the user logout process. It clears specific user-related data from both local and session storage, and resets the global variable loaduser.
 */
function logOut() {
    loaduser = [];
    localStorage.removeItem("userI");
    sessionStorage.removeItem("userI");
    sessionStorage.removeItem("Guest");
    sessionStorage.removeItem("handyWelcomePlayed");
}
