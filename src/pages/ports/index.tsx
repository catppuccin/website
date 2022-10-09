import GetPorts from "../../lib/getPorts";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import { Card, Layout, SearchBar } from "../../components";
import LazyLoad from "react-lazy-load";

export default function Home(props: any) {
  const [filteredPorts, setFilteredPorts] = useState(
    props.ports ? props.ports : []
  );
  const [parent] = useAutoAnimate<HTMLDivElement>({
    duration: 500,
  });
  const router = useRouter();

  return (
    <Layout title="Ports">
      <div className="flex flex-col justify-start items-center max-w-screen overflow-x-hidden min-w-screen min-h-screen font-inter p-4 bg-base gap-4 h-max max-h-max overflow-y-hidden">
        <div className="flex w-[100%] lg:w-2/3 md:w-[80%] justify-center items-center">
          <SearchBar ports={props.ports} setFilteredPorts={setFilteredPorts} />
        </div>
        <div
          ref={parent}
          className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 w-[100%] lg:w-2/3 md:w-[80%]"
        >
          {filteredPorts
            .filter(
              (port: any) => port.name !== ".github" && port.name !== "template"
            )
            .map((port: any) => (
              <LazyLoad key={port.name}>
                <Card key={port.name} port={port} />
              </LazyLoad>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const ports = await GetPorts();

  const portsNamesNormalized: Record<string, string> = {
    nvim: "neovim",
  };

  const portsWithIcons = await Promise.all(
    ports.map(async (port: any) => {
      const portName = portsNamesNormalized[port.name] || port.name;
      const icon = await fetch(`https://simpleicons.org/icons/${portName}.svg`)
        .then((res) => {
          if (res.ok) {
            return res.text();
          } else {
            return fetch(
              `https://raw.githubusercontent.com/catppuccin/${portName}/main/.icon.svg`
            ).then((res) => {
              if (res.ok) {
                return res.text();
              } else {
                return fetch(
                  `https://cdn.discordapp.com/attachments/1012716616728977438/1028486057836167299/emboss.svg`
                ).then((res) => res.text());
              }
            });
          }
        })
        .catch((err) => {
          return fetch(
            `https://cdn.discordapp.com/attachments/1012716616728977438/1028486057836167299/emboss.svg`
          ).then((res) => res.text());
        });
      return {
        ...port,
        icon,
      };
    })
  );
  return {
    props: {
      ports: portsWithIcons,
    },
  };
}
