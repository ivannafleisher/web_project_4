const toggleModalClass = "modal_opened";
const addCardButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

const modalEditPopup = document.querySelector(".modal_edit");
const modalAddPopup = document.querySelector(".modal_add");
const modalImgPopup = document.querySelector(".modal_picture");

const popupImg = modalImgPopup.querySelector(".popup__image");
const popupCapture = modalImgPopup.querySelector(".popup__caption");

const formEdit = modalEditPopup.querySelector(".popup__form_edit");
const formAdd = modalAddPopup.querySelector(".popup__form_add");

const closeButtonEditForm = modalEditPopup.querySelector(".popup__close-button");
const closeButtonAddForm = modalAddPopup.querySelector(".popup__close-button");
const closeButtonImgPopup = modalImgPopup.querySelector(".popup__close-button");

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
function closePopup(popup) {
    popup.classList.remove(toggleModalClass);
}

function openPopup(popup) {
    popup.classList.add(toggleModalClass);
}

function fillProfileForm(name, job) {
    formEdit.querySelector(".popup__input_text_name").value = name;
    formEdit.querySelector(".popup__input_text_job").value = job;
}

//POPUP PICTURE
function modifyPopupPicture(name, link) {
    console.log("modifyPopupPicture");
    popupImg.src = link;
    popupCapture.textContent = name;
    popupImg.alt = `View of ${name} `

    openPopup(modalImgPopup);
}

//CARD Functions
function createCard(name, url_image) {
    const cardTemplate = document.querySelector("#template_card").content;
    const cardElement = cardTemplate.querySelector('.gallery__item').cloneNode(true);
    const cardLike = cardElement.querySelector(".gallery__item-like");
    const cleanButton = cardElement.querySelector(".gallery__clean-button");

    cardElement.querySelector(".gallery__img-title").textContent = name;

    const cardImg = cardElement.querySelector(".gallery__img");
    cardImg.src = url_image;
    cardImg.alt = `View of ${name} `;

    cardLike.addEventListener('click', handleLikeButton);
    cleanButton.addEventListener('click', handleCleanButton);
    cardImg.addEventListener('click', () => { modifyPopupPicture(name, url_image); });

    return cardElement;
}

function renderCard(card) {
    galleryList.prepend(card);
}

//HANDLERS
function handleLikeButton(evt) {
    evt.target.classList.toggle("gallery__item-like__active");
}

function handleCleanButton(evt) {
    evt.target.parentNode.remove();
}

function handleAddProfile(evt) {
    openPopup(modalAddPopup);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    let cardName = document.querySelector(".popup__input_title");
    let cardLink = document.querySelector(".popup__input_link");

    renderCard(createCard(cardName.value, cardLink.value));
    formAdd.reset();

    closePopup(modalAddPopup);
}

function handleEditProfile(evt) {
    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    fillProfileForm(profileName.textContent, profileJob.textContent);

    openPopup(modalEditPopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let profileName = document.querySelector(".profile__discription-name");
    let profileJob = document.querySelector(".profile__discription-title");

    profileName.textContent = formEdit.querySelector(".popup__input_text_name").value;
    profileJob.textContent = formEdit.querySelector(".popup__input_text_job").value;
    closePopup(modalEditPopup);
}

//MAIN
initialCards.forEach((item) => { renderCard(createCard(item.name, item.link)); });

addCardButton.addEventListener('click', handleAddProfile);
editButton.addEventListener('click', handleEditProfile);
formEdit.addEventListener('submit', handleProfileFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

closeButtonEditForm.addEventListener('click', () => { closePopup(modalEditPopup) });
closeButtonAddForm.addEventListener('click', () => { closePopup(modalAddPopup) });
closeButtonImgPopup.addEventListener('click', () => { closePopup(modalImgPopup) });