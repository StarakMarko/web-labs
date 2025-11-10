import { useParams } from 'react-router-dom';
import ItemPageHero from "../containers/ItemPageHero/ItemPageHero.jsx";

function ItemPage({ parks }) {
  const { name } = useParams();
  const park = parks.find(p => p.name === decodeURIComponent(name));

  if (!park) return <p>Park not found</p>;

  return (
    <ItemPageHero parks={parks} />
  );
}

export default ItemPage;
