import { onDragNDrop } from "./drag_n_drop.js";

export const EDIT_BUTTON_PREFIX = 'edit-button-';

const titleInput = document.getElementById("name_input");
const descriptionInput = document.getElementById("address_input");
const lengthInput = document.getElementById("length_of_bicycle_path_input");
const priceInput = document.getElementById("price_input");
const itemsContainer = document.getElementById("items_container");

// local functions

const itemTemplate = ({ id, name, address, length_of_bicycle_path, price }) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
  <img
    src="https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-name">${name}</h5>
    <p class="card-address">${address}</p>
    <p class="card-length_of_bicycle_path">${length_of_bicycle_path}</p>
    <p class="card-price">${price}</p>
    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">
      Edit
    </button>
  </div>
</li>`;

// exposed functions
export const clearInputs = () => {
  titleInput.value = "";

  descriptionInput.value = "";
  lengthInput.value = "";
  priceInput.value = "";
};

export const addItemToPage = ({ _id: id, name, address, length_of_bicycle_path, price }, onEditItem, onRemoveItem) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, name, address, length_of_bicycle_path, price })
  );

  const element = document.getElementById(id);
  const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);

  element.onmousedown = onDragNDrop(element, onRemoveItem);
  editButton.addEventListener("click", onEditItem);

  // VERY IMPORTANT
  // Allows not to trigger DragNDrop when user clicks Edit Button
  editButton.onmousedown = e => e.stopPropagation();
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item, onEditItem, onRemoveItem);
  }
};

export const getInputValues = () => {
  return {
    name: titleInput.value,
    address: descriptionInput.value,
    length_of_bicycle_path: lengthInput.value,
    price: priceInput.value,

  };
};