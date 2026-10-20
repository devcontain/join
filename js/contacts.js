let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
window.onresize = switchViewOnSize;

/**
 * This function loads all sorts and renders the contact-list on load of the contacts-page.
 */
async function initContacts() {
    await sortContacts();
    renderContacts();
}

/**
 * This function sorts the contacts by firstname.
 */
async function sortContacts() {
    users[loaduser].contacts = users[loaduser].contacts.sort((a, b) => (a.firstname > b.firstname ? 1 : -1));
    await saveToServer();
}

/**
 * This function renders the contact-list.
 */
function renderContacts() {
    const list = document.getElementById("contact-list");
    list.innerHTML = "";
    let prevLetter = "";
    for (let i = 0; i < users[loaduser].contacts.length; i++) {
        const contact = users[loaduser].contacts[i];
        if (!contact.firstname) continue;
        const contactdata = generateContactData(contact);
        if (contactdata.firstLetter !== prevLetter) {
            list.innerHTML += generateSeparatorHtml(contactdata.firstLetter);
            prevLetter = contactdata.firstLetter;
        }
        list.innerHTML += generateContactHtml(contact, contactdata);
    }
}

/**
 * This function generates additional data for each contact needed to build the contacts-page.
 *
 * @param {array} contact - This is the contact-array that the additional data has to be build for.
 * @returns - abbreviation, full name and first letter of the contact as array.
 */
function generateContactData(contact) {
    const contactdata = {};
    contactdata.abbreviation = contact.firstname.charAt(0) + contact.lastname.charAt(0);
    contactdata.fullname = contact.firstname + " " + contact.lastname;
    contactdata.firstLetter = contact.firstname.charAt(0).toUpperCase();
    return contactdata;
}

/**
 * This function displays the data of the selected contact in the contact-details-area and highlights the entry in the contacts-list.
 *
 * @param {number} id - This is the unique-id of the selected contact.
 * @param {element} card - This is the entry of the selected contact in the contacts-list.
 */
function openContact(id, card) {
    let contentbox = document.getElementById("contact-detail-box");
    contentbox.innerHTML = "";
    unselectSelected();
    const contact = users[loaduser].contacts.find((element) => element.id === id);
    const contactdata = generateContactData(contact);
    contentbox.innerHTML += generateContactDetailBoxHtml(contact, contactdata);
    if (card && document.documentElement.clientWidth > 850) {
        card.classList.add("selected");
        card.querySelector(".profile-fullname").classList.add("selected");
    }
    document.documentElement.clientWidth <= 850 ? changeViewMobile() : "";
}

/**
 * This function removes the 'selected'-style-class from all selected contacts.
 */
function unselectSelected() {
    document.querySelectorAll(".selected").forEach(function (selectedfield) {
        selectedfield.classList.remove("selected");
    });
}

/**
 * This function calls the function to switch back to default-view if the document-width goes above 500px.
 */
function switchViewOnSize() {
    if (document.documentElement.clientWidth > 850) {
        switchToDefault();
    }
}

/**
 * This function switches the view from mobile back to default.
 */
function switchToDefault() {
    let profilebuttons = document.querySelector(".profile-buttons");
    document.querySelector(".contact-list-box").style.removeProperty("width");
    document.querySelector(".contact-list-box").classList.remove("dnone");
    document.querySelector(".open-menu-button-box").classList.add("dnone");
    document.querySelector(".go-back-button").classList.add("dnone");
    document.querySelector(".contact-detail").classList.remove("mobile-contact-detail");
    if (profilebuttons) {
        profilebuttons.classList.remove("animation-mobile-sidebar");
    }
}

/**
 * This function switches the view from default to mobile.
 */
function changeViewMobile() {
    document.querySelector(".contact-detail").classList.add("mobile-contact-detail");
    document.querySelector(".contact-list-box").style.width = "0px";
    document.querySelector(".contact-list-box").classList.add("dnone");
    document.querySelector(".open-menu-button-box").classList.remove("dnone");
    document.querySelector(".go-back-button").classList.remove("dnone");
}

/**
 * This function opens the side menu on the contact-details-area in mobile-view.
 *
 * @param {event} event - This is the onclick-event to close the side-menu of the contact-details-area which has to be prevented on opening the side-menu.
 */
function openContactsSideMenu(event) {
    let menu = document.querySelector(".profile-buttons");
    let main = document.querySelector("main.contacts");
    menu.classList.add("animation-mobile-sidebar");
    menu.style.width = "96px";
    menu.style.padding = "10px";
    event.stopPropagation();
    main.onclick = closeContactsSideMenu;
}

/**
 * This function closes the side-menu of the contact-details-area.
 */
async function closeContactsSideMenu() {
    let menu = document.querySelector(".profile-buttons");
    let main = document.querySelector("main.contacts");
    menu.style.removeProperty("width");
    await delay(300);
    menu.style.removeProperty("padding");
}

