const STORAGE_KEY = "parks_data";

const saveToStorage = (parks) => localStorage.setItem(STORAGE_KEY, JSON.stringify(parks));
const loadFromStorage = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

export const getAllParks = async () => {
    return loadFromStorage();
};

export const postPark = async (park) => {
    const parks = loadFromStorage();
    const newPark = { _id: crypto.randomUUID(), ...park };
    parks.push(newPark);
    saveToStorage(parks);
    return newPark;
};

export const updatePark = async (id, updatedData) => {
    const parks = loadFromStorage();
    const index = parks.findIndex(p => p._id === id);
    if (index !== -1) {
        parks[index] = { ...parks[index], ...updatedData };
        saveToStorage(parks);
    }
};

export const deletePark = async (id) => {
    const parks = loadFromStorage().filter(p => p._id !== id);
    saveToStorage(parks);
};
