import React, { useEffect, useState } from "react";
import AddButton from '../../components/ui/addbutton/AddButton.jsx'
import MusicList from '../../components/musicList/MusicList.jsx';
import MusicModal from '../../components/MusicModal/MusicModal.jsx';

import { GetMusic } from "../../hooks/musicCrud/GetMusic.jsx";
import { UpdateMusic } from "../../hooks/musicCrud/UpdateMusic.jsx";
import { CreateMusic } from "../../hooks/musicCrud/CreateMusic.jsx";
import { DeleteMusic } from "../../hooks/musicCrud/DeleteMusic.jsx";

function MusicPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [musica, setMusica] = useState([]);
    const [editingMusic, setEditingMusic] = useState(null);

    useEffect(() => {
        GetMusic().then((response) => {
            console.log("Musicas recebidas da API:", response);
            setMusica(response);
        });
    }, []);

    const handleOpen = () => {
        setIsOpen(prevState => !prevState);
    };

    const deleteMusica = async (id) => {
        try {
            const res = await DeleteMusic(id);
            if (res) {
                setMusica(prevMusica => prevMusica.filter((musica) => musica.id !== id));
            }
            setEditingMusic(null);
        } catch (error) {
            console.error('Erro ao deletar música:', error);
        }
    };

    return (
        <div>
            <AddButton abrirOModal={handleOpen} texto="Adicionar uma música" />

            <MusicList
                musicas={musica}
                setEditMode={(musica) => {
                    setEditingMusic(musica);
                    handleOpen();
                }}
                deleteMusica={(id) => deleteMusica(id)}
            />

            {isOpen && (
                <MusicModal
                    createMusica={async (musica) => {
                        console.log('Iniciando a edição:', musica);
                        if (musica.id) {
                            const response = await UpdateMusic(musica);
                            console.log('Resposta da API para edição:', response);
                            setMusica(prevState =>
                                prevState.map((oldMusica) =>
                                    oldMusica.id === musica.id ? response : oldMusica
                                )
                            );
                        } else {
                            const response = await CreateMusic(musica);
                            console.log('Resposta da API para criação:', response);
                            setMusica(prevState => [...prevState, response]);
                        }
                        setEditingMusic(null);
                    }}
                    editingMusic={editingMusic}
                    fecharOModal={() => {
                        handleOpen();
                        setEditingMusic(null); // Certificando-se de que `setEditingMusic` é chamado com `null`
                    }}
                />
            )}
        </div>
    );
}

export default MusicPage;
