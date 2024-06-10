import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
return useContext(AuthContext);
};

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);

const login = (userData) => {
    setUser(userData);
};

const logout = () => {
    setUser(null);
};

return (
    <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};