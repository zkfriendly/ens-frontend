import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !address) {
      setError("Please enter both an email and a wallet address.");
      return;
    }

    try {
      const response = await fetch("https://enss.zk.email/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          command: `Claim ENS name for address ${address} with resolver resolver.eth`,
          verifier: "0x51F15e1398f870cd8b0ff52D60e3D25aBdAE0D70",
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Something went wrong");
      }

      setMessage(
        "Success! Please check your email and reply to confirm your new ENS name."
      );
      setEmail("");
      setAddress("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Turn Your Email into an ENS Name</h1>
      <p className="description">
        Claim a username for your wallet. Enter your email and wallet address
        below to start. We'll send you an email to confirm.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Claim Your ENS Name</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
