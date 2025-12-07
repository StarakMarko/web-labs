import CartButtons from "../containers/CartButtons/CartButtons.jsx";
import Form from "../containers/Form/Form.jsx";

function CheckoutPage() {

    return (
        <>
            <Form />
            <CartButtons back_text="Go back" navigateTo={-1} />
        </>
    );
}

export default CheckoutPage;