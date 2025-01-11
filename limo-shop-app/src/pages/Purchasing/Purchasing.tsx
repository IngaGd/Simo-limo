import { useContext, useState } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { usePostData } from "src/common/hooks/usePostData";

// const name = "Vardas";
// const surname = "Pavardė";
// const email = "El. paštas";
// const address = "Adresas";

export function Purchasing() {
  const { cartItems } = useContext(GlobalContext) as GlobalContextType;
  const { setData } = usePostData();

  const [confirmTerms, setConfirmTerms] = useState(false);
  const [order, setOrder] = useState({
    products: {},
    purchaser: {},
    termsConfirmed: false,
  });
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(false);

  const [purchaser, setPurchaser] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
  });

  const orderProduct = cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setPurchaser((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitted");
    setOrder({
      products: orderProduct,
      purchaser: purchaser,
      termsConfirmed: confirmTerms,
    });
    setData({ purchaser });
  };

  console.log("order in purchasing: ", order);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Vardas</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={purchaser.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="surname">Pavardė</label>
            <input
              id="surname"
              name="surname"
              type="text"
              required
              value={purchaser.surname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">E-paštas</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={purchaser.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Pristatymo adresas</label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={purchaser.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="terms">Sutinku su pirkimo sąlygomos</label>
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            checked={confirmTerms}
            onChange={(e) => setConfirmTerms(e.target.checked)}
          />
        </div>
        <button>Pereiti prie apmokėjimo</button>
      </form>
    </div>
  );
}
