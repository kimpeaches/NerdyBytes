import { useState } from "react";
import Chat from "../../../pages/Chat/ChatPage";

export default function ChatFlyover() {
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = () => setIsOpen(!isOpen);

    return (
        <div id="chat-flyover" style={{ zIndex: 3, position: "relative" }}>
            <button onClick={handleChange}>
                {isOpen ? "Close" : "Open"} Chat
            </button>
            <dialog open={isOpen}>
                <Chat></Chat>
            </dialog>
        </div>
    );
}
