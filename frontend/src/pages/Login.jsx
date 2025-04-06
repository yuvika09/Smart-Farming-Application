import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8000/api/users/login/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Store the authentication token and username
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("username", data.username);

  //       // Redirect to home page
  //       window.location.href = "/";
  //     } else {
  //       alert(`Login failed: ${data.message || "Invalid credentials"}`);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("An error occurred. Please try again later.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // ================== DUMMY FRONTEND TESTING ==================
    // Mock successful login (comment out the real API call)
    console.log("DUMMY LOGIN ATTEMPT:", { email, password });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response data
    const dummyUsers = [
      {
        email: "user@example.com",
        password: "password123",
        username: "demo_user",
      },
      { email: "admin@example.com", password: "admin123", username: "admin" },
    ];

    const matchedUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("token", "dummy_token_xyz123");
      localStorage.setItem("username", matchedUser.username);
      alert("DUMMY LOGIN SUCCESS! Redirecting...");
      window.location.href = "/";
    } else {
      alert(
        "DUMMY ERROR: Invalid credentials (try user@example.com/password123)"
      );
    }
    // ================== END DUMMY TESTING ==================

    /* REAL API CALL (commented out for testing)
    try {
      const response = await fetch("http://localhost:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      // ... rest of your real API handling code
    */
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
