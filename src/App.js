import React, { useState } from "react";
import "./App.css";
import largeLogo from './assets/large_logo.png';

const App = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://sheetdb.io/api/v1/tj13d2bdjs5fk?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setSuccessMessage("Thank you for subscribing!");
      setEmail("");  // Clear the email input after submission
    } catch (err) {
      setError("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={"div"}>
        <div className={"div2"}>
          <img alt="small logo" src={largeLogo} className="logo"/>
          {/* <div className={"div3"} onClick={}></div> */}
          <a href="mailto:info@ntshll.com" className="div3" >contact us</a>
        </div>
        <div className={"div4"}>Knowledge in a nutshell.</div>
        <div className={"div5"}>
          <div className={"div6"}>
            <img alt="large logo" src={largeLogo} className="largeLogo"/>
            <div className={"div7"}>Coming Soon</div>
          </div>
          {/* <div className={"div8"}>
            <input
              type="email" // Change to email type for better validation
              placeholder="Enter Email Address"
              className={"input"}
              value={email} // Bind the email state value
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
          </div> */}
        </div>
        <div className={"div9"}>
          <div className={"div10"}>
            The biggest ideas, without the clutter. Learn fast, share faster.
          </div>
          <div className={"div11"}>
            We're on a mission to organize and serve you the clearest, most concise, shareable insights—all in engaging, easy-to-digest formats.
            Learn all the biggest ideas in the world, without the distractions.
          </div>
        </div>
        <div className={"div12"}>
          <div className={"div13"}>Stay in the loop</div>
          <div className={"div14"}>
            <input
              type="email" // Change to email type
              placeholder="Enter Email Address"
              className={"input"}
              value={email} // Bind the email state value
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
            <button
              className={"button"}
              onClick={handleSubscribe} // Call handleSubscribe on button click
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Submitting..." : "Join Mailing List"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error message */}
            {successMessage && <div style={{ color: "green" }}>{successMessage}</div>} {/* Display success message */}
          </div>
        </div>
      </div>
      <div className="footer">
          Nutshell — All Rights Reserved — Talk to us at <a href="mailto:info@ntshll.com">info@ntshll.com</a> — Coming Soon 
      </div>
    </>
  );
};

export default App;
