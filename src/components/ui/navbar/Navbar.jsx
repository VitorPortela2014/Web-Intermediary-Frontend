import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Produtos</NavLink>
            <NavLink to="/auth">Sessão</NavLink>
            <NavLink to="/pokemons">Pokemom</NavLink>
            <NavLink to="/chat">Chat</NavLink>

        </nav>
    );
}

export default Navbar;