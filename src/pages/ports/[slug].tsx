import Layout from "../../components/Layout";
import { ReactElement } from "react";
import markdownToHtml from "../../lib/markdownToHtml";
import { GetStaticPaths, GetStaticProps } from "next";
import GetPorts from "../../lib/getPorts";
import Link from "next/link";
import axios from "axios";

export default function PortPage({
  name,
  readme,
}: {
  name: string;
  readme: string;
}): ReactElement {
  return (
    <Layout title={` for ${name}`}>
      <div className="min-w-4xl prose text-text bg-mantle mx-auto p-4 rounded-md items-baseline">
        <div className="flex justify-between mt-4">
          <h1>Catppuccin for {name}</h1>
          <Link href={`https://github.com/catppuccin/${name}`}>
            <a>View on GitHub</a>
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
