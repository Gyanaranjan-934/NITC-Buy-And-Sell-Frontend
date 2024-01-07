import React from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation after a delay (e.g., 1000 milliseconds)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, []);
  const refForm = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_af19r9r",
        "template_6ef5h3i",
        refForm.current,
        "ukqBPcE8joCdgoKwA"
      )
      .then(
        () => {
          toast.success("Message successfully sent!"); // Display a success toast
          window.location.reload(false);
        },
        () => {
          toast.error("Failed to send the message, please try again"); // Display an error toast
        }
      );
  };

  return (
    <div className={`fade-in ${isVisible ? "active" : ""}`}>
      <div className="bg-gray-100 mt-4">
        <div className="container mx-auto py-16 w-[100vw] h-[85vh]">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions or feedback? Feel free to reach out to us.
          </p>
          <div className="max-w-md mx-auto mt-16">
            <form ref={refForm} onSubmit={sendEmail} id="sendform">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className="w-full sm:w-1/2 md:w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className="w-full sm:w-1/2 md:w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div className="mb-6 mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 border border-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition-all duration-300 ease-in-out"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
