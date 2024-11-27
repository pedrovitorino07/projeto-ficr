import "../styles/AddNumber.css";
import React, { useState } from "react";
import InputMask from "react-input-mask";

function AddNumber() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Remove a máscara para obter apenas os números
    const plainPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Validação do formato
    if (!/^\d{12}$/.test(plainPhoneNumber)) {
      alert("Número de telefone inválido. Use o formato +55 (XX) XXXX-XXXX");
      return;
    }

    try {
      const response = await fetch("http://localhost:5153/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          name: name.trim(), // Nome sem espaços extras
          number: `+${plainPhoneNumber}`, // Adiciona o `+` manualmente
        }),
      });

      if (response.ok) {
        alert("Número de telefone cadastrado com sucesso!");
        setName("");
        setPhoneNumber("");
      } else {
        const errorData = await response.json();
        console.error("Erro ao cadastrar número de telefone:", errorData);
        alert("Erro ao cadastrar número de telefone. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro de conexão com o servidor. Tente novamente.");
    }
  };

  return (
    <div className="AddNumber">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de número</h1>
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
          <InputMask
            mask="+55 (99) 9999-9999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            placeholder="+55 (XX) XXXX-XXXX"
          />
        </label>
        <button type="submit" className="botao-form">
          Cadastrar Membro
        </button>
      </form>
    </div>
  );
}

export default AddNumber;
