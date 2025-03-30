import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Head from "next/head";
import styles from "@/styles/Gemchat.module.css";

export default function Gemchat() {
    const [message, setMessage] = useState(""); // State for the current input message
    const [chatHistory, setChatHistory] = useState([]); // State for the chat history
    const [isLoading, setIsLoading] = useState(false); // State to show loading animation

    const sendChat = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        if (!message.trim()) return; // Do nothing if the message is empty

        // Add the user's message to the chat history
        setChatHistory((prev) => [...prev, { sender: "User", text: message }]);
        setMessage(""); // Clear the input message
        setIsLoading(true); // Show loading animation

        try {
            // Call the AI API to generate a response
            const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_AI_API_KEY }); // Initialize the AI client
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: message,
            });

            // Add the AI's response to the chat history
            setChatHistory((prev) => [...prev, { sender: "AI", text: response.text }]);
        } catch (error) {
            console.error("Error generating AI response:", error);
            setChatHistory((prev) => [...prev, { sender: "AI", text: "Error: Unable to generate response." }]);
        } finally {
            setIsLoading(false); // Hide loading animation
        }
    };

    return (
    <>
        <Head>
          <title>Gemchat</title>
          <meta name="description" content="Chat with your friends" />
        </Head>
        <div className={styles.container}>
          <h1 className={styles.title}>Gemchat</h1>
          <div className={styles.chatWindow}>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={chat.sender === "User" ? styles.userMessage : styles.aiMessage}
              >
                <strong>{chat.sender}:</strong> {chat.text}
              </div>
            ))}
            {isLoading && (
              <div className={styles.loading}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            )}
          </div>
          <form className={styles.inputBar} onSubmit={sendChat}>
            <input
              type="text"
              id="message"
              name="message"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>Send</button>
          </form>
        </div>
    </>
    );
}