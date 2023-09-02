import React from 'react';

const AuthContext = React.createContext<AuthContext | null>(null);
interface AuthContext {
    auth: any
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = React.useState(null);

    return (
        <AuthContext.Provider
            value={{ auth }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default (): AuthContext => {
    const context = React.useContext(AuthContext);
    if (!context) throw new Error("ERROR CONTEXT");

    return context
}