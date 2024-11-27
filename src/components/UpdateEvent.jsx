import React, { useState } from "react";
import "../styles/UpdateEvent.css"; 
import { updateEvent } from "../services/eventService"; 
import { useNavigate, useLocation } from "react-router-dom";

function UpdateEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { id, title, description, imagePath, scheduling } = location.state || {};

  const formatSchedulingDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [newTitle, setNewTitle] = useState(title || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [newImagePath, setNewImagePath] = useState(imagePath || "");
  const [newDate, setNewDate] = useState(formatSchedulingDate(scheduling));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPath = `/imagesCultos/${file.name}`; 
      setNewImagePath(newPath);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formattedDate = newDate.replace("T", ":");
    const updatedEvent = {
          id,
          title: newTitle,
          description: newDescription,
          imagePath: newImagePath,
          scheduling: formattedDate,
      }
  

    try {
      await updateEvent(updatedEvent);
      alert('Evento atualizado com sucesso!!');
      window.location.href = '/ListagemEvents';
    } catch (error) {
      console.log(formattedDate);

      alert("erroS")
    }
  };

  return (
    <div className="Register">
      <form onSubmit={handleUpdate}>
        <h1>Atualize seu evento</h1>
        <label>
          Título:
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
        </label>
        <label>
          <img src={imagePath} alt="Imagem Atual" className="imagem-atual" />
        </label>
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <label>
          Data:
          <input
            type="datetime-local"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="botao-form">Atualizar evento</button>
      </form>
    </div>
  );
}

export default UpdateEvent;
