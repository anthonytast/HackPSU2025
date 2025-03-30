// src/pages/Gemchat.js
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Head from "next/head";
import styles from "@/styles/Gemchat.module.css"; // Import CSS Module

// Simple Chat Bubble Component using CSS Modules
function ChatBubble({ sender, text }) {
    const isUser = sender === "User";
    return (
        <div className={`${styles.messageRow} ${isUser ? styles.userRow : styles.aiRow}`}>
            <div className={`${styles.messageBubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
                <strong className={styles.messageSender}>{sender}</strong>
                <pre className={styles.messageContent}>{text}</pre>
            </div>
        </div>
    );
}

export default function Gemchat() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [latestAICode, setLatestAICode] = useState("");
    const [error, setError] = useState(null);

    const chatContainerRef = useRef(null);

    // Scroll chat history to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // --- AI Prompt Template (Same as before) ---
    const getFullPrompt = (userRequest, currentCode = null, currentCss = null) => `
You are an expert React developer. Generate a single React functional component and associated CSS based on the user's request.

**RULES:**
1.  **Output Format:** Respond ONLY with the code, using Markdown code fences. First provide the React JSX code, then the CSS. Use 'jsx' for React and 'css' for CSS. Example:
    \`\`\`jsx
    // React code here...
    export default GeneratedComponent;
    \`\`\`
    \`\`\`css
    /* CSS code here... */
    \`\`\`
2.  **React Component:**
    * Create a single functional component named 'GeneratedComponent'.
    * Use React hooks (useState, useEffect, etc.) if necessary.
    * Do NOT include imports for React itself (e.g., import React from 'react'). Assume it's available.
    * Export the component as default: 'export default GeneratedComponent;'
3.  **CSS:**
    * Provide CSS rules that style the component appropriately.
    * Use standard CSS. Do not use CSS Modules syntax (e.g., styles.myClass). Use regular class names or element selectors.
4.  **Iteration:** If currentCode and currentCss are provided, modify them based on the new prompt. Otherwise, generate from scratch based on the prompt.

**Current Code (if refining):**
\`\`\`jsx
${currentCode || '// No existing code provided'}
\`\`\`

**Current CSS (if refining):**
\`\`\`css
${currentCss || '/* No existing CSS provided */'}
\`\`\`

**User Request:** ${userRequest}

**Output:**
`;
    // --- End AI Prompt Template ---

    const sendChat = async (e) => {
        e.preventDefault();
        const userMessage = message.trim();
        if (!userMessage || isLoading) return;

        setError(null);
        setLatestAICode("");
        setChatHistory((prev) => [...prev, { sender: "User", text: userMessage }]);
        setMessage("");
        setIsLoading(true);

        const finalPrompt = getFullPrompt(userMessage);

        try {
            if (!process.env.NEXT_PUBLIC_AI_API_KEY) {
                throw new Error("AI API key is not configured.");
            }
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_AI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(finalPrompt);
            const response = await result.response;
            const aiResponseText = await response.text();

            console.log("--- Generated Code ---");
            console.log(aiResponseText);
            console.log("----------------------");

            setChatHistory((prev) => [...prev, { sender: "AI", text: aiResponseText }]);
            setLatestAICode(aiResponseText);

        } catch (err) {
            console.error("Error generating AI response:", err);
            const errorMessage = err.message || "Error: Unable to generate response.";
            setError(errorMessage);
            setChatHistory((prev) => [...prev, { sender: "AI", text: `Error: ${errorMessage}` }]);
            setLatestAICode("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <>
        <Head>
          <title>React Code Generator</title>
          <meta name="description" content="Generate React components with AI" />
          {/* No Tailwind script needed here */}
        </Head>

        {/* Main Layout Container */}
        <div className={styles.container}>

            {/* Sidebar (Chat Interface) */}
            <div className={styles.sidebar}>
                {/* Sidebar Header */}
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.sidebarTitle}>Chat & Generate</h1>
                </div>

                {/* Chat History Area */}
                <div ref={chatContainerRef} className={styles.chatHistory}>
                    {chatHistory.map((chat, index) => (
                        <ChatBubble key={index} sender={chat.sender} text={chat.text} />
                    ))}
                    {isLoading && (
                         <div className={`${styles.messageRow} ${styles.aiRow}`}>
                            <div className={`${styles.messageBubble} ${styles.aiBubble} ${styles.loadingBubble}`}>
                                AI is thinking...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className={styles.inputArea}>
                    <form className={styles.inputForm} onSubmit={sendChat}>
                        <input
                            type="text"
                            placeholder="Describe the component..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            disabled={isLoading}
                            className={styles.inputField}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={styles.sendButton}
                        >
                            {isLoading ? '...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div> {/* End Sidebar */}


            {/* Main Content Area (Code Display) */}
            <div className={styles.mainContent}>
                 {/* Content Display Area */}
                 <div className={styles.contentArea}>
                    {/* Loading Overlay */}
                    {isLoading && (
                        <div className={styles.loadingOverlay}>
                            <span className={styles.loadingText}>Generating Code...</span>
                        </div>
                    )}

                    {/* Error Message Display */}
                    {error && (
                        <div className={styles.errorDisplay}>
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    {/* Code Display or Placeholder */}
                    {!isLoading && latestAICode && (
                        <pre className={styles.codeDisplay}>
                             {latestAICode}
                        </pre>
                    )}

                    {!isLoading && !latestAICode && !error && (
                        <div className={styles.placeholder}>
                            <p>Generated code will appear here after you send a description using the chat panel.</p>
                        </div>
                    )}
                 </div>

            </div> {/* End Main Content */}

        </div> {/* End Main Layout Container */}
    </>
    );
}