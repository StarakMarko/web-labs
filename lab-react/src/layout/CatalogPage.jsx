import { useState, useEffect } from "react";
import { fetchFilteredParks } from "../utils/api.js";
import FilterSection from "../containers/Filter/Filter.jsx";
import ProductCard from "../components/ProductCard/ProductCard.jsx";

function CatalogPage({ searchQuery }) {
    const [filteredParks, setFilteredParks] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchParks = async (filters = {}) => {
        try {
            setLoading(true);
            const data = await fetchFilteredParks(filters, searchQuery);
            setFilteredParks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (filters) => {
        setActiveFilters(filters);
        fetchParks(filters);
    };

    useEffect(() => {
        fetchParks(activeFilters);
    }, [searchQuery]);

    return (
        <>
            <FilterSection onFilter={handleFilter} />

            {loading ? (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <div className="loader">Loading...</div>
                </div>
            ) : filteredParks.length > 0 ? (
                filteredParks.map((park) => <ProductCard key={park.name} park={park} />)
            ) : (
                <p style={{ textAlign: "center", marginTop: 20 }}>no items found</p>
            )}
        </>
    );
}

export default CatalogPage;
