import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <span className="not-found__descr">404</span>
      <h2 className="not-found__title">Страница не найдена</h2>
      <button className="not-found__btn" onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
}

export default NotFound;
