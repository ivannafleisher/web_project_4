const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const galleryList = document.querySelector(".gallery__list");

const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

// UTILS functions 
function closePopup(cls) {
    console.log(cls);
    document.querySelector(cls).classList.remove("modal_opened");
}

function openPopup(cls) {
    document.querySelector(cls).classList.add("modal_opened");
}
//POPUP PICTURE
function createPopupPicture() {
    const popupTemplate = document.querySelector("#template_picture-popup").content;
    const popupElement = popupTemplate.querySelector('.modal').cloneNode(true);
    popupElement.classList.add("modal__picture");
    popupElement.querySelector(".popup__close-button").addEventListener('click',
        () => { closePopup(".modal__picture") });
    document.querySelector(".content").appendChild(popupElement);
}

function modifyPopupPicture(name, link) {
    const popupElement = document.querySelector(".modal__picture");
    let popupImg = popupElement.querySelector(".popup__image");
    let popupCapture = popupElement.querySelector(".popup__caption");

    popupImg.src = link;
    popupCapture.textContent = name;
    openPopup(".modal__picture");
}

//CARD Functions

function createCard(name, url_image) {
    const cardTemplate = document.querySelector("#template_card").content;
    const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);

    cardElement.querySelector(".gallery__img-title").textContent = name;

    let cardImg = cardElement.querySelector(".gallery__img");
    cardImg.src = url_image;
    cardImg.alt = name;
    galleryList.prepend(cardElement);


    cardElement.querySelector(".gallery__item-like").addEventListener('click', handleLikeButton);
    cardElement.querySelector(".gallery__clean-button").addEventListener('click', handleCleanButton);
    cardImg.addEventListener('click', () => { modifyPopupPicture(name, url_image); });
}


//HANDLERS
function handleLikeButton(evt) {
    console.log("like button");
    evt.target.classList.toggle("gallery__item-like__active");
}

function handleCleanButton(evt) {
    console.log("like button");
    evt.target.parentNode.remove();
}

function handleAddProfile(evt) {
    console.log(evt.target);
    openPopup(".modal_add");
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    console.log(evt.target);
    console.log("save button");
    let cardName = document.querySelector(".popup__input_title");
    let cardLink = document.querySelector(".popup__input_link");
    console.log(cardLink.value);

    createCard(cardName.value, cardLink.value);

    cardName.value = "";
    cardLink.value = "";

    closePopup(".modal_add");
}

function handleEditProfile(evt) {
    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    document.querySelector(".popup__input_text_name").value = profileName.textContent;
    document.querySelector(".popup__input_text_job").value = profileJob.textContent;

    openPopup(".modal_edit");
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    profileName.textContent = document.querySelector(".popup__input_text_name").value;
    profileJob.textContent = document.querySelector(".popup__input_text_job").value;
    closePopup(".modal_edit");
}


//POPUP create

function createAddPopUp() {
    const popupTemplate = document.querySelector("#template_popup-form").content;
    let popupElement = popupTemplate.querySelector('.modal').cloneNode(true);
    popupElement.classList.add("modal_add");

    inputs = popupElement.querySelectorAll(".popup__input");
    inputs[0].classList.add("popup__input_title");
    inputs[1].classList.add("popup__input_link");

    popupElement.querySelector(".popup__title").textContent = "New place";
    inputs[0].placeholder = "Title";
    inputs[1].placeholder = "Image link";

    document.querySelector(".content").appendChild(popupElement);

    popupElement.querySelector(".popup__close-button").addEventListener('click',
        () => { closePopup(".modal_add") });
    let save_button = popupElement.querySelector(".popup__save-button");
    save_button.addEventListener('click', handleAddFormSubmit);
}

function createEditPopUp() {
    const popupTemplate = document.querySelector("#template_popup-form").content;
    let popupElement = popupTemplate.querySelector('.modal').cloneNode(true);
    popupElement.classList.add("modal_edit");

    inputs = popupElement.querySelectorAll(".popup__input");
    inputs[0].classList.add("popup__input_text_name");
    inputs[1].classList.add("popup__input_text_job");

    popupElement.querySelector(".popup__title").textContent = "Edit profile";
    inputs[0].placeholder = "Name";
    inputs[1].placeholder = "About me";

    document.querySelector(".content").appendChild(popupElement);

    popupElement.querySelector(".popup__close-button").addEventListener('click',
        () => { closePopup(".modal_edit") });
    let save_button = popupElement.querySelector(".popup__save-button");
    save_button.addEventListener('click', handleProfileFormSubmit);
}


//MAIN
createAddPopUp();
createEditPopUp();

initialCards.forEach((item) => { createCard(item.name, item.link); });
createPopupPicture();

addButton.addEventListener('click', handleAddProfile);
editButton.addEventListener('click', handleEditProfile);