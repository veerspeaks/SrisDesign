
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home";
import Details from "./pages/Details";
import ShowProducts from "./pages/ShowProducts";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Wishlist from "./pages/Wishlist";
import Order from "./pages/Order";
import CustomDesign from "./pages/CustomDesign";



function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="/products/:categoryId" element={<ShowProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/order" element={<Order />} />
          <Route path="/customdesign" element={<CustomDesign />} />
          {/* <Route path="/signin" element={<SignInModal />} /> */}
        </Routes>
      </Router>
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
