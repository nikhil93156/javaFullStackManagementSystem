import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md sticky top-0">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <p>Employee Manager</p>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/login" className="hover:text-yellow-300 transition duration-300">Employee List</Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-yellow-300 transition duration-300">Register Employee</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
