import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export function Login() {
  const loginUrl = `${URL}login`;
  const productsUrl = `${URL}products`;

  const [products, setProducts] = useState({});

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const postData = async () => {
      if (!userData) return;
      try {
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const result = await response.json();
          console.log("result", result);
        } else {
          console.error("Error: ", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    postData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(URL, { method: "GET" });
        if (!response) {
          throw new Error("Response status: ", response.status);
        }
        const responseJson = await response.json();
        console.log(responseJson);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(productsUrl, { method: "GET" });
        if (!response) {
          throw new Error("Response status: ", response.status);
        }
        const responseJson = await response.json();
        console.log("responseJson: ", responseJson);
        const productData = responseJson.map((row: string) => {
          return {
            id: parseInt(row[0]),
            title: row[1],
            imagePath: row[2],
            description: row[3],
            price: Number(row[4]),
          };
        });
        setProducts(productData);
        console.log("productData: ", productData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProductData();
  }, []);

  return (
    <div>
      <h2>Google Sign-In</h2>
      <div>{loginUrl}</div>
      {!userData && (
        <GoogleLogin
          className="sign"
          onSuccess={(credentialResponse) => {
            const details = jwtDecode(credentialResponse.credential);
            console.log("details: ", details);
            console.log(credentialResponse);
            const userData = {
              name: details.name,
              email: details.email,
            };
            setUserData(userData);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
      {userData && (
        <div>
          <div>Labas, {userData.name}</div>
          <div>Labas, {userData.email}</div>
        </div>
      )}
    </div>
  );
}
