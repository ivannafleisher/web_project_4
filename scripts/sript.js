const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
const formElement = document.querySelector(".modal__form");
const submitButton = formElement.querySelector(".modal__save-button");

function closeModal() {
    document.querySelector(".modal").classList.remove("modal__open");
    document.querySelector(".overlay").classList.remove("overlay__open");
}

function openModal() {
    document.querySelector(".modal").classList.add("modal__open");
    document.querySelector(".overlay").classList.add("overlay__open");
}

function handleEditProfile(evt) {

    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    formElement.querySelector(".modal__input_name").value = profileName.textContent;
    formElement.querySelector(".modal__input_job").value = profileJob.textContent;

    openModal();
}

function handleExitProfile(evt) {
    closeModal();
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    profileName.textContent = formElement.querySelector(".modal__input_name").value;
    profileJob.textContent = formElement.querySelector(".modal__input_job").value;
    closeModal();
}

editButton.addEventListener('click', handleEditProfile);
closeButton.addEventListener('click', handleExitProfile);
submitButton.addEventListener('click', handleProfileFormSubmit);