import "../styles/MainEvent.css";
import Eye from "../assets/eye.png";
import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import "../styles/SendMessageModal.css";

function MainEvent() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setData(events.list);
    };
    fetchEvents();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/eventDetails`, { state: { id } });
  };

  return (
    <div className="main-event">
      <h1>Eventos</h1>
      <div className="tabela">
        <div className="indice linha">
          <span className="celula">Título</span>
          <span className="celula">Data e hora</span>
          <span className="celula">Detalhes</span>
        </div>

        {data.map((event) => (
          <div key={event.id} className="linha">
            <span className="celula">{event.title}</span>
            <span className="celula">
              {new Date(event.scheduling).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
            <span className="celula">
              <img
                src={Eye}
                alt="Ver detalhes"
                onClick={() => handleViewDetails(event.id)}
                style={{ cursor: "pointer" }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainEvent;
