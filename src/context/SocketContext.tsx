import React, { useContext, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { createContext, useMemo } from 'react';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const socket = useMemo(() => io('http://localhost:5000'), []);

    // useEffect(() => {
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
