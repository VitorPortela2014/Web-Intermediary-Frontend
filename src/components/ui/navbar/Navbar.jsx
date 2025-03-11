import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Produtos</NavLink>
            <NavLink to="/musica">Musica</NavLink>
            <NavLink to="/pokemons">Pokemom</NavLink>
            <NavLink to="/chat">Chat</NavLink>
            <NavLink to="/auth">Cadastre-se</NavLink>

        </nav>
    );
}

export default Navbar;