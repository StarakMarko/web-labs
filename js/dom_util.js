import { onDragNDrop } from "./drag_n_drop.js";

export const EDIT_BUTTON_PREFIX = 'edit-button-';

const itemTemplate = ({ id, name, address, length_of_bicycle_path, price }) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
  <img src="https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg" class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-name">${name}</h5>
    <p class="card-address">${address}</p>
    <p class="card-length_of_bicycle_path">${length_of_bicycle_path} km</p>
    <p class="card-price">${price} $</p>
    <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">Edit</button>
  </div>
</li>`;

export const renderListView = () => `
<div class="row mb-3">
    <h1 class="text-center">Parks</h1>
</div>
<div class="row">
    <div class="col-md-4 mt-2">
        <button id="show_create_form_button" class="btn btn-primary mb-4">Create Park</button>
        <div class="mt-3">
            <h4 class="mb-3">Find cards</h4>
            <input id="find_input" type="text" class="form-control" />
            <button id="find_button" type="button" class="btn btn-primary mt-4">Find</button>
            <button id="cancel_find_button" type="button" class="btn btn-danger mt-4">Cancel</button>
        </div>
        <div class="mt-3">
            <h4 class="mb-3">Sort by price</h4>
            <button id="sort_button" type="button" class="btn btn-primary">Sort Asc</button>
            <button id="sort_desc_button" type="button" class="btn btn-secondary mt-2">Sort Desc</button>
        </div>
        <div class="mt-3">
            <strong>Total length of bicycle paths:</strong> <span id="total_length">0</span> km
        </div>
    </div>
    <ul id="items_container" class="col-md-4 mt-5 mt-md-2 mx-auto"></ul>
    <div class="col-md-4">
        <div class="p-4">
            <div class="delete-section">
                <div class="text-center">
                    <img class="delete-section__icon mb-4" src="./assets/basket.svg" alt="basket" />
                    <div>Drop here to delete</div>
                </div>
            </div>
        </div>
    </div>
</div>`;

export const renderCreateForm = () => `
<div class="row justify-content-center">
    <div class="col-md-8">
        <h1 class="text-center mb-4">Create Park</h1>
        <form id="add_form">
            <div class="mb-3"><label class="form-label">Name</label><input type="text" class="form-control" id="name_input" required /></div>
            <div class="mb-3"><label class="form-label">Address</label><input type="text" class="form-control" id="address_input" required /></div>
            <div class="mb-3"><label class="form-label">Length of bicycle path</label><input class="form-control" id="length_of_bicycle_path_input" required /></div>
            <div class="mb-3"><label class="form-label">Price</label><input class="form-control" id="price_input" required /></div>
            <button id="submit_button" type="submit" class="btn btn-primary">Submit</button>
            <button id="cancel_button" type="button" class="btn btn-secondary">Cancel</button>
        </form>
    </div>
</div>`;

export const renderEditForm = ({ _id: id, name, address, length_of_bicycle_path, price }) => `
<div class="row justify-content-center">
    <div class="col-md-8">
        <h1 class="text-center mb-4">Edit Park</h1>
        <form id="edit_form">
            <input type="hidden" id="edit_id_input" value="${id}" />
            <div class="mb-3"><label class="form-label">Name</label><input type="text" class="form-control" id="name_input" value="${name}" required /></div>
            <div class="mb-3"><label class="form-label">Address</label><input type="text" class="form-control" id="address_input" value="${address}" required /></div>
            <div class="mb-3"><label class="form-label">Length of bicycle path</label><input class="form-control" id="length_of_bicycle_path_input" value="${length_of_bicycle_path}" required /></div>
            <div class="mb-3"><label class="form-label">Price</label><input class="form-control" id="price_input" value="${price}" required /></div>
            <button id="update_button" type="submit" class="btn btn-primary">Update</button>
            <button id="cancel_button" type="button" class="btn btn-secondary">Cancel</button>
        </form>
    </div>
</div>`;


export const addItemToPage = ({ _id: id, name, address, length_of_bicycle_path, price }, onEditItem, onRemoveItem) => {
  const itemsContainer = document.getElementById("items_container");
  if (!itemsContainer) return;

  itemsContainer.insertAdjacentHTML("afterbegin", itemTemplate({ id, name, address, length_of_bicycle_path, price }));

  const element = document.getElementById(id);
  const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);

  element.onmousedown = onDragNDrop(element, onRemoveItem);
  editButton.addEventListener("click", () => onEditItem(id));
  editButton.onmousedown = e => e.stopPropagation();
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  const itemsContainer = document.getElementById("items_container");
  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";
  for (const item of items) {
    addItemToPage(item, onEditItem, onRemoveItem);
  }
};

export const getInputValues = () => {
  return {
    name: document.getElementById("name_input").value,
    address: document.getElementById("address_input").value,
    length_of_bicycle_path: document.getElementById("length_of_bicycle_path_input").value,
    price: document.getElementById("price_input").value,
  };
};