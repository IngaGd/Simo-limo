import { useContext, useState } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function Purchasing() {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [confirmTerms, setConfirmTerms] = useState(false);
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState(false);

  const [order, setOrder] = useState([]);

  //const {cartItems } = useContext(GlobalContext) as GlobalContextType;

  const submitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = {
      name: name,
      surName: surName,
      email: email,
      address: address,
      confirmTerms: confirmTerms,
    };
    setOrder(formData);
    console.log(order);
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <div>
            <label htmlFor="name">Vardas</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="surName">Pavardė</label>
            <input
              id="surName"
              type="text"
              required
              value={surName}
              onChange={(e) => setSurName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">E-paštas</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Pristatymo adresas</label>
          <input
            id="address"
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="terms">Sutinku su pirkimo sąlygomos</label>
          <input
            id="terms"
            type="checkbox"
            checked={confirmTerms}
            onChange={(e) => setConfirmTerms(e.target.checked)}
          />
        </div>
        <button>Pereiti prie apmokėjimo</button>
      </form>
    </div>
  );
}
