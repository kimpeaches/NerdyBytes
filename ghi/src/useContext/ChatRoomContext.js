import { createContext, useContext } from "react";

const ChatRoomContext = createContext();

export const useChatRoomContext = () => {
    return useContext(ChatRoomContext);
};

export const ChatRoomProvider = ({ children, value }) => {
    return (
        <ChatRoomContext.Provider value={value}>
            {children}
        </ChatRoomContext.Provider>
    );
};
