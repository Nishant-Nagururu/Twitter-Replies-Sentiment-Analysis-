import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/commentanalysis">Comment Analysis</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;