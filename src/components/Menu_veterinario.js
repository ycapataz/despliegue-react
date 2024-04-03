import React from 'react'
import { NavLink } from 'react-router-dom';
import '../assets/css/ydcapa_encabezado.css';

function Menu_veterinario() {
return (
    <>
    <div>
        <div>
            <nav id="nav_examen_medico">
                <ul>
                    <li>
                        <a href="../HTML/index.html" className="logo">
                            <img src="../Imegenes/logo.png" alt />
                            <span className="nav-item">Historia Clinica</span>
                        </a>
                    </li>
                    <li><a href="../HTML/ydcapa_perfil_veterinario.html">
                        <i className="fas fa-user" />
                        <span className="nav-item">Perfil</span>
                    </a></li>
                    <li><a href="../HTML/ydcapa_tabla_ingreso.html">
                        <i className="fas fa-tasks" />
                        <span className="nav-item">Ingresos</span>
                    </a></li>
                    <li><a href="../HTML/ydcapa_registro_clinico.html">
                        <i className="fas fa-chart-bar" />
                        <span className="nav-item">Registro clinico</span>
                    </a></li>
                    <li><a href="../HTML/ydcapa_historia_clicnico.html">
                        <i className="fas fa-wallet" />
                        <span className="nav-item">Historias Clinicas</span>
                    </a></li>
                    <li><a href="../HTML/ydcapa_Formula_medica.html">
                        <i className="fas fa-chart-bar" />
                        <span className="nav-item">Formula medica</span>
                    </a></li>
                    <li><a href="../HTML/ydcapa_examen_medico.html">
                        <i className="fas fa-chart-bar" />
                        <span className="nav-item">Examenes</span>
                    </a></li>
                    {/*
    <li><a href="#">
        <i class="fas fa-question-circle"></i>
        <span class="nav-item">Ayuda</span> 
    </a></li>
    */}
                    <li><a href="../HTML/index.html" className="logout">
                        <i className="fas fa-sign-out-alt" />
                        <span className="nav-item">Salir</span>
                    </a></li>
                </ul>
            </nav>
            <div className="main-content">
                <header>
                    <h2>
                        <label htmlFor>
                        <span className="las la-bars" />
                    </label>
                    Dogsano
                </h2>
                <div className="search-wrapper">
                    <span className="las la-search" />
                    <input type="search" placeholder="Buscar" />
                </div>
                <div className="user-wrapper">
                    <img src="../Imegenes/veterinaria_3.jpg" width="40px" height="40px" alt />
                    <div>
                        <h4>PAOLA ANDREA MARLETO</h4>
                        <small>VETERINARIO</small>
                    </div>
                </div>
            </header>
        </div>
    </div>
    </div>
    </>
)
}

export default Menu_veterinario
