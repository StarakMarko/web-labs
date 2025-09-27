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

let parks = [];

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

const updateTotalLength = () => {
    const total = parks.reduce((sum, park) => {
        const length = parseFloat(park.length_of_bicycle_path) || 0;
        return sum + length;
    }, 0);

    totalLengthElement.textContent = total;
};

export const refetchAllParks = async () => {
    parks = await getAllParks();
    renderItemsList(parks, onEditItem, onRemoveItem);
    updateTotalLength();
};


submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const { name, address, length_of_bicycle_path, price } = getInputValues();
    clearInputs();

    const newPark = await postPark({ name, address, length_of_bicycle_path, price });

    addItemToPage(newPark, onEditItem, onRemoveItem);

    refetchAllParks();
});

let isSorted = false;

soptButton.addEventListener("click", () => {
    if (!isSorted) {
        const sortedParks = [...parks].sort((a, b) => b.price - a.price);
        renderItemsList(sortedParks, onEditItem, onRemoveItem);
        isSorted = true;
    } else {
        renderItemsList(parks, onEditItem, onRemoveItem);
        isSorted = false;
    }
});

findButton.addEventListener("click", () => {
    console.log("Масив 'parks' перед пошуком:", parks);

    const foundParks = parks.filter(
        park => park.name.search(findInput.value) !== -1
    );

    renderItemsList(foundParks, onEditItem, onRemoveItem);


});

cancelFindButton.addEventListener("click", () => {
    renderItemsList(parks, onEditItem, onRemoveItem);

    findInput.value = "";
});

// main code
refetchAllParks();