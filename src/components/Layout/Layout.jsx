import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

const Layout = () => {
    return (
        <div className="flex flex-col w-full">
            <Navbar />
            <main className="flex-1 w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
