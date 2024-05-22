import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserSignup } from "../redux/features/reducer/UserAuthSlice";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState('')

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(name===""){
  //     alert('name is required')
  //   }
  //   // Add your signup logic here
  //   const credentials = {
  //     name: name,
  //     email: email,
  //     password: password,
  //   };
  //   console.log(credentials);

  //   dispatch(UserSignup(credentials));
  //   navigate("/")
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Initialize an object to store error messages
    const errors = {};
  
    // Trim whitespace from the input values
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedCPassword = confirmPassword.trim();
  
    // Check if the name is empty
    if (!trimmedName) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  
    // Check if the email is empty and validate it with a simple regular expression
    if (!trimmedEmail) {
      setEmailError("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  
    // Check if the password is empty
    if (!trimmedPassword) {
      setPasswordError("Password is required");
    } else {
      setPasswordError(""); // Clear the password error message when the field is not empty
    }
  
    // Check if the password and confirm password match
    if (trimmedPassword !== trimmedCPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(""); // Clear the password matching error message when they match
    }
  
    // If there are errors, prevent form submission
    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedCPassword ||
      trimmedPassword !== trimmedCPassword
    ) {
      // Display error messages or handle them as needed (e.g., show them on the UI)
      alert('Validation errors:', errors);
    } else {
      // If no errors, proceed with signup logic
      const credentials = {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      };
      // alert(credentials);
  
      dispatch(UserSignup(credentials));
      navigate('/');
    }
  };
  
  

  return (
    <div className="container mt-5 ml-5">
      <h1>Sign Up</h1><br/>
      <p>Create your Account</p><br/>
        
        <form
          className=""
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={handleNameChange}
            />
            <p>{nameError}</p>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <p>{emailError}</p>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <p>{nameError}</p>
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <p>{confirmPasswordError}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
  );
};

export default SignupPage;
