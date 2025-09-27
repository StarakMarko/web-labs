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

let parks = [];

const onEditItem = async (e) => {
    const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");


    await updatePark(itemId, getInputValues())

    clearInputs();

    refetchAllParks();
};

const onRemoveItem = (id) => deletePark(id).then(refetchAllParks);

export const refetchAllParks = async () => {
    const allParks = await getAllParks();

    parks = allParks;

    renderItemsList(parks, onEditItem, onRemoveItem);
};

submitButton.addEventListener("click", (event) => {
    // Prevents default page reload on submit
    event.preventDefault();

    const { name, address, length_of_bicycle_path, price } = getInputValues();

    clearInputs();
    addItemToPage({
        name,
        address,
        length_of_bicycle_path,
        price,
    });

    postPark({
        name,
        address,
        length_of_bicycle_path,
        price,
    }).then(refetchAllParks);
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