import React, {useEffect} from "react";
import successImage from "../../images/Success.svg";
import faleImage from "../../images/Fale.svg";
import "./InfoToolTip.css";

export default function InfoTooltip({ onClose, isOpen, isSuccess }) {
    useEffect(() => {
        if (!isOpen) return;
        const closeByEscape = (e) => {
          if (e.key === "Escape") {
            onClose();
          }
        };
    
        document.addEventListener("keydown", closeByEscape);
        return () => document.removeEventListener("keydown", closeByEscape);
      }, [isOpen, onClose]);
    
      const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };

      return (
        <div
          className={`tooltip ${isOpen ? "tooltip_opened" : ""}`}
          onClick={handleOverlay}
        >
          <div className="tooltip__container">
          <img
          className="tooltip__image"
          src={isSuccess ? successImage : faleImage}
          alt={isSuccess ? "Знак галочки" : "Знак крестика"}
        />
            <button className="tooltip__close-btn" type="button" onClick={onClose} />
          </div>
        </div>
      );
  
}