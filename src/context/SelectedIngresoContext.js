import React, { createContext, useState } from 'react';

const SelectedIngresoContext = createContext();

export const SelectedIngresoProvider = ({ children }) => {
    const [selectedIngresoId, setSelectedIngresoId] = useState(null);

    return (
        <SelectedIngresoContext.Provider value={{ selectedIngresoId, setSelectedIngresoId }}>
            {children}
        </SelectedIngresoContext.Provider>
    );
};

export default SelectedIngresoContext;