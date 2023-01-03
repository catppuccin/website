/* eslint-disable @next/next/no-img-element */
import { Layout } from "../components";
import fs from "fs";
import markdownToHtml from "../lib/markdownToHtml";

export default function Home({ content }: { content: string }): JSX.Element {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 pb-0">
        <div
          className="prose min-w-full prose-img:m-0 prose-p:mb-0 prose-h2:mb-0 "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const markdown = fs.readFileSync("src/content/contributing.md", "utf8");
  const content = await markdownToHtml(markdown, "/contributing", {
    allowHtml: true,
  });
  return {
    props: {
      content,
    },
  };
};
