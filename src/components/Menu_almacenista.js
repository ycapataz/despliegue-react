import React from 'react'
import { NavLink } from 'react-router-dom';

function Menu_almacenista() {
return (
    <>
    <div>
        <div>
            <nav id="nav_perfil_almacenista">
                <ul>
                    <li>
                        <a href="#" className="logo">
                            <img src="../Imegenes/logo.png" alt />
                            <span className="nav-item">Inventario</span>
                        </a>
                    </li>
                    <li><a href="../HTML/juand_perfil_inventario.html">
                        <i className="fas fa-user" />
                        <span className="nav-item">Perfil</span>
                    </a></li>
                    <li><a href="../PHP/juand_crear_producto.php">
                        <i className="fas fa-chart-bar" />
                        <span className="nav-item">Crear producto</span>
                    </a></li>
                    <li><a href="../PHP/juan_crear_proveedor.php">
                        <i className="fas fa-chart-bar" />
                        <span className="nav-item">Crear proveedor</span>
                    </a></li>
                    <li><a href="../PHP/juand_registro_entrada.php">
                        <i className="fas fa-tasks" />
                        <span className="nav-item">Registrar entrada</span>
                    </a></li>
                    <li><a href="../PHP/juand_registro_salida.php">
                        <i className="fas fa-tasks" />
                        <span className="nav-item">Registrar salida</span>
                    </a></li>
                    <li><a href="../PHP/juand_consultar_productos.php">
                        <i className="fas fa-tasks" />
                        <span className="nav-item">Consultar productos</span>
                    </a></li>
                    <li><a href="../PHP/juand_consultar_proveedores.php">
                        <i className="fas fa-tasks" />
                        <span className="nav-item">Consultar proveedores</span>
                    </a></li>
                    <li><a href="../PHP/juand_consultar_ent_inventario.php">
                        <i className="fas fa-tasks" />
                        <span className="nav-item">Entradas en inventario</span>
                    </a></li>
                    <li><a href="../juand_consultar_sald_inventario.php">
                        <i className="fas fa-tasks" />
                        <span className="nav-item">Salidas en inventario</span>
                    </a></li>
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
                    <img src="../Imegenes/almacenista.jpg" width="40px" height="40px" alt />
                    <div>
                        <h4>CARLOS ANDRES HERRERA DIAZ</h4>
                        <small>ALMACENISTA</small>
                    </div>
                </div>
            </header>
            <br /><br /><br /><br />
            <main>
                <h1>CARLOS ANDRES HERRERA DIAZ</h1>
                <div className="img_usuaro">
                    <img src="../Imegenes/almacenista.jpg" />
                </div>
            </main>
            </div>
        </div>
    </div>
    </>
)
}

export default Menu_almacenista;
