import {
    renderListView,
    renderCreateForm,
    renderEditForm,
    renderItemsList,
    getInputValues,
} from "./dom_util.js";
import { deletePark, getAllParks, postPark, updatePark } from "./api.js";

const appContainer = document.getElementById("app-container");

let parks = [];
let currentParks = [];
let isSorted = false;
const showListView = () => {
    appContainer.innerHTML = renderListView();

    document.getElementById("show_create_form_button").addEventListener("click", showCreateView);
    document.getElementById("find_button").addEventListener("click", handleFind);
    document.getElementById("cancel_find_button").addEventListener("click", handleCancelFind);
    document.getElementById("sort_button").addEventListener("click", () => handleSort(false));
    document.getElementById("sort_desc_button").addEventListener("click", () => handleSort(true));

    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
};

const showCreateView = () => {
    appContainer.innerHTML = renderCreateForm();
    document.getElementById("add_form").addEventListener("submit", handleCreateSubmit);
    document.getElementById("cancel_button").addEventListener("click", showListView);
};

const showEditView = (parkId) => {
    const park = parks.find(p => p.id === parkId);
    if (!park) {
        console.error("Park not found!");
        showListView();
        return;
    }

    appContainer.innerHTML = renderEditForm(park);
    document.getElementById("edit_form").addEventListener("submit", handleEditSubmit);
    document.getElementById("cancel_button").addEventListener("click", showListView);
};


const onEditItem = (parkId) => {
    showEditView(parkId);
};

const onRemoveItem = async (id) => {
    await deletePark(id);
    await refetchAllParks(false);
    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
};

async function handleCreateSubmit(event) {
    event.preventDefault();

    const newParkData = getInputValues();

    if (isNaN(parseFloat(newParkData.price)) || isNaN(parseFloat(newParkData.length_of_bicycle_path))) {
        showErrorModal("Please enter numeric values for price and length of bicycle path.");
        return;
    }

    await postPark(newParkData);
    await refetchAllParks(true);
}

async function handleEditSubmit(event) {
    event.preventDefault();

    const parkId = document.getElementById("edit_id_input").value;
    const updatedData = getInputValues();

    if (isNaN(parseFloat(updatedData.price)) || isNaN(parseFloat(updatedData.length_of_bicycle_path))) {
        showErrorModal("Please enter numeric values for price and length of bicycle path.");
        return;
    }

    await updatePark(parkId, updatedData);
    await refetchAllParks(true);
}

const handleFind = async () => {
    const findInput = document.getElementById("find_input");
    const searchValue = findInput.value.trim();

    const res = await getAllParks({ search: searchValue });
    currentParks = res.parks;
    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(res.totalLength);
};

const handleCancelFind = async () => {
    document.getElementById("find_input").value = "";
    const res = await getAllParks();
    currentParks = res.parks;
    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(res.totalLength);
};

const handleSort = async (desc = false) => {
    const res = await getAllParks({ sortBy: 'price', sortDesc: desc });
    currentParks = res.parks;

    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(res.totalLength);
};


const updateTotalLength = (total) => {
    const totalLengthElement = document.getElementById("total_length");
    if (!totalLengthElement) return;

    totalLengthElement.textContent = parseFloat(total).toFixed(2);
};


const refetchAllParks = async (render = true) => {
    const res = await getAllParks();
    currentParks = res.parks;

    if (render) {
        showListView();
        updateTotalLength(res.totalLength);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    refetchAllParks();
});
function showErrorModal(message) {
    const modalBody = document.getElementById("errorModalBody");
    modalBody.textContent = message;

    const modal = new bootstrap.Modal(document.getElementById("errorModal"));
    modal.show();
}

getAllParks().then(console.log);
document.addEventListener('DOMContentLoaded', () => {
    refetchAllParks();
});
