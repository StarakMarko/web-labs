import {
    EDIT_BUTTON_PREFIX,
    addItemToPage,
    clearInputs,
    renderItemsList,
    getInputValues,
} from "./dom_util.js";
import { deletePark, getAllParks, postPark, updatePark } from "./api.js";

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const soptButton = document.getElementById("sort_button");
const totalLengthElement = document.getElementById("total_length");
const sortDescButton = document.getElementById("sort_desc_button");

let parks = [];
let currentParks = [];
let isSorted = false;

const defaultParks = [
    { name: "Central Park", address: "New York, NY", length_of_bicycle_path: "10", price: 5 },
    { name: "Hyde Park", address: "London, UK", length_of_bicycle_path: "8", price: 3 },
    { name: "Tiergarten", address: "Berlin, Germany", length_of_bicycle_path: "7", price: 4 },
];


const onEditItem = async (e) => {
    const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");
    await updatePark(itemId, getInputValues());
    clearInputs();
    refetchAllParks();
};

const onRemoveItem = async (id) => {
    await deletePark(id);
    refetchAllParks();

};

const updateTotalLength = (list) => {
    const total = list.reduce((sum, park) => {
        const length = parseFloat(park.length_of_bicycle_path) || 0;
        return sum + length;
    }, 0);

    totalLengthElement.textContent = total;
};

export const refetchAllParks = async () => {
    parks = await getAllParks();

    if (parks.length === 0) {
        for (const park of defaultParks) {
            await postPark(park);
        }
        parks = await getAllParks();
    }

    currentParks = parks;
    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
};

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const { name, address, length_of_bicycle_path, price } = getInputValues();
    clearInputs();

    const newPark = await postPark({ name, address, length_of_bicycle_path, price });

    addItemToPage(newPark, onEditItem, onRemoveItem);

    refetchAllParks();
});



findButton.addEventListener("click", () => {
    const searchValue = findInput.value
        .toLowerCase()
        .replace(/\s+/g, "");

    currentParks = parks.filter(park => {
        const normalizedName = park.name.toLowerCase().replace(/\s+/g, "");
        return normalizedName.includes(searchValue);
    });

    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
});

cancelFindButton.addEventListener("click", () => {
    currentParks = parks;
    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);

    findInput.value = "";
});

soptButton.addEventListener("click", () => {
    if (!isSorted) {
        currentParks = [...currentParks].sort((a, b) => b.price - a.price);
        isSorted = true;
    } else {
        if (findInput.value.trim()) {
            const searchValue = findInput.value
                .toLowerCase()
                .replace(/\s+/g, "");
            currentParks = parks.filter(park =>
                park.name.toLowerCase().replace(/\s+/g, "").includes(searchValue)
            );
        } else {
            currentParks = parks;
        }
        isSorted = false;
    }

    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
});

sortDescButton.addEventListener("click", () => {
    if (!isSorted) {
        currentParks = [...currentParks].sort((a, b) => a.price - b.price);
        isSorted = true;
    } else {
        if (findInput.value.trim()) {
            const searchValue = findInput.value
                .toLowerCase()
                .replace(/\s+/g, "");

            currentParks = parks.filter(park =>
                park.name.toLowerCase().replace(/\s+/g, "").includes(searchValue)
            );
        } else {
            currentParks = parks;
        }
        isSorted = false;
    }

    renderItemsList(currentParks, onEditItem, onRemoveItem);
    updateTotalLength(currentParks);
});

// main code
refetchAllParks();