import React, { useContext } from 'react';
import style from '../assets/css/avg_encabezado.module.scss';
import logo1 from '../assets/images/logo1.png';
import recepcinista from '../assets/images/recepcionista_perfil.jpg';
import 'bootstrap/scss/bootstrap.scss';
import UserContext from '../context/UserContext';

function Menu_recepcionista() {
    const { user } = useContext(UserContext);
    const nombreUsuario = user ? user.name : 'Nombre no disponible';
    console.log('Nombre recibido en Menu_recepcionista:',  nombreUsuario);
return (
    <>
    {/*Menu superior*/}
    <div className={style.navbar}>
    <header className={style.containerHeder}>
            <h2 className={style.h2}>
            <img className={style.imgLogo} src={logo1}/>
                <label className={style.nomEmpresa}>Dogsano</label>
            </h2>
            <div class={style["user-wrapper"]}>
                <img className={style.navimg} src={recepcinista} width="45rem"height="45rem" alt=""/>
                <div>
                    <h4 className={style.menuSh4}>{nombreUsuario}</h4>
                    <small>Recepcionista</small>
                </div>
            </div>
        </header>
    </div>
    </>
)
}

export default Menu_recepcionista;
