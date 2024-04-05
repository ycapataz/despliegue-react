import React from 'react'
import style from '../assets/css/avg_encabezado.module.scss';
import logo1 from '../assets/images/logo1.png';
import almacenista from '../assets/images/almacenista.jpg';
import 'bootstrap/scss/bootstrap.scss';

function Menu_almacenista() {
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
                <img className={style.navimg} src={almacenista} width="45rem"height="45rem" alt=""/>
                <div>
                    <h4 className={style.menuSh4}>CARLOS ANDRES HERRERA DIAZ</h4>
                    <small>ALMACENISTA</small>
                </div>
            </div>
        </header>
    </div>
    </>
)
}

export default Menu_almacenista;
