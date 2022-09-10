import Layout from "../../components/Layout";
import { ReactElement } from "react";
import markdownToHtml from "../../lib/markdownToHtml";
import { GetStaticPaths, GetStaticProps } from "next";
import GetPorts from "../../lib/getPorts";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import axios from "axios";

export default function PortPage({
  name,
  readme,
}: {
  name: string;
  readme: string;
}): ReactElement {
  return (
    <Layout>
      <div className="max-w-3xl prose font-epilogue text-text mx-auto p-4 pt-8 rounded-md items-baseline">
        <div className="flex justify-between">
          <h1>Catppuccin for {name}</h1>
          <Link href={`https://github.com/catppuccin/${name}`}>
            <a aria-label="Viw on GitHub">
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

export const getStaticProps: GetStaticProps = async (context: any) => {
  const res = await axios.get(
    `https://raw.githubusercontent.com/catppuccin/${context.params.slug}/main/README.md`
  );
  const readme = await markdownToHtml(res.data);

  return {
    props: {
      name: context.params.slug,
      readme,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ports = await GetPorts();

  const paths = ports.map((port: any) => {
    return {
      params: { slug: port.name },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
