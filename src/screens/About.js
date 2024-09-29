import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow flex p-8 px-12">
        <div class="py-8 mx-auto max-w-screen-xl px-6 my-auto">
          <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-white">
            About
          </h2>
          <div class="pt-8 text-left border-t border-gray-700">
            <p class="text-disabled text-2xl mb-4">
              We'll keep it brief: amberAI serves to streamline communication with
              generative AI. You shouldn't have to type 
              out a tedious message every time you wanna communicate with ChatGPT
               -- you should be able to voice your thoughts and instantly 
              get a reply. Such a minuscule optimization can help improve 
              day-to-day life for nearly everyone, from the physically disabled person 
              who can't use a keyboard to the average Joe who wants to shave 
              a few minutes of downtime off.
            </p>
            <p class="text-disabled text-2xl mb-4">
              Our project boasts real-time speech-to-text, AI communication, and 
              image analysis capabilities. Your audio and video is analyzed by an AI 
              agent, which then communicates with you <b> in your native tongue </b>.
              We currently support twelve of the most spoken languages in the world, including 
              but not limited to English, Spanish, Mandarin, and Hindi.
            </p>
            <p class="text-disabled text-2xl mb-4">
              Want to get started? Navigate to the home screen and click on the<i> talk with Amber </i>
              bullet. Just make sure you have a working microphone and webcam, and you'll be good to go. Have fun!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
