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
                  How do I use amberAI?
                </h3>
                <p class="text-disabled">
                  Nevigate{" "}
                  <a
                    href="/chat"
                    className="text-secondary transition duration-300 hover:text-hoverc"
                  >
                    here
                  </a>{" "}
                  and allow camera and microphone when prompted. To start
                  recording your frames and audio, hold shift-v and let go when
                  done. Wait a moment before a text is generated and outputted
                  via TTS.
                </p>
              </div>
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
                  When the user presses shift-V, their speech is converted to
                  text until they let go. This text and the output from your
                  camera are sent to a custom API, which returns text that gets
                  narrated via ElevenLabs.{" "}
                  <i>
                    The actual process is a little more complicated, but that's
                    basically the gist of it!{" "}
                  </i>
                </p>
              </div>
            </div>
            <div>
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
                  What are some questions I can ask?
                </h3>
                <p class="text-disabled">
                  Amber is a universal AI -- you can ask it basically anything
                  you want. Whether you're asking how much caffeine is in a Red
                  Bull or what color your hair is, Amber will quickly reply!
                  Just make sure your audio and camera work.
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
                  Amber presents users with the opportunity to customize their
                  primary language, audio playback speed, and output voice tone.
                  All of these features can be found{" "}
                  <a
                    href="/settings"
                    className="text-secondary transition duration-300 hover:text-hoverc"
                  >
                    here
                  </a>
                  .
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
