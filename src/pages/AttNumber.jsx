import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import Header from "../components/Header";
import Footer from "../components/Footer";
import UpdateNumber from '../components/UpdateNumber';

function AttNumber() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await apiService.get('/Event', {
        params: {
          PageSize: 15,
          PageNumber: 0,
          Sort: 'asc'
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="App">
      {/* <h1>Lista de Eventos</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong>: {event.description}
            </li>
          ))}
        </ul>
      )} */}
      <Header />
      <UpdateNumber />
      <Footer />
    </div>
  );
}

export default AttNumber;
