import React from "react";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div>
      <div className="flex justify-around my-5">
        <h1 className="text-primary font-bold text-2xl">pure learn</h1>
        <div className="flex ">
          <Link
            to="/auth/login"
            className=" mx-5 border-2 bg-primary rounded-lg p-2 text-white hover:bg-white hover:text-primary hover:border-primary transition-all "
          >
            <button>Log In</button>
          </Link>
          <Link
            to="/auth/signup"
            className=" border-2 bg-primary rounded-lg p-2 text-white hover:bg-white hover:text-primary hover:border-primary transition-all "
          >
            <button>Signup </button>
          </Link>
        </div>
      </div>

      <div className="text-center flex flex-col justify-center items-center h-[50vh]">
        <h1 className="font-[900] text-primary text-5xl wow backInUp">
          Your Personalized Path to Productivity
        </h1>
        <p className="w-[50vw] mt-6">
          Organize your studies, track progress, and achieve goals with
          AI-powered precision and personalized insights.
        </p>
        <Link to="/auth/signup">
          <button className="bg-primary p-2 text-white rounded-lg mt-5 text-xl font-[500] border hover:bg-white hover:text-primary hover:border-primary transition-all">
            lets Get Started
          </button>
        </Link>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#9B17B3"
          fillOpacity="1"
          d="M0,32L30,32C60,32,120,32,180,48C240,64,300,96,360,122.7C420,149,480,171,540,192C600,213,660,235,720,229.3C780,224,840,192,900,160C960,128,1020,96,1080,101.3C1140,107,1200,149,1260,160C1320,171,1380,149,1410,138.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
