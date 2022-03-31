const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__form");

// UTILS functions 
function closePopup() {

    document.querySelector(".modal").classList.remove("modal__opened");
}

function openPopup() {
    document.querySelector(".modal").classList.add("modal__opened");
}

//HANDLERS
function handleEditProfile(evt) {
    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    formElement.querySelector(".popup__input_text_name").value = profileName.textContent;
    formElement.querySelector(".popup__input_text_job").value = profileJob.textContent;

    openPopup();
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    profileName.textContent = formElement.querySelector(".popup__input_text_name").value;
    profileJob.textContent = formElement.querySelector(".popup__input_text_job").value;
    closePopup();
}

//MAIN
editButton.addEventListener('click', handleEditProfile);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleProfileFormSubmit);