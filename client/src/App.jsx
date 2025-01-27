import { Route, Routes } from "react-router";
import Sidebar from "./components/sidebar.jsx";
import BrowsePage from "./pages/browse.jsx";
import MyOrdersPage from "./pages/my_orders.jsx";
import TransactionPage from "./pages/transactions.jsx";
import CreatePage from "./pages/create.jsx";
import LoginPage from "./pages/login.jsx";
import LogoutPage from "./pages/logout.jsx";
import Footer from "./components/footer.jsx";
import ProtectedRoutes from "./utilities/protected.jsx";
import { useState, useEffect } from "react";



function App() {
    const [authState, setAuthState] = useState(null);

    const getAuthState = async () => {
        const response = await fetch("/api/users");
        const data = await response.json();
        setAuthState(data.username);
    }

    useEffect(() => {
        getAuthState();
    }, []);

    return (
        <>
            <div className="flex">
                <Sidebar authState={authState} />

                <div className="flex-grow flex flex-col">
                    <Routes>
                        <Route path="/" element={<BrowsePage />}/>
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/account/orders" element={<MyOrdersPage />}/>
                            <Route path="/account/transactions" element={<TransactionPage />}/>
                        </Route>
                        <Route path="/account/create" element={<CreatePage />}/>
                        <Route path="/account/login" element={<LoginPage />}/>
                        <Route path="/account/logout" element={<LogoutPage />}/>
                    </Routes>
                    
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default App
