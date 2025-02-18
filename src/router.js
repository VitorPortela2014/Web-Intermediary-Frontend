import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import ProductPage from "./pages/product/ProductPage";
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/authPage/AuthPage";
import MusicPage from "./pages/musicPage/MusicPage";
import PokemomPage from "./pages/PokemomPages/PokemomPage"
import ChatPage from "./pages/chatpage/ChatPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/products",
                element: <ProductPage />,
            },
            {
                path: "ex",
                element: <p>Exemplo</p>,
            },
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/auth",
                element: <AuthPage />
            },
            {
                path: "/musica",
                element: <MusicPage />
            },
            {
                path:"/pokemons",
                element: <PokemomPage></PokemomPage>

            },
            {
                path: "/chat",
                element: <ChatPage />
            }
        ],
    },
]);
