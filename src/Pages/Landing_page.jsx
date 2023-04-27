import React from "react";
import Navigation_Bar from "../Components/Navigation_Bar";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../Animation";

export default function Landing_page() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="layout">
        <Navigation_Bar name="Login" />
        <main>
          <div className="main-content">
            <div className="left-section">
              <h1>Get Job And Internship With Just One Click</h1>
              <p>
                The jobs and internship opportunity of your field of interest in
                your fingertips.
              </p>
              <div className="button">
                <button onClick={() => navigate("/Login")}>Lets Begin</button>
              </div>
            </div>
            <div className="right-section">
              {/* random image from unsplash */}
              {/* <img
                src="https://source.unsplash.com/random/400x400"
                alt="random image"
              /> */}
              <img src="public\Images\Scene - 1.png" alt="img" />
            </div>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}
