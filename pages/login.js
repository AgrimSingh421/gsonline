import { useState } from "react";
import Link from "next/link";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      M.toast({ html: `Welcome ${result.user.displayName}`, classes: "green" });
    } catch (err) {
      M.toast({ html: `${err.message}`, classes: "red" });
    }
  };
  return (
    <div className="container center">
      <h3>Please Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn #263238 blue-grey darken-4" disabled={!email || !password}>
          Login
        </button>
      </form>
    </div>
  );
}
