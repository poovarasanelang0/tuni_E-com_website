import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "./SingleProductCombo.css";
import Header from "../../../Compoment/Header/Header";
import Footer from "../../../Compoment/Footer/Footer";
import RatingReviews from "../../Rating/RatingReviews";
import {
  collection,
  addDoc,
  getFirestore,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CartItem from "../../../Compoment/AddToCart/CartItem";
import Combosproducts from "../../../Compoment/AddToCart/Combosproducts";
import AddToCart from "../../../Compoment/AddToCart/AddToCart";

const SingleProductCombo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [productDetailsCombo, setProductDetailsCombo] = useState(null);
  const [productDetailsComboSingle, setProductDetailsComboSingle] =
    useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const { productId } = useParams();
  const auth = getAuth();
  const firestore = getFirestore();
  const [userId, setUserId] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [selectedItemCount, setSelectedItemCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartProducts(user.uid); // Fetch cart products on user login
        fetchCartProductsCombos(user.uid);
      } else {
        setUserId(null);
        setCartProducts([]); // Clear cart products on user logout
        setProductDetailsCombo([]); // Clear combo products
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (userId) {
      fetchCartProducts(userId); // Fetch cart products when userId changes
    }
  }, [userId]);

  // this one cartitem added fetch  or get the products
  const fetchCartProducts = async (userId) => {
    if (!userId) return;
    try {
      const userDocRef = collection(
        firestore,
        "users",
        userId,
        "cartCollection"
      );
      const querySnapshot = await getDocs(userDocRef);

      const cartProducts = [];
      querySnapshot.forEach((doc) => {
        cartProducts.push({ id: doc.id, data: doc.data() });
      });

      setCartProducts(cartProducts);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };
  const fetchCartProductsCombos = async (userId) => {
    if (!userId) return;
    try {
      const userDocRef = collection(
        firestore,
        "users",
        userId,
        "cartCollection_Combos"
      );
      const querySnapshot = await getDocs(userDocRef);

      const cartProducts = [];
      querySnapshot.forEach((doc) => {
        cartProducts.push({ id: doc.id, data: doc.data() });
      });

      setProductDetailsComboSingle(cartProducts);
      console.log(cartProducts, "addtocartpages +++cartProducts+++combos");
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const settings = {
    customPaging: function (i) {
      return <a>{/* Custom paging content, if any */}</a>;
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setSelectedImageIndex(index),
  };

  const sliderRef = useRef(null);
  const handleSmallImageClick = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // this one product details get
  useEffect(() => {
    const fetchProductDetailsCombo = async () => {
      try {
        const comboProductsRef = collection(firestore, "combo_products");
        const comboProductSnapshot = await getDocs(comboProductsRef);
        const product = comboProductSnapshot.docs.find(
          (doc) => doc.id === productId
        );
        if (product.exists()) {
          const data = { ...product.data(), id: product.id };
          setProductDetailsCombo(data);
          console.log("combo-get-single-fetch:", data);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.log("error:combo:", error);
      }
    };
    fetchProductDetailsCombo();
  }, [productId]);

  if (!productDetailsCombo) {
    return <div>Loading...</div>;
  }

  // this one product database added
  // const handleAddToCart = async () => {
  //   try {
  //     // Get the currently logged-in user
  //     const auth = getAuth();
  //     const user = auth.currentUser;

  //     if (!user) {
  //       console.error("User is not logged in. Cannot add to cart.");
  //       toast.error("User is not logged in. Cannot add to cart");

  //       return;
  //     }

  //     if (!selectedItems) {
  //       console.error("Please select a size before adding to cart");
  //       return;
  //     }

  //     const firestore = getFirestore();
  //     const userDocRef = doc(firestore, "users", user.uid);
  //     const cartDocRef = doc(userDocRef, "cartCollection_Combos",productId);
  //     const productWithSizeAndCount = {
  //       selectedItems: selectedItems,
  //       productDetailsCombo,
  //       itemCountcustomer: 1,

  //     };
  //     await setDoc(cartDocRef, productWithSizeAndCount, selectedItems);

  //     console.log(
  //       "Product added to the user's cart subcollection successfully!"
  //     );

  //     // Fetch and update the cart products
  //     fetchCartProductsCombos(user.uid);
  //   } catch (error) {
  //     console.error("Error adding product to cart: ", error);
  //   }
  // };

  const handleAddToCart = async () => {
    try {
      // Get the currently logged-in user
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User is not logged in. Cannot add to cart.");
        toast.error("User is not logged in. Cannot add to cart");
        return;
      }

      if (!selectedItems) {
        console.error("Please select a size before adding to cart");
        return;
      }

      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);
      const cartCollectionRef = collection(userDocRef, "cartCollection_Combos");

      const productWithSizeAndCount = {
        selectedItems: selectedItems,
        productDetailsCombo,
        itemCountcustomer: 1,
      };

      // Use addDoc to create a new document with a random ID in the cartCollection_Combos subcollection
      await addDoc(cartCollectionRef, productWithSizeAndCount);

      console.log(
        "Product added to the user's cart subcollection successfully!"
      );

      // Fetch and update the cart products
      fetchCartProductsCombos(user.uid);
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  };

  // to displayed diffent size
  const getSizeOptions = (name) => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes("pant") || lowerCaseName.includes("jeans")) {
      return ["28", "30", "32", "34", "36", "38"];
    } else if (lowerCaseName.includes("shoe")) {
      return ["6", "7", "8", "9", "10", "11"];
    } else {
      return ["S", "M", "L", "XL", "XXL"];
    }
  };

  // const handleAddToCombo = () => {
  //   const currentProduct =
  //     productDetailsCombo.combo_details[selectedImageIndex];
  //   if (
  //     selectedSize ||
  //     currentProduct.name.toLowerCase().includes("accessory")
  //   ) {
  //     setSelectedItems((prevItems) => [
  //       ...prevItems,
  //       { ...currentProduct, size: selectedSize },
  //     ]);
  //     setSelectedSize("");
  //   }
  // };



  const handleAddToCombo = () => {
    const currentProduct =
      productDetailsCombo.combo_details[selectedImageIndex];
    if (
      selectedSize ||
      currentProduct.name.toLowerCase().includes("accessory")
    ) {
      setSelectedItems((prevItems) => [
        ...prevItems,
        { ...currentProduct, size: selectedSize },
      ]);
      setSelectedSize("");
      setSelectedItemCount((prevCount) => prevCount + 1);
    }
  };

  // console.log(selectedItemCount,"selectedItemCount_combo");

  const handleRemoveFromCombo = (id) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // console.log(selectedItems, "selectedItems");

  const isAddToCartEnabled = () => {
    const requiredSelections = productDetailsCombo.combo_count === "6" ? 4 : 8;
    return selectedItems.length >= requiredSelections;
  };

  const isAddToComboEnabled = () => {
    const requiredSelections = productDetailsCombo.combo_count === "6" ? 4 : 8;
    return (
      selectedItems.length < requiredSelections &&
      !selectedItems.some(
        (item) =>
          item.id === productDetailsCombo.combo_details[selectedImageIndex].id
      )
    );
  };

  const currentProduct = productDetailsCombo.combo_details[selectedImageIndex];
  const sizeOptions = getSizeOptions(currentProduct.name);
  const isAccessory = currentProduct.name.toLowerCase().includes("accessory");

  // normal

  const handleQuantityChange = (productId, newQuantity, isCombo = false) => {
    if (isCombo) {
      const updatedCombos = productDetailsComboSingle.map((comboProduct) => {
        if (comboProduct.id === productId) {
          return {
            ...comboProduct,
            data: { ...comboProduct.data, itemCountcustomer: newQuantity },
          };
        }
        return comboProduct;
      });
      setProductDetailsComboSingle(updatedCombos);
    } else {
      const updatedCartProducts = cartProducts.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            data: { ...cartProduct.data, itemCountcustomer: newQuantity },
          };
        }
        return cartProduct;
      });
      setCartProducts(updatedCartProducts);
    }

    updateQuantityInFirestore(productId, newQuantity, isCombo);
  };

  const updateQuantityInFirestore = async (
    productId,
    newQuantity,
    isCombo = false
  ) => {
    try {
      const collectionName = isCombo
        ? "cartCollection_Combos"
        : "cartCollection";
      const userDocRef = doc(
        collection(firestore, "users", userId, collectionName),
        productId
      );
      await updateDoc(userDocRef, { itemCountcustomer: newQuantity });
      console.log("Item count updated successfully!");
    } catch (error) {
      console.error("Error updating item count:", error);
      // If there's an error, revert the local state back to the previous state
      if (isCombo) {
        fetchCartProductsCombos(userId);
      } else {
        fetchCartProducts(userId);
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCartProducts = cartProducts.filter(
      (cartProduct) => cartProduct.id !== productId
    );
    setCartProducts(updatedCartProducts);
    toast.success("Successfully Clear CartItem");
    deleteItemFromFirestore(productId);
  };

  const handleRemoveFromCartCombos = (productId) => {
    const updatedCartProducts = productDetailsComboSingle.filter(
      (comboProduct) => comboProduct.id !== productId
    );
    setProductDetailsComboSingle(updatedCartProducts);
    toast.success("Successfully Cleared Combo Item");
    deleteComboItemFromFirestore(productId);
  };

  const deleteComboItemFromFirestore = async (productId) => {
    try {
      const userDocRef = doc(
        collection(firestore, "users", userId, "cartCollection_Combos"),
        productId
      );
      await deleteDoc(userDocRef);

      console.log("Combo document successfully deleted from cart!");
    } catch (error) {
      console.error("Error removing combo product from cart: ", error);
      fetchCartProductsCombos(userId);
    }
  };

  const deleteItemFromFirestore = async (productId) => {
    try {
      const userDocRef = doc(
        collection(firestore, "users", userId, "cartCollection"),
        productId
      );
      await deleteDoc(userDocRef);

      console.log("Document successfully deleted from cart!");
    } catch (error) {
      console.error("Error removing product from cart: ", error);
      // If there's an error, revert the local state back to the previous state
      fetchCartProducts(userId);
    }
  };

  const calculateTotalPrice = (cartProducts, productDetailsComboSingle) => {
    let totalPrice = 0;

    if (cartProducts && Array.isArray(cartProducts)) {
      cartProducts.forEach((cartProduct) => {
        const price = parseInt(cartProduct.data.price);
        const count = parseInt(cartProduct.data.itemCountcustomer);
        totalPrice += price * count;
      });
    }

    if (productDetailsComboSingle && Array.isArray(productDetailsComboSingle)) {
      productDetailsComboSingle.forEach((comboProduct) => {
        const price = parseInt(comboProduct.data.productDetailsCombo.price);
        const count = parseInt(comboProduct.data.itemCountcustomer);
        totalPrice += price * count;
      });
    } 

    console.log(totalPrice, "totalPricetotalPrice");

    return totalPrice;
  };

  // Assuming cartProducts and productDetailsComboSingle are passed correctly
  const totalCartPrice = calculateTotalPrice(
    cartProducts,
    productDetailsComboSingle
  );

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row my-1">
          <h5 className="py-3">Combo Pack</h5>
          <div className="col-lg-8 col-md-12 col-12">
            <div className="small-images-container mt-3">
              {productDetailsCombo.combo_details.map((detail, index) => (
                <div
                  key={index}
                  className={`small-image-box ${
                    selectedItems.some((item) => item.id === detail.id)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSmallImageClick(index)}
                >
                  <img
                    src={detail.imageturls}
                    className="img-fluid"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="my-1">
              <div className="slider-container_combo1">
                <Slider {...settings} ref={sliderRef}>
                  {productDetailsCombo.combo_details.map((detail, index) => (
                    <div key={index} className="combo_single">
                      <img
                        src={detail.imageturls}
                        alt={`View ${index + 1}`}
                        className="img-fluid img-container"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <div className="mx-2 mt-5 pt-3">
              <div className="">
                <h5 className="fw-bold">{currentProduct.name}</h5>
                <p className="text-muted">{currentProduct.description}</p>
                {!isAccessory && (
                  <div className="size-options">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        className={`btn me-2 mb-2 ${
                          selectedSize === size
                            ? "btn-dark text-light"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                <div className="accessory-select">
                  <button
                    className="btn btn-primary rounded-pill"
                    onClick={handleAddToCombo}
                    disabled={!isAddToComboEnabled()}
                  >
                    Add To Combo
                  </button>
                  {selectedItems.some(
                    (item) => item.id === currentProduct.id
                  ) && (
                    <button
                      className="btn border-0 text-danger rounded-pill ms-2"
                      onClick={() => handleRemoveFromCombo(currentProduct.id)}
                    >
                      Remove From Combo
                    </button>
                  )}
                </div>
                <h5 className="py-3 fw-bold">Selected Items</h5>
                {selectedItems.map((item, index) => (
                  <div key={index} className="selected-item d-flex">
                    <img
                      src={item.imageturls}
                      alt={item.name}
                      className="img-fluid"
                      style={{
                        height: "5vh",
                        width: "5vh",
                        borderRadius: "5px",
                      }}
                    />
                    <p className="mx-1">
                      {item.name} - Size:{" "}
                      <span className="fw-bold">{item.size}</span>
                    </p>
                    <button
                      type="button"
                      class="btn btn-link border-0 text-danger ms-auto "
                      style={{ marginTop: "-16px" }}
                      onClick={() => handleRemoveFromCombo(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <div className="price-box my-2">
                  <h3>Price:</h3>
                  <p className="">
                    <i className="bi bi-currency-rupee"></i>
                    <span className="fw-bold fs-5">
                      {productDetailsCombo.price}{" "}
                    </span>{" "}
                    <span className="text-muted">(For set of {selectedItemCount} pieces)</span>
                  </p>
                </div>
                <div>
                  <p className="text-muted">
                    Tax included. Shipping calculated at checkout
                  </p>
                  <p className="text-danger font_size_bought">
                    <i className="bi bi-cart-check-fill">{"\u00a0"}</i>455
                    people bought this in last 7 days
                  </p>
                </div>
                <div className="text-center bg_color_buy_now">
                  <button
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight1"
                    aria-controls="offcanvasRight1"
                    className="btn px-5 rounded-pill"
                    disabled={!isAddToCartEnabled()}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight1"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">
                Shopping Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <CartItem
                cartProducts={cartProducts}
                handleRemoveFromCart={handleRemoveFromCart}
                handleQuantityChange={handleQuantityChange}
                totalCartPrice={totalCartPrice}
                handleRemoveFromCartCombos={handleRemoveFromCartCombos}
                productDetailsCombo={productDetailsComboSingle}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div>
              <RatingReviews />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProductCombo;
