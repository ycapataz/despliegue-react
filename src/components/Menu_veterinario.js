import React, { useContext } from 'react';
import stylev from '../assets/css/avg_encabezado.module.scss'; 
import logo1 from '../assets/images/logo1.png'; 
import vaterinaria from '../assets/images/icon-user.jpg';
import 'bootstrap/scss/bootstrap.scss';
import UserContext from '../context/UserContext';

function MenuVeterinario() {
    const { user } = useContext(UserContext);
    const nombreUsuario = user ? user.name : 'Nombre no disponible';
    return (
        <>
            <div className={stylev.navbar}>
                <header className={stylev.containerHeder}>
                    <h2 className={stylev.h2}>
                        <img className={stylev.imgLogo} src={logo1} alt="Logo"/>
                        <label className={stylev.nomEmpresa}>Dogsano</label>
                    </h2>
                    <div className={stylev["user-wrapper"]}>
                        <img className={stylev.navimg} src={vaterinaria} width="45rem" height="45rem" alt=""/>
                        <div>
                            <h4 className={stylev.menuSh4}>{nombreUsuario}</h4>
                            <small>Veterinario</small>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}

export default MenuVeterinario;