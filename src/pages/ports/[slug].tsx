import { ReactElement } from "react";
import markdownToHtml from "../../lib/markdownToHtml";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { Layout } from "../../components";
import { Port } from "../../lib/types";
import axios from "axios";
import { getCurrentApiBaseUrl } from "../../lib/utils";

export default function PortPage({
  name,
  readme,
}: {
  name: string;
  readme: string;
}): ReactElement {
  return (
    <Layout>
      <div className="max-w-3xl w-full prose font-epilogue text-text mx-auto p-4 pt-8 rounded-md items-baseline">
        <div className="flex justify-between">
          <h1>Catppuccin for {name}</h1>
          <Link href={`https://github.com/catppuccin/${name}`}>
            <a aria-label="View on GitHub">
              <SiGithub size={"1.7rem"} />
              <p className="sr-only">View on GitHub</p>
            </a>
          </Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: readme }} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const response = await axios.get(`${getCurrentApiBaseUrl()}/ports`);
  const ports = response.data;
  const port = ports.filter((port: Port) => {
    return port.name === context.params.slug;
  })[0];
  const url = `https://raw.githubusercontent.com/catppuccin/${
    context.params.slug
  }/${port!.default_branch}/README.md`;
  const res = await fetch(url);
  const readme = await markdownToHtml(await res.text());

  return {
    props: {
      name: context.params.slug,
      readme,
    },
  };
};
