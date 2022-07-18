/* eslint-disable react/no-children-prop */
import GetPorts from "../utils/GetPorts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import CodeBlock from "../components/CodeBlock";
import rehypePrism from "rehype-prism";

export async function getStaticPaths() {
  const ports = await GetPorts();
  const paths = ports
    .filter((port) => port.name !== ".github" && port.name !== "template")
    .map((port) => ({ params: { slug: port.name } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const ports = await GetPorts();
  const port = ports.find((port) => port.name.toLowerCase() === params.slug);
  const mdown = await fetch(
    `https://raw.githubusercontent.com/catppuccin/${port.name}/${port.default_branch}/README.md`
  );
  return {
    props: {
      port,
      mdown: await mdown.text(),
    },
  };
}

export default function Port(props) {
  const mark = props.mdown;
  return (
    <div className="flex flex-col justify-center items-center p-3 min-w-screen min-h-screen">
      <ReactMarkdown
        className="prose prose-headings:underline prose-headings:decoration-dotted prose-headings:underline-offset-2 font-sans"
        children={mark
          .toString()
          .replace(new RegExp(/<p\salign(.*)>([\s\S]*?)<\/p>/g), "")
          .replace(new RegExp(/<h3\salign(.*)>([\s\S]*?)<\/h3>/), "")
          .replace(new RegExp(/<img(.*)\s\/>/), "")
          .replace(new RegExp(/![\s\S]*?\[(.*)\]\((.*)\)/), "")
          .replace(new RegExp(/<img\salign(.*)>([\s\S]*?)<\/img>/), "")}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypePrism]}
      />
    </div>
  );
}
