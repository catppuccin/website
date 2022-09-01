import GetPorts from "../lib/getPorts";
import { FiStar } from "react-icons/fi";
import { VscRepoForked } from "react-icons/vsc";
import getIcon from "../lib/getIcon";
import getIconColor from "../lib/getIconColor";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from "next/link"
import Layout from "../components/Layout";

export default function Home(props: any) {
  const [filteredPorts, setFilteredPorts] = useState(
    props.ports ? props.ports : []
  );
  const [parent] = useAutoAnimate<HTMLDivElement>({
    duration: 500,
  })

  return (
    <Layout>

    <div className="flex flex-col justify-start items-center max-w-screen overflow-x-hidden min-w-screen min-h-screen font-inter p-4 bg-base gap-4 h-max max-h-max overflow-y-hidden">
      <div className="flex w-[100%] lg:w-2/3 md:w-[80%] justify-center items-center">
        <SearchBar ports={props.ports} setFilteredPorts={setFilteredPorts} />
      </div>
      <div ref={parent} className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 w-[100%] lg:w-2/3 md:w-[80%]">
        {filteredPorts
          .filter(
            (port: any) => port.name !== ".github" && port.name !== "template"
          )
          .map((port: any) => {
            return (
              <Link href={`/ports/${port.name}`}
                    key={port.name}
              >
                <a>
                  <div
                    className="bg-crust flex cursor-pointer hover:-translate-y-1 flex-col py-6 rounded-lg drop-shadow-md hover:drop-shadow-2xl hover:scale-[1.01] duration-300 items-center justify-evenly gap-3 max-h-fit h-fit"
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
                </a>
              </Link>
            );
          })}
      </div>
    </div>
    </Layout>
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