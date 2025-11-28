import CartButtons from "../containers/CartButtons/CartButtons.jsx";
import CartItem from "../components/CartItem/CartItem.jsx";
import { useSelector } from "react-redux";
import CartHero from "../containers/CartHero/CartHero.jsx";

function CartPage() {

    return (
        <>
            <CartHero />
            <CartButtons />
        </>
    );
}

export default CartPage;
