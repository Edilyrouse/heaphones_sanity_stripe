import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  // ******************* Area de states
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  /// variables para actualizar productos en el carro
  let foundProduct;
  let index;

  //***************************** area de funciones

  
  // Function to add into our Cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);   
    setQty(1);
  };


  //adding a new item into the cart
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // function Minus button on cart´s items

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      // se valida que no siga restando si es menor a 1
      return prevQty - 1;
    });
  };

  // Function to update quantity of items in the Cart component

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    //const newCartItems = cartItems.filter((item) => item._id !== id);
    // este value viene como parametro del onClick de increment
    // el dec igual viene de decrementar
    if (value === "inc") {    

      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: foundProduct.quantity + 1 };
          }
          return item;
        })
      );

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: foundProduct.quantity - 1 };
          }
          return item;
        })
      );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  // funcion de remover del Cart
  // function to remove from Cart

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    //update total en precio cuantos items por cuanto dinero
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    //update cart  element removed
    setCartItems(newCartItems);
  };

  // *************************   area para Retornar
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
