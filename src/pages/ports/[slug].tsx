import { ReactElement } from "react";
import markdownToHtml from "../../lib/markdownToHtml";
import {GetStaticPaths, GetStaticProps} from "next";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { Layout } from "../../components";
import { Port } from "../../lib/types";
import getPorts from "../../lib/getPorts";
import {PORTS_YAML} from "../../lib/constants";
import {parse as parseYAML} from "yaml";
import {RepoList} from "../../lib/getIconColor";

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
        <div
          className="readme-wrapper"
          dangerouslySetInnerHTML={{ __html: readme }}
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mappings = await fetch(PORTS_YAML).then((res) => res.text());
  const repos = parseYAML(mappings) as RepoList;
  const ports = Object.keys(repos)
  return {
    paths: ports.map(port => {
      return {
        params: {
          slug: port
        }
      }
    }),
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const ports = await getPorts();
  const port = ports.filter((port: Port) => {
    return port.name === context.params.slug;
  })[0];
  const default_branch = port.default_branch ?? "main";
  const url = `https://raw.githubusercontent.com/catppuccin/${
    context.params.slug
  }/${default_branch}/README.md`;
  const res = await fetch(url);
  const readme = await markdownToHtml(
    await res.text(),
    `https://raw.githubusercontent.com/catppuccin/${context.params.slug}/${
      default_branch
    }`,
    {
      allowHtml: true,
    }
  );

  return {
    props: {
      name: context.params.slug,
      readme,
    },
    revalidate: 30 * 60, // 30 minutes
  };
};
