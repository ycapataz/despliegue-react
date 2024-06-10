import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const RutaProtegida = ({ element, ...rest }) => {
    const { user } = useContext(UserContext);

    // Si el usuario está autenticado, renderiza el elemento proporcionado.
    // De lo contrario, redirige al componente de inicio de sesión.
    return user ? <Route {...rest} element={element} /> : <Navigate to="/iniciosesion" />;
};

export default RutaProtegida;
