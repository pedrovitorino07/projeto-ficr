'use client';
import React, { useState } from "react";
import "../styles/CreateEvent.css";
import axios from "axios";
import { createEvent } from "../services/eventService"; // Assumindo que você tem esse serviço no seu backend

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);  // Alteração: Agora usamos imageFile para armazenar o arquivo da imagem
  const [date, setDate] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);  // Salva o arquivo selecionado
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Verifique se há imagem selecionada
    if (!imageFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    // Crie o FormData para enviar a imagem para o Cloudinary
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "default_preset"); // O nome do seu upload preset no Cloudinary

    try {
      // Envia a imagem para o Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhk7twn2p/image/upload", // Substitua com seu Cloud Name
        formData
      );

      // A URL da imagem enviada para o Cloudinary
      const imageUrl = response.data.secure_url;

      // Agora, crie o objeto do evento com a URL da imagem
      const formattedDate = date.replace("T", ":");

      const newEvent = {
        isDeleted: false,
        title,
        description,
        imagePath: imageUrl,  // Agora você envia a URL da imagem
        scheduling: formattedDate,
      };

      // Envie o evento para o seu backend
      await createEvent(newEvent);  // Use seu método de criar evento no backend

      alert("Evento criado com sucesso!");
      setTitle("");
      setDescription("");
      setImageFile(null);  // Limpa o arquivo de imagem após o upload
      setDate("");
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      alert("Erro ao criar evento. Tente novamente.");
    }
  };

  return (
    <div className="Register">
      <form onSubmit={handleCreate}>
        <h2>Crie seu evento</h2>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Imagem:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageFile && <p>Imagem selecionada: {imageFile.name}</p>}  {/* Exibe o nome do arquivo selecionado */}
        </label>
        <label>
          Data:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="botao-form">Salvar evento</button>
      </form>
    </div>
  );
}

export default CreateEvent;
