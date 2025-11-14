import { useState, useEffect } from "react";
import FilterSection from "../containers/Filter/Filter.jsx";
import ProductCard from '../components/ProductCard/ProductCard.jsx';


function CatalogPage({ parks, searchQuery }) {

    const [filteredParks, setFilteredParks] = useState(parks);
    const [filters, setFilters] = useState({
        price: null,
        length: null,
        word_count: null,
    });

    const handleFilter = ({ price, length, word_count, search }) => {
        let filtered = [...parks];

        const currentFilters = {
            price: price ?? filters.price,
            length: length ?? filters.length,
            word_count: word_count ?? filters.word_count,
        };

        if (currentFilters.price === "low") filtered = filtered.filter(p => p.price <= 5);
        if (currentFilters.price === "medium") filtered = filtered.filter(p => p.price > 5);

        if (currentFilters.length === "short") filtered = filtered.filter(p => p.length_of_bicycle_path <= 10);
        if (currentFilters.length === "medium") filtered = filtered.filter(p => p.length_of_bicycle_path > 10);

        if (currentFilters.word_count === "low")
            filtered = filtered.filter(p => p.description.trim().split(/\s+/).length <= 30);
        if (currentFilters.word_count === "medium")
            filtered = filtered.filter(p => p.description.trim().split(/\s+/).length > 30);

        const query = (search ?? searchQuery).toLowerCase().trim();
        if (query) {
            filtered = filtered.filter(
                p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        setFilteredParks(filtered);
        setFilters(currentFilters);
    };

    useEffect(() => {
        handleFilter({ search: searchQuery });
    }, [searchQuery]);
    return (
        <>
            <FilterSection onFilter={handleFilter} />
            {filteredParks.length > 0 ? (
                filteredParks.map(park => (
                    <ProductCard key={park.name} park={park} />
                ))
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>no items found</p>
            )}
        </>
    );
}

export default CatalogPage; 