import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/new-post">Add Post</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contacts">Contacts</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
