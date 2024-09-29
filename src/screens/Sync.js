import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SyncStart from "../components/SyncStart";
import SyncConnect from "../components/SyncConnect";
import Log from "../components/Log";

const Sync = () => {
  const [currentStep, setCurrentStep] = useState(0);
  // const steps = [<SyncStart onNext={() => setCurrentStep(1)} />, <SyncConnect onNext={() => setCurrentStep(2)} />, <Log />];
  const steps = [<Log />];

  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-[50%] h-[70%] border-4 border-secondary flex flex-col p-8 items-center">
          {steps[currentStep]}
          {currentStep < steps.length - 1 && (
            <button
              className="bg-secondary text-font p-4 text-4xl rounded-lg w-[80%] hover:bg-hoverc duration-300 mb-8 mt-8"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          )}
          <div className="flex space-x-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${currentStep === index ? 'bg-secondary' : 'border-2 border-secondary'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sync;
