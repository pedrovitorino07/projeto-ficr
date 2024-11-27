import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Eye from "../assets/eye.png";
import "../styles/ListNumber.css";

function ListNumber() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5153/Contact?PageSize=20&PageNumber=0&Sort=asc"
        );
        setData(response.data.list);
      } catch (error) {
        console.error("Erro ao buscar números:", error);
      }
    };

    fetchNumbers();
  }, []);

  const formatPhone = (phone) => {
    const ddd = phone.slice(0, 3);
    const firstFour = phone.slice(3, 9);
    const lastFour = phone.slice(9,13);
    return `(${ddd}) ${firstFour}-${lastFour}`;
  };

  const handleViewDetails = (id) => {
    navigate(`/numberDetails`, { state: { id } });
  };

  return (
    <div className="main-event">
      <h1>Números</h1>
      <div className="tabela">
        <div className="indice linha">
          <span className="celula">Nome</span>
          <span className="celula">Número</span>
        </div>

        {data.map((contact) => (
          <div key={contact.id} className="linha">
            <span className="celula">{contact.name}</span>
            <span className="celula">{formatPhone(contact.number)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListNumber;
