import { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Signup.module.css";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [errorMessages, setErrorMessages] = useState([]); // State to manage multiple error messages

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = []; // Array to collect all error messages

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }

        if (password !== confirmPassword) {
            errors.push("Passwords do not match.");
        }

        if (errors.length > 0) {
            setErrorMessages(errors); // Update state with all error messages
            return;
        }

        // Clear error messages if all validations pass
        setErrorMessages([]);

        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);

        // Add further logic for form submission here
    };

    return (
    <>
        <Head>
          <title>Sign Up</title>
          <meta name="description" content="Create an account" />
        </Head>
        <div className={styles.container}>
          <h1 className={styles.title}>Sign Up</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Display all error messages */}
            {errorMessages.length > 0 && (
              <div className={styles.errorContainer}>
                {errorMessages.map((message, index) => (
                  <p key={index} className={styles.error}>{message}</p>
                ))}
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>
                Show Password
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
              </label>
            </div>
            <button type="submit" className={styles.button}>Sign Up</button>
          </form>
        </div>
    </>
    );
}