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

const handleFind = () => {
    const findInput = document.getElementById("find_input");
    const searchValue = findInput.value.toLowerCase().trim();
    currentParks = parks.filter(park => park.name.toLowerCase().includes(searchValue));
    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
};

const handleCancelFind = () => {
    currentParks = [...parks];
    document.getElementById("find_input").value = "";
    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
};

const handleSort = (desc = false) => {
    if (desc) {
        currentParks.sort((a, b) => b.price - a.price);
    } else {
        currentParks.sort((a, b) => a.price - b.price);
    }
    renderItemsList(currentParks, onEditItem, onRemoveItem);
};

const updateTotalLength = (list) => {
    const totalLengthElement = document.getElementById("total_length");
    if (!totalLengthElement) return;

    const total = list.reduce((sum, park) => sum + parseFloat(park.length_of_bicycle_path || 0), 0);
    totalLengthElement.textContent = total.toFixed(2);
};

const refetchAllParks = async (render = true) => {
    parks = await getAllParks();
    if (parks.length === 0) {
        const defaultParks = [
            { name: "Central Park", address: "New York, NY", length_of_bicycle_path: "10", price: "5" },
            { name: "Hyde Park", address: "London, UK", length_of_bicycle_path: "8", price: "3" },
        ];
        for (const park of defaultParks) {
            await postPark(park);
        }
        parks = await getAllParks();
    }
    currentParks = [...parks];

    if (render) {
        showListView();
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