import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FAQ() {
  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow flex p-8 px-12">
        <div class="py-8 mx-auto max-w-screen-xl px-6 my-auto">
          <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-white">
            Frequently asked questions
          </h2>
          <div class="grid pt-8 text-left border-t border-gray-700 grid-cols-2">
            <div className="mr-4">
              <div class="mb-10">
                <h3 class="flex items-center mb-4 text-lg font-medium text-white">
                  <svg
                    class="flex-shrink-0 mr-2 w-5 h-5 text-disabled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Who can use this app?
                </h3>
                <p class="text-disabled">
                  While our project is heavily catered towards the visually
                  impaired, anyone is free to try and test out our application.
                  It's free to use and we would love to receive your feedback!
                </p>
              </div>
              <div class="mb-10">
                <h3 class="flex items-center mb-4 text-lg font-medium text-white">
                  <svg
                    class="flex-shrink-0 mr-2 w-5 h-5 text-disabled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  What devices are compatible?
                </h3>
                <p class="text-disabled">
                  Any VR headset that supports augmented reality is compatible
                  with our application. (ex. Oculus VR lineup, Apple Vision Pro,
                  etc).
                </p>
              </div>
              <div class="mb-10">
                <h3 class="flex items-center mb-4 text-lg font-medium text-white">
                  <svg
                    class="flex-shrink-0 mr-2 w-5 h-5 text-disabled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  How do I pair my device to the app?
                </h3>
                <p class="text-disabled">
                  Our website provides a step by step guide to pair your device{" "}
                  <a href="/sync" className="text-font underline">
                    here.
                  </a>
                </p>
              </div>
            </div>
            <div>
              <div class="mb-10">
                <h3 class="flex items-center mb-4 text-lg font-medium text-white">
                  <svg
                    class="flex-shrink-0 mr-2 w-5 h-5 first-letter:text-disabled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  How does the project work?
                </h3>
                <p class="text-disabled">
                  Our project takes the frames from the camera of the vr and
                  passes it into openai, which generates the photo description.
                  It will then send the text to ElevenLabs for it to output via
                  TTS.
                </p>
              </div>
              <div class="mb-10">
                <h3 class="flex items-center mb-4 text-lg font-medium text-white">
                  <svg
                    class="flex-shrink-0 mr-2 w-5 h-5 text-disabled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  What objects does the application detect?
                </h3>
                <p class="text-disabled">
                  We have different detection modes (low, medium high) that
                  corresponds with the
                </p>
              </div>
              <div class="mb-10">
                <h3 class="flex items-center mb-4 text-lg font-medium text-white">
                  <svg
                    class="flex-shrink-0 mr-2 w-5 h-5 text-disabled"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  How can you customize it?
                </h3>
                <p class="text-disabled">
                  We offer a variety of changes users can make, including the
                  option to change the voice for the TTS, alter the specificity
                  and speed of the response, and many more that can be accessed
                  and changed via settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;
