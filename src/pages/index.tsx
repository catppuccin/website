import Head from "next/head";
import { useRouter } from "next/router";
import GetPorts from "../lib/getPorts";
import { FiCode, FiStar } from "react-icons/fi";
import { VscRepoForked } from "react-icons/vsc";
import getIcon from "../lib/getIcon";
import getIconColor from "../lib/getIconColor";

export default function Home(props: any) {
  const router = useRouter();
  const color = "text";
  return (
    <div className="flex flex-col justify-center items-center max-w-screen overflow-x-hidden min-w-screen min-h-screen font-epilogue p-4 bg-base">
      <h2>ok</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 w-[100%] lg:w-2/3 md:w-[80%] h-full">
        {props.ports
          .filter(
            (port: any) => port.name !== ".github" && port.name !== "template"
          )
          .map((port: any) => {
            return (
              <div
                className="bg-crust flex cursor-pointer hover:-translate-y-1 flex-col py-6 rounded-lg drop-shadow-md hover:drop-shadow-2xl hover:scale-[1.01] duration-300 items-center justify-evenly gap-3 h-full"
                key={port.name}
                onClick={() => {
                  router.push(`/${port.name}`);
                }}
              >
                <h3 className=" text-zinc-300">{port.name}</h3>
                <div
                  className={`flex text-${getIconColor(
                    port.name
                  )} justify-center items-center bg-base rounded-full p-3 fill-${getIconColor(
                    port.name
                  )}`}
                >
                  {getIcon(port.name)}
                </div>
                <div className="flex justify-center items-center gap-4 w-full">
                  <p className="text-sm text-zinc-300 flex gap-1 justify-center">
                    <FiStar />
                    {port.stargazers_count}
                  </p>
                  <p className="text-sm text-zinc-300 flex gap-1 justify-center">
                    <VscRepoForked />
                    {port.forks_count}
                  </p>
                </div>
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
