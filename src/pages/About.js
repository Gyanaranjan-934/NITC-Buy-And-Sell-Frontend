import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation after a delay (e.g., 1000 milliseconds)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? "active" : ""}`}>
      <div className="w-[100vw] h-[85vh] flex flex-col justify-center items-center text-center text-xl">
        <h1 className="text-4xl font-bold mb-16">
          About Our College Marketplace
        </h1>
        <p className="max-w-md">
          Our online platform provides a convenient and secure way for members
          of the college community to buy and sell goods. Whether you're looking
          to find great deals or declutter your belongings, our marketplace
          connects you with your fellow students and faculty.
        </p>
        <br />
        <br />
        <p className="max-w-md">
          It has been created by the following team members as a course project
          for the institute:
        </p>
        <br />
        <ul className="list-disc pl-6 max-w-md">
          <li className="mb-1">Gyanaranjan Sahoo (M210676CA)</li>
          <li className="mb-1">Indrajeet Nayak (M210673CA)</li>
          <li className="mb-1">Joel Lalrinnunga Ralte (M210694CA)</li>
          <li className="mb-1">Junaid Ansari (M210662CA)</li>
          <li className="mb-1">Karan Sachinkumar Satish (M210687CA)</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

// return (
//   <div className="w-screen h-screen flex flex-col justify-center items-center text-center text-xl mt-[-40px]">
//     <h1 className="text-4xl font-bold mb-16">
//       About Our College Marketplace
//     </h1>
//     <p className="max-w-md">
//       Our online platform provides a convenient and secure way for members of
//       the college community to buy and sell goods. Whether you're looking to
//       find great deals or declutter your belongings, our marketplace connects
//       you with your fellow students and faculty.
//     </p>
//     <br />
//     <br />
//     <p className="max-w-md">
//       It has been created by the following members as a course project for the
//       institute:
//     </p>
//     <br />
//     <ul className="list-disc pl-6 max-w-md">
//       <li className="mb-1">Gyanaranjan Sahoo (M210676CA)</li>
//       <li className="mb-1">Indrajeet Nayak (M210673CA)</li>
//       <li className="mb-1">Joel Lalrinnunga Ralte (M210694CA)</li>
//       <li className="mb-1">Junaid Ansari (M210662CA)</li>
//       <li className="mb-1">Karan Sachinkumar Satish (M210687CA)</li>
//     </ul>
//   </div>
// );
