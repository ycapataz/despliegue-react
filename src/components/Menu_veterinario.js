import React from 'react'
import stylev from '../assets/css/avg_encabezado.module.scss';
import logo1 from '../assets/images/logo1.png';
import vaterinaria from '../assets/images/veterinaria_3.jpg';
import 'bootstrap/scss/bootstrap.scss';

function Menu_veterinario() {
return (
    <>
    {/*Menu superior*/}
    <div className={stylev.navbar}>
    <header className={stylev.containerHeder}>
            <h2 className={stylev.h2}>
            <img className={stylev.imgLogo} src={logo1}/>
                <label className={stylev.nomEmpresa}>Dogsano</label>
            </h2>
            <div class={stylev["user-wrapper"]}>
                <img className={stylev.navimg} src={vaterinaria} width="45rem"height="45rem" alt=""/>
                <div>
                    <h4 className={stylev.menuSh4}>Sared crespo Robles</h4>
                    <small>Veterinario</small>
                </div>
            </div>
        </header>
    </div>
    </>
)
}

export default Menu_veterinario;
