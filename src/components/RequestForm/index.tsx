import "./RequestForm.sass";
import { useState } from "react";
import axios from "axios";

export const RequestForm = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/requests", {
        name,
        phoneNumber,
        email,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="request-container">
      <h2 className="request-title">
        Получите бесплатную консультацию по подбору пульсометра
      </h2>
      <p>
        Просто заполните форму заявки и мы перезвоним вам в течении 10 минут
      </p>
      <input
        type="text"
        placeholder="Введите имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="request-input"
      />
      <input
        type="text"
        placeholder="Введите номер телефона"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="request-input"
      />
      <input
        type="text"
        placeholder="Введите Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="request-input"
      />
      <button className="request-button" onClick={handleSubmit}>
        Заказать консультацию
      </button>
    </div>
  );
};
