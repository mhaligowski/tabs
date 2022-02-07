import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";

import { ShareWidget } from "./share/widget";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAApm4gMMg7DGIpM6kZH98Xx42oFLH9O-8",
  authDomain: "tabs-331912.firebaseapp.com",
  projectId: "tabs-331912",
  storageBucket: "tabs-331912.appspot.com",
  messagingSenderId: "13558635774",
  appId: "1:13558635774:web:21f18b0d19d09abbd6d9af",
};

const app = initializeApp(firebaseConfig);
console.log(app);

const App = () => {
  const tabulature = useSelector((state: any) => state.tabulature);

  return (
    <div className={clsx("container", "mx-auto", "px-4")}>
      <section className={clsx("mx-auto", "my-20")}>
        <h1
          className={clsx(
            "h-12",
            "pb-14",
            "text-black",
            "text-center",
            "text-7xl"
          )}
        >
          Tabulatures editor
        </h1>
      </section>

      <section>
        <div id="svg" className="grid place-items-center" />
      </section>

      <section>
        <ShareWidget />
      </section>

      <footer className="border-solid border-t-2 border-gray-400 mt-6">
        tabs.mhlg.io
      </footer>
    </div>
  );
};

export { App };
