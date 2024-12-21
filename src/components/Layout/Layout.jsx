import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-grow">	
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
