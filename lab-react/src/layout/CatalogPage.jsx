import { useState, useEffect } from "react";
import FilterSection from "../containers/Filter/Filter.jsx";
import ProductCard, { ProductCardContext } from '../components/ProductCard/ProductCard.jsx';


function CatalogPage({ parks, searchQuery }) {

    const [filteredParks, setFilteredParks] = useState(parks);

    const handleFilter = ({ price, length, word_count }) => {
        let filtered = [...parks];

        if (price === "low") filtered = filtered.filter(p => p.price <= 5);
        if (price === "medium") filtered = filtered.filter(p => p.price > 5);

        if (length === "short") filtered = filtered.filter(p => p.length_of_bicycle_path <= 10);
        if (length === "medium") filtered = filtered.filter(p => p.length_of_bicycle_path > 10);

        if (word_count === "low") filtered = filtered.filter(p => p.description.trim().split(/\s+/).length <= 30);
        if (word_count === "medium") filtered = filtered.filter(p => p.description.trim().split(/\s+/).length > 30);

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        setFilteredParks(filtered);
    };

    useEffect(() => {
        handleFilter({});
    }, [searchQuery]);

    return (
        <>
            <FilterSection onFilter={handleFilter} />
            {filteredParks.length > 0 ? (
                filteredParks.map(park => (
                    <ProductCardContext.Provider key={park.name} value={park}>
                        <ProductCard />
                    </ProductCardContext.Provider>
                ))
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>no items found</p>
            )}
        </>
    );
}

export default CatalogPage; 