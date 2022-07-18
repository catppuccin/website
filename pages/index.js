import { useEffect, useState } from "react";
import GetPorts from "../utils/GetPorts";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center max-w-screen overflow-x-hidden min-w-screen min-h-screen font-mono p-3 bg-gray-700">
      <h2>ok</h2>
      <div className="grid grid-cols-3 gap-3 w-[100%] h-full">
        {props.ports
          .filter((port) => port.name !== ".github" && port.name !== "template")
          .map((port) => {
            return (
              <div
                className="flex cursor-pointer hover:-translate-y-1 flex-col p-3 rounded shadow-md hover:shadow-2xl hover:scale-[1.01] duration-500 justify-center items-left border-2 border-gray-500 h-full"
                key={port.name}
                onClick={() => {router.push(`/${port.name}`)}}
              >
                <h3>{port.name}</h3>
                <p>{port.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const ports = await GetPorts();
  return {
    props: {
      ports,
    },
  };
}
