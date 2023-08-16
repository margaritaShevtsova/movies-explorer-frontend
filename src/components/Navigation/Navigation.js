import React, { useEffect } from "react";
import { useState } from "react";
import "./Navigation.css";
import {NavLink, Link} from "react-router-dom";

function Navigation({handleClose, activeItem}) {
    const [isTransition, setIsTransition] = useState(false);

    useEffect(()=>{
        setTimeout(() => {
            setIsTransition(true);
         }, 500);
    }, [])

    return(
        <nav className={`nav ${isTransition && "nav_active"}`}>
            <ul className="nav__list">
            <li className="nav__item">
            <NavLink className="nav__link" to="/">Главная</NavLink>
            </li>
            <li className="nav__item">
            <NavLink className={`nav__link ${activeItem === "фильмы" && "nav__link_active"}`} to="/movies">Фильмы</NavLink>
            </li>
            <li className="nav__item">
            <NavLink className={`nav__link ${activeItem === "сохрФильмы" && "nav__link_active"}`} to="/saved-movies">Сохранённые фильмы</NavLink>
            </li>
        </ul>
        <Link className="nav__link_type_profile" to="/profile">Аккаунт</Link>
        <button type="button" className="nav__close-btn" onClick={handleClose}></button>
        </nav>
        
    );
}

export default Navigation;