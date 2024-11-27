import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getEventById, deleteEvent } from "../services/eventService";
import "../styles/EventDetails.css";
import SendMessageModal from "./SendMessageModal";

function EventDetails() {
  const location = useLocation();
  const eventId = location.state?.id; 
  const [event, setEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error("Erro ao buscar o evento:", error);
        alert("Erro ao buscar o evento.");
      }
    };

    if (eventId) {
      fetchEvent(); 
    }
  }, [eventId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este evento?"
    );
    if (confirmDelete) {
      try {
        await deleteEvent(id);
        alert("Evento excluído com sucesso!");
        window.location.href = '/ListagemEvents';
      } catch (error) {
        console.error("Erro ao excluir o evento:", error);
        alert("Erro ao excluir o evento. Tente novamente.");
      }
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!event) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="event-details">
      <h1>{event.title}</h1>
      <div className="event-info">
        <div className="info-item">
          <img
            src={event.imagePath}
            alt={event.title}
            className="imagem-evento"
          />
        </div>
        <div className="info-item">
          <strong>Descrição:</strong>
          <p>{event.description}</p>
        </div>
        <div className="info-item">
          <strong>Data e hora:</strong>
          <p>
            {new Date(event.scheduling).toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
        </div>
        <div className="info-item">
          <div className="actions">
            <Link
              to="/update-event"
              state={{
                id: event.id,
                title: event.title,
                description: event.description,
                imagePath: event.imagePath,
                scheduling: event.scheduling,
              }}
            >
              <button className="btn-editar">Editar</button>
            </Link>
            <button
              className="btn-excluir"
              onClick={() => handleDelete(event.id)} 
            >
              Excluir
            </button>
            <button
              className="btn-enviar-message"
              onClick={handleOpenModal} 
            >
              Enviar Mensagem
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <SendMessageModal event={event} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default EventDetails;
