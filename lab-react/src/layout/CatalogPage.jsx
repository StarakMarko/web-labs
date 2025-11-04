import Filte from "../containers/Filter/Filter.jsx";
import ProductCard from '../components/ProductCard/ProductCard.jsx';

const product = [
    {
        id: 1,
        title: 'Amazing stuff 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 2415,
        length_of_bicycle_path: 30,
        address: "Universytetska St, 1"
    },
    {
        id: 2,
        title: 'Amazing stuff 2',
        description: 'Nunc maximus, nulla ut commodo sagittis, sapien dui.',
        price: 2415,
        length_of_bicycle_path: 30,
        address: "Universytetska St, 1"
    },
    {
        id: 3,
        title: 'Amazing stuff 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 2415,
        length_of_bicycle_path: 30,
        address: "Universytetska St, 1"
    },
    {
        id: 4,
        title: 'Amazing stuff 4',
        description: 'Nunc maximus, nulla ut commodo sagittis, sapien dui.',
        price: 2415,
        length_of_bicycle_path: 30,
        address: "Universytetska St, 1"
    },
];

function CatalogPage({ parks }) {
    return (
        <>
            <Filte />
            {parks.map(park => (
                <ProductCard
                    key={park.name}
                    name={park.name}
                    description={park.description}
                    price={park.price}
                    imageUrl={park.imageUrl}
                    length_of_bicycle_path={park.length_of_bicycle_path}
                    address={park.address}
                />
            ))}
        </>
    )

}

export default CatalogPage