/**
 * This function deletes a contact from the contacts-array and rerenders the contact-list.
 *
 * @param {number} id - This is the unique-id of the contact.
 */
async function deleteContact(id) {
    const index = users[loaduser].contacts.findIndex((element) => element.id === id);
    users[loaduser].contacts.splice(index, 1);
    renderContacts();
    document.querySelector(".overlay").classList.add("dnone");
    await saveToServer();
    renderContacts();
    closeOverlay();
    clearContactDetails();
}

/**
 * This function loads the contact-edition-card and displays the overlay with the card.
 *
 * @param {number} id - This is the unique-id of the contact that is to be edited.
 * @param {string} abbreviation - This is the first letter of the first name and the first letter of the last name of the contact.
 * @param {string} fullname - This is the full name of the contact.
 */
function openContactEdition(id, abbreviation, fullname) {
    let overlay = document.querySelector(".overlay");
    let contact = users[loaduser].contacts.find((element) => element.id === id);
    overlay.innerHTML = "";
    overlay.innerHTML += generateEditContactHtml(contact, abbreviation, fullname);
    overlay.classList.remove("dnone");
}

/**
 * This function closes the overlay with a card.
 */
function closeOverlay() {
    document.querySelector(".overlay").classList.add("dnone");
}

/**
 * This function empties the contact-detail-area.
 */
function clearContactDetails() {
    document.getElementById("contact-detail-box").innerHTML = "";
}

/**
 * This function adds the editions to the selected contact and save them.
 *
 * @param {number} id - This is the unique-id of the selected contact.
 */
async function saveEditedContact(id) {
    let fullname = document.getElementById("edit_contact_name").value;
    let email = document.getElementById("edit_contact_email").value;
    let phone = document.getElementById("edit_contact_phone").value;
    let name = formatName(fullname);
    let contact = users[loaduser].contacts.find((contact) => contact.id === id);
    contact.email = email;
    contact.phone = phone;
    contact.firstname = name.firstname;
    contact.lastname = name.lastname;
    await saveToServer();
    renderContacts();
    closeOverlay();
    openContact(id);
}

/**
 * This function grabs the first and the last name from the full name of a contact.
 *
 * @param {string} fullname - This is the full name of the selected contact.
 * @returns - The first and the last name of the contact.
 */
function formatName(fullname) {
    let names = fullname.split(" ");
    let firstname = "";
    for (let i = 0; i < names.length - 1; i++) {
        const name = names[i];
        i != names.length - 2 ? (firstname += capitalize(name) + " ") : (firstname += capitalize(name));
    }
    let lastname = capitalize(names[names.length - 1]);
    return { firstname: firstname, lastname: lastname };
}

/**
 * This function capitalizes the first letter of a string
 *
 * @param {string} string - This is the string that needs to be capitalized.
 * @returns - The capitalized string.
 */
function capitalize(string) {
    return string.replace(/(?<=[-\s]+|^)([a-zA-Z])/g, function (match) {
        return match.toUpperCase();
    });
}

/**
 * This function saves the users-array on the server or the session-storage for the guest-user.
 */
async function saveToServer() {
    if (sessionStorage.getItem("Guest") === null) {
        await setItem("users", JSON.stringify(users));
    } else {
        sessionStorage.setItem("Guest", JSON.stringify(users));
    }
}

/**
 * This function loads the contact-addition-card and displays the overlay with the card.
 */
function openContactAdding() {
    let overlay = document.querySelector(".overlay");
    let color = colors[Math.floor(Math.random() * colors.length)];
    overlay.innerHTML = "";
    overlay.innerHTML += generateAddContactHtml(color);
    overlay.classList.remove("dnone");
}

/**
 * This function adds, saves and renders the data of the new contact.
 */
async function saveNewContact() {
    let newcontact = buildNewContactArray();
    users[loaduser].contacts.push(newcontact);
    await saveToServer();
    initContacts();
    closeOverlay();
    document.getElementById("contact-added-notification").classList.add("notification-display");
    await delay(1500);
    document.getElementById("contact-added-notification").classList.remove("notification-display");
}

/**
 * This function adds the data of the input-fields to the new contact-array.
 *
 * @returns - The new contact-array.
 */
function buildNewContactArray() {
    let name = formatName(document.getElementById("add_contact_name").value);
    let counter = users[loaduser].contacts.find((element) => element.idcounter).idcounter;
    counter++;
    users[loaduser].contacts.find((element) => element.idcounter).idcounter = counter;
    return { id: counter, firstname: name.firstname, lastname: name.lastname, email: document.getElementById("add_contact_email").value, phone: document.getElementById("add_contact_phone").value, color: document.getElementById("add_contact_color").value };
}

/**
 * This function sets a timeout for a specific time in milliseconds.
 *
 * @param {*} milliseconds - This is the time in milliseconds.
 * @returns - The timeout-promise.
 */
function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
