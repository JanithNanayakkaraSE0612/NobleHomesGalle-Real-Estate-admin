import React, { useState } from 'react';
import { BiChevronLeft, BiSearch, BiSolidSend } from "react-icons/bi";

const Message = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const contacts = [
        { name: 'John Doe', avatar: 'https://via.placeholder.com/40' },
        { name: 'Jane Smith', avatar: 'https://via.placeholder.com/40' },
        { name: 'Alice Johnson', avatar: 'https://via.placeholder.com/40' },
        { name: 'Bob Brown', avatar: 'https://via.placeholder.com/40' },
    ];

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setMessages([]);
    };

    const handleSendMessage = () => {
        if (message && selectedContact) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { contact: 'You', text: message },
            ]);
            setMessage('');
            setIsTyping(false);
        }
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        if (!isTyping) {
            setIsTyping(true);
        }

        setTimeout(() => {
            setIsTyping(false);
        }, 1000);
    };

    const handleBackToContactList = () => {
        setSelectedContact(null);
    };

    return (
        <div className="flex flex-col h-screen bg-white p-4 rounded-lg">
            {/* Search and Header Section */}
            <div className="w-full p-4 bg-[#AAEAEA] shadow-md flex justify-between items-center rounded-lg">
                <div className="flex items-center w-full">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-80 p-2 pl-10 rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <BiSearch className="absolute left-3 top-2.5 text-gray-500" />
                    </div>

                    {/* Show profile and typing indicator only on mobile devices */}
                    {selectedContact && (
                        <div className="hidden md:flex flex-col items-start ml-16">
                            <div className="flex items-center">
                                <img
                                    src={selectedContact.avatar}
                                    alt={selectedContact.name}
                                    className="w-14 h-14 rounded-full mr-2"
                                />
                                <span className="text-black">{selectedContact.name}</span>
                            </div>
                            {isTyping && (
                                <div className="text-red-500 text-sm mt-1">
                                    Typing message...
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Back Button visible only on mobile devices */}
                {selectedContact && (
                    <button
                        onClick={handleBackToContactList}
                        className="text-black flex items-center md:hidden"
                    >
                        <BiChevronLeft className="mr-1 h-8 w-8" />
                    </button>
                )}
            </div>

            {/* Contacts and Messages Section */}
            <div className="flex flex-1 bg-white mt-4">
                <div className={`w-full md:w-1/4 p-4 border-r border-gray-300 bg-[#D9D9D9] overflow-y-auto ${selectedContact ? 'hidden md:block' : ''}`}>
                    <ul className="list-none">
                        {contacts
                            .filter(contact =>
                                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((contact, index) => (
                                <li
                                    key={index}
                                    className="flex items-center p-2 hover:bg-gray-200 cursor-pointer border-b-2 border-gray-400"
                                    onClick={() => handleContactClick(contact)}
                                >
                                    <img
                                        src={contact.avatar}
                                        alt={contact.name}
                                        className="w-14 h-14 rounded-full mr-2"
                                    />
                                    {contact.name}
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="flex-1 flex flex-col p-4 bg-white">
                    {selectedContact ? (
                        <div className="flex-1 flex flex-col">
                            <div className="border border-gray-300 p-2 flex-1 overflow-y-auto mb-4">
                                {messages
                                    .filter(msg => msg.contact === selectedContact.name || msg.contact === 'You')
                                    .map((msg, index) => (
                                        <div key={index} className={`mb-2 ${msg.contact === 'You' ? 'text-right' : 'text-left'}`}>
                                            {msg.contact === 'You' ? (
                                                <div className="bg-blue-400 text-white p-2 rounded-lg inline-block">
                                                    <strong>{msg.contact}:</strong> {msg.text}
                                                </div>
                                            ) : (
                                                <div className="bg-gray-300 p-2 rounded-lg inline-block">
                                                    <strong>{msg.contact}:</strong> {msg.text}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>

                            <div className="flex mt-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={handleTyping}
                                    className="w-full p-2 border border-gray-300 rounded mr-2 bg-[#C3C3C3] placeholder-white"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="p-2 bg-[#317AF0] text-white rounded flex items-center justify-center"
                                >
                                    <BiSolidSend className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Select a contact to start messaging.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
