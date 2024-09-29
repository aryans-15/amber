import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="flex flex-col h-screen bg-primary text-font">
      <Header />
      <div className="flex-grow flex p-8">
        <div className="flex flex-col">
          <div className="text-disabled text-2xl w-[60%] space-y-8">
            <p className="text-font text-9xl font-bold">About amberVR</p>
            <p>
              At amberVR, our mission is to benefit individuals who are blind or
              visually impaired by providing innovative solutions for safe and
              confident navigation. Through utilizing a VR headset and object
              detection software to deliver real-time narration of obstacles and
              surroundings, we aim to envoke a more confident sense of
              navigation in those in need of it.
            </p>
            <p>
              Our project boasts powerful up to date capabilities ensuring its
              reliability, including quick response-times, range versatility,
              and custom user preferences. Coupled with the functionalities of
              augmented reality and machine learning, our project is designed to
              provide users with only the most accurate and useful information.
            </p>
            <p>
              Our team of four from Centennial High School have been in close
              contact with the visually impaired. Being aware of the unique
              challenges faced by them, we strive to assist them in any way
              possible. That's how we initially came up with this idea, thinking
              of ways to physically benefit our school. Driven by a shared
              commitment to contribute to our community through an impactful
              project, we are continuously looking for ways to improve this
              technology through the addition of more features and improved
              accuracy/speed.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
