import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Card, Layout, SearchBar } from "../../components";
import LazyLoad from "react-lazy-load";
import { Port } from "../../lib/types";
import { getIconColor, getIconURL, RepoList } from "../../lib/getIconColor";
import getLocalIcon from "../../lib/getLocalIcon";
import { parse as parseYAML } from "yaml";
import { getCurrentApiBaseUrl } from "../../lib/utils";
import { PORTS_YAML } from "../../lib/constants";

export default function Home(props: any) {
  const [filteredPorts, setFilteredPorts] = useState(
    props.ports ? props.ports : []
  );
  const [parent] = useAutoAnimate<HTMLDivElement>({
    duration: 500,
  });

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
            .filter((port: any) => {
              return !(
                port.topics.includes("catppuccin-meta") ||
                port.topics.includes("catppuccin-library")
              );
            })
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

export async function getServerSideProps(context: any) {
  // the actual GitHub API response
  const repoRes = await fetch(`${getCurrentApiBaseUrl()}/ports`);
  const repos = await repoRes.json();
  // a list of approved ports, managed in catppuccin/catppuccin
  const mappings = await fetch(PORTS_YAML).then((res) => res.text());
  const ports = parseYAML(mappings) as RepoList;

  const portsWithIcons = await Promise.all(
    repos.map(async (port: Port) => {
      const URL = getIconURL(port.name, ports);
      const color = getIconColor(port.name, ports);

      let icon: string;
      if (URL) {
        icon = await fetch(URL)
          .then((res) => {
            if (res.ok) {
              return res.text();
            } else {
              throw new Error(`Failed to fetch icon ${URL}`);
            }
          })
          .catch(() => {
            return getLocalIcon(port.name, context.req.headers.host);
          });
      } else {
        icon = getLocalIcon(port.name, context.req.headers.host);
      }

      return {
        ...port,
        icon,
        color,
      };
    })
  );

  return {
    props: {
      ports: portsWithIcons,
    },
  };
}
