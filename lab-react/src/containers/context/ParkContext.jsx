import { createContext, useContext, useState } from "react";

const ParkContext = createContext();

export function ParkProvider({ children }) {
    const [selectedPark, setSelectedPark] = useState(null);

    return (
        <ParkContext.Provider value={{ selectedPark, setSelectedPark }}>
            {children}
        </ParkContext.Provider>
    );
}

export function usePark() {
    return useContext(ParkContext);
}