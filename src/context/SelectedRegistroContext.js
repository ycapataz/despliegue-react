// context/SelectedRegistroClinicoContext.js
import { createContext, useState } from 'react';

const SelectedRegistroClinicoContext = createContext();

export const SelectedRegistroClinicoProvider = ({ children }) => {
    const [selectedRegistroClinicoId, setSelectedRegistroClinicoId] = useState(null);

    return (
        <SelectedRegistroClinicoContext.Provider value={{ selectedRegistroClinicoId, setSelectedRegistroClinicoId }}>
            {children}
        </SelectedRegistroClinicoContext.Provider>
    );
};

export default SelectedRegistroClinicoContext;