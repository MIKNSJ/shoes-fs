import { Route, Routes } from "react-router";
import Sidebar from "./components/sidebar.jsx";
import BrowsePage from "./pages/browse.jsx";
import MyOrdersPage from "./pages/my_orders.jsx";
import TransactionPage from "./pages/transactions.jsx";
import CreatePage from "./pages/create.jsx";
import LoginPage from "./pages/login.jsx";
import LogoutPage from "./pages/logout.jsx";
import Footer from "./components/footer.jsx";
import Success from "./pages/success.jsx";
import Failed from "./pages/failed.jsx";
import Error from "./pages/error.jsx";
import ProtectedRoutes from "./utilities/protected.jsx";
import RestrictedRoutes from "./utilities/restricted.jsx";
import { useState, useEffect } from "react";



function App() {
    const [authState, setAuthState] = useState();
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const getAuthState = async () => {
        const response = await fetch("/api/users");
        const data = await response.json();
        setAuthState(data.username);
    }

    const getItems = async() => {
        const responseTwo = await fetch("/api/items");
        const dataTwo = await responseTwo.json();
        setItems(dataTwo);
    }

    const getCartItems = async() => {
        const responseThree = await fetch("/api/users/items");
        const dataThree = await responseThree.json();
        if (cart.numItems !== dataThree.numItems) {
            setCart(dataThree);
        }
    }

    const getTransactions = async() => {
        const responseFour = await fetch("/api/users/transactions");
        const dataFour = await responseFour.json();
        setTransactions(dataFour);
    }

    useEffect(() => {
        getAuthState();
        getItems();
        getTransactions();
    }, []);

    useEffect(() => {
        getCartItems();
    }, [cart]);

    return (
        <>
            <div className="flex">
                <Sidebar authState={authState} cart={cart} />

                <div className="flex-grow flex flex-col">
                    <Routes>
                        <Route path="/" element={<BrowsePage items={items} cart={cart} setCart={setCart} />}/>

                        <Route element={<ProtectedRoutes authState={authState} />}>
                            <Route path="/account/orders" element={<MyOrdersPage cart={cart} setCart={setCart} />}/>
                            <Route path="/account/orders/success" element={<Success />}/>
                            <Route path="/account/orders/failed" element={<Failed />}/>
                            <Route path="/account/transactions" element={<TransactionPage transactions={transactions} />}/>
                            <Route path="/account/logout" element={<LogoutPage />}/>
                        </Route>

                        <Route element={<RestrictedRoutes authState={authState} />}>
                            <Route path="/account/create" element={<CreatePage />}/>
                            <Route path="/account/login" element={<LoginPage />}/>
                        </Route>

                        <Route path="*" element={<Error />}/>
                    </Routes>
                    
                    <Footer />
                </div>
            </div>
        </>
    )
}


export default App
