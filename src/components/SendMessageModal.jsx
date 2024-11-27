import React, { useEffect, useState } from "react";
import "../styles/SendMessageModal.css";
import axios from "axios";

function SendMessageModal({ event, onClose }) {
  const [recipientNumbers, setRecipientNumbers] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5153/Contact?PageSize=100&PageNumber=0&Sort=asc"
        );
        console.log("Números de contatos:", response.data.list); 
        const numbers = response.data.list.map((contact) => contact.number);
        setRecipientNumbers(numbers);
      } catch (error) {
        console.error("Erro ao buscar números:", error);
        alert("Erro ao carregar números de contato. Tente novamente.");
      }
    };

    fetchNumbers();
  }, []);

  const handleSend = async () => {
    if (recipientNumbers.length === 0) {
      alert("Nenhum número de contato encontrado.");
      return;
    }

    const payload = {
      recipientNumber: recipientNumbers,
      messageBody: event.description,
      variables: {
        Nome: event.title,
        Data: new Date(event.scheduling).toLocaleDateString("pt-BR"),
        Hora: new Date(event.scheduling).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      mediaUrl: event.imagePath,
    };

    console.log("Payload enviado:", payload);

    try {
      const response = await axios.post("http://localhost:5153/send", payload, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });

      if (response.status === 200) {
        alert("Mensagem enviada com sucesso!");
        onClose();
      } else {
        alert("Erro ao enviar a mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      alert("Erro ao enviar a mensagem. Tente novamente.");
    }
  };

  return (
    <div className="send-message-modal">
      <h2>Enviar Mensagem</h2>
      <p>
        Confirma o envio da mensagem sobre o evento{" "}
        <strong>{event.title}</strong>?
      </p>
      <button onClick={handleSend} disabled={recipientNumbers.length === 0}>
        Enviar
      </button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}

export default SendMessageModal;
