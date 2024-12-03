import React from 'react';
import MusicCard from "../musicCards/MusicCard.jsx"
import './MusicList.css';

function MusicList({ musicas, setEditMode, deleteMusica }) {
    return (
        <div id="musicas-list">
            {musicas.map((musica) => (
                <MusicCard
                    musica={musica}
                    key={musica.id}
                    setEditMode={setEditMode}
                    deleteMusica={deleteMusica}
                />
            ))}
        </div>
    )
}

export default MusicList;