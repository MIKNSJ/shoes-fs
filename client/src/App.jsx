import { Route, Routes } from "react-router";
import Sidebar from "./components/sidebar.jsx";
import BrowsePage from "./pages/browse.jsx";
import MyOrdersPage from "./pages/my_orders.jsx";
import TransactionPage from "./pages/transactions.jsx";
import CreatePage from "./pages/create.jsx";
import LoginPage from "./pages/login.jsx";
import LogoutPage from "./pages/logout.jsx";
import Footer from "./components/footer.jsx";
import { useEffect } from "react";



function App() {
    const testBackendApi = async () => {
        const response = await fetch("/api");
        const data = await response.json();
        console.log("{name: " + data.username + ": " + "password: " + data.password + "}");

        const response2 = await fetch("/api/test1");
        const data2 = await response2.json();
        console.log("{name: " + data2.username + ": " + "password: " + data2.password + "}");

        const response3 = await fetch("/admin");
        const data3 = await response3.json();
        console.log("{name: " + data3.username + ": " + "password: " + data3.password + "}");
    };

    useEffect(() => {
        testBackendApi();
    }, [])

    return (
        <>
            <div className="flex">
                <Sidebar />

                <div className="flex-grow flex flex-col">
                    <Routes>
                        <Route path="/" element={<BrowsePage />}/>
                        <Route path="/account/orders" element={<MyOrdersPage />}/>
                        <Route path="/account/transactions" element={<TransactionPage />}/>
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
