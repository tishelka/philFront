import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.sass";

export const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setaddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isLogin, setLogin] = useState<boolean>(false);
  const nav = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/system/register/",
        {
          email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          address,
          password,
          password2,
        }
      );

      if (response.status === 201) {
        const userId = response.data.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", response.data.auth_token);
        localStorage.setItem("email", email);
        alert("Registration successful!");
        nav("main");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  const handleLogIn = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/system/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        const userId = response.data.user_id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", response.data.auth_token);
        localStorage.setItem("email", email);
        alert("Login successful!");
        nav("main");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="formOptions">
        <p onClick={() => setLogin(true)}>Log In</p>
        <p onClick={() => setLogin(false)}>Sign In</p>
      </div>
      <div className="inputs">
        <div className="input-option">
          <h2 className="option-text">Email</h2>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
          />
        </div>
        {isLogin == false ? (
          <>
            <div className="input-option">
              <h2 className="option-text">First Name</h2>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-option">
              <h2 className="option-text">Last Name</h2>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-option">
              <h2 className="option-text">Phone number</h2>
              <input
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-option">
              <h2 className="option-text">Address</h2>
              <input
                required
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-option">
              <h2 className="option-text">Password</h2>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="input-option">
              <h2 className="option-text">Repeat Password</h2>
              <input
                required
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="custom-input"
              />
            </div>
          </>
        ) : (
          <>
            <div className="input-option">
              <h2 className="option-text">Password</h2>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-input"
              />
            </div>
          </>
        )}
      </div>
      <div className="buttons">
        <button onClick={handleSignIn} className="sign-button">
          Sign In
        </button>
        <button onClick={handleLogIn} className="sign-button">
          Log In
        </button>
      </div>
    </div>
  );
};
