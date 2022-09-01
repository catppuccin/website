import Layout from "../../components/Layout";
import { ReactElement } from "react";
import markdownToHtml from "../../lib/markdownToHtml";
import { GetStaticPaths, GetStaticProps } from "next";
import GetPorts from "../../lib/getPorts";

export default function PortPage({
  name,
  readme,
}: {
  name: string;
  readme: string;
}): ReactElement {
  return (
    <Layout>
      <div className="max-w-3xl prose text-text bg-mantle mx-auto p-4 rounded-md">
        <h1>Catppuccin for {name}</h1>
        <div dangerouslySetInnerHTML={{ __html: readme }} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const res = await fetch(
    `https://raw.githubusercontent.com/catppuccin/${context.params.slug}/main/README.md`
  );
  const readme = await markdownToHtml(await res.text());

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
