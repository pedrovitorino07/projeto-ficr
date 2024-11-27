import "../styles/AddNumber.css";
import React, { useState } from "react";

function UpdateNumber() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleDelete = async () => {
    // Simulação de exclusão do servidor (substitua por sua lógica real)
    console.log("Número de telefone deletado com sucesso!");
    setName("");
    setPhoneNumber("");
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    const digits = value.replace(/\D/g, "");

    let formattedPhoneNumber = digits;
    if (digits.length > 2) {
      formattedPhoneNumber = `(${digits.substring(0, 2)}`;
      if (digits.length > 7) {
        formattedPhoneNumber += `) ${digits.substring(2, 7)}-${digits.substring(
          7,
          11
        )}`;
      } else if (digits.length > 2) {
        formattedPhoneNumber += `) ${digits.substring(2)}`;
      }
    }

    setPhoneNumber(formattedPhoneNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phoneNumber)) {
      alert("Número de telefone inválido. Use o formato (XX) XXXXX-XXXX");
      return;
    }
    try {
      const response = await fetch("/api/add-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber }),
      });

      if (response.ok) {
        alert("Número de telefone cadastrado com sucesso!");
        setName("");
        setPhoneNumber("");
      } else {
        console.error("Erro ao cadastrar número de telefone");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
    }
  };

  return (
    <div className="AddNumber">
      <form onSubmit={handleSubmit}>
        <h1>Atualização de número</h1>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Número de Telefone:
          <input
            type="tel"
            value={phoneNumber}
            onChange={handleInputChange}
            required
            maxLength={15}
            placeholder="(XX) XXXXX-XXXX"
          />
        </label>
        <button
          type="button"
          className="botao-form-delete"
          onClick={handleDelete}
        >
          Deletar número de telefone
        </button>
        <button type="submit" className="botao-form">
          Atualizar número de telefone
        </button>
      </form>
    </div>
  );
}

export default UpdateNumber;
