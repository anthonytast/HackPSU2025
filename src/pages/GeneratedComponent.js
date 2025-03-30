import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as Babel from "@babel/standalone"; // Import Babel for JSX transpilation

export default function GeneratedComponent() {
  const [generatedComponent, setGeneratedComponent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function generateReactComponentCode() {
      const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;
      if (!apiKey) {
        setError("API key is missing.");
        setLoading(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        Generate a simple React functional component that displays a button with the text "Click Me".
        When the button is clicked, it should log "Button was clicked!" to the console.
        Return the component code as a string. Use an arrow function syntax.
        Do not include any surrounding HTML or explanations. The string should start with 'const' or 'function'.
      `;

      try {
        const result = await model.generateContent({
          contents: [{ parts: [{ text: prompt }] }],
        });

        const componentCode = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!componentCode) {
          throw new Error("No component code generated.");
        }

        console.log("Generated Component Code:", componentCode);

        // Transpile JSX to plain JavaScript using Babel
        const transpiledCode = Babel.transform(componentCode, {
          presets: ["react"],
        }).code;

        console.log("Transpiled Component Code:", transpiledCode);

        if (!transpiledCode) {
          console.error("Transpiled code is invalid or empty:", transpiledCode);
          setError("Failed to transpile the generated component.");
          setLoading(false);
          return;
        }

        // Extract the component name dynamically
        const componentNameMatch = componentCode.match(/const\s+(\w+)\s*=/);
        const componentName = componentNameMatch ? componentNameMatch[1] : "GeneratedComponent";

        // Dynamically create the React component
        const DynamicComponent = new Function(
          "React",
          `
          ${transpiledCode}
          return ${componentName}; // Dynamically return the correct component name
          `
        )(React);

        setGeneratedComponent(() => DynamicComponent);
      } catch (err) {
        console.error("Error generating component:", err);
        setError("Failed to generate component.");
      } finally {
        setLoading(false);
      }
    }

    generateReactComponentCode();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Generated Component</h1>
      {generatedComponent && <generatedComponent />}
    </div>
  );
}