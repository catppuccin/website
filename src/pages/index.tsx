/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import Layout from "../components/Layout";
import markdownToHtml from "../lib/markdownToHtml";

export default function Home({ content }: { content: string }): JSX.Element {
  return (
    <Layout>
      <div className="font-epilogue">
        <div className="max-w-3xl mx-auto p-4 pb-0">
          <div className="gap-6 flex flex-col pb-8">
            <h1 className="font-bold text-xl text-center">Catppuccin</h1>
            <img
              className="mx-auto"
              src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png"
              width="400"
              alt="Macchiato Palette"
            />
            <div className="grid grid-cols-2 items-center lg:flex md:flex lg:justify-between gap-2">
              <a
                href="https://github.com/catppuccin/catppuccin/stargazers"
                className="flex items-center justify-center"
              >
                <img
                  alt="Stargazers"
                  src="https://img.shields.io/github/stars/catppuccin?style=for-the-badge&logo=starship&color=C9CBFF&logoColor=D9E0EE&labelColor=302D41"
                />
              </a>
              <a
                href="https://github.com/catppuccin/catppuccin/releases/latest"
                className="flex items-center justify-center"
              >
                <img
                  alt="Releases"
                  src="https://img.shields.io/github/release/catppuccin/catppuccin.svg?style=for-the-badge&logo=github&color=F2CDCD&logoColor=D9E0EE&labelColor=302D41"
                />
              </a>
              <a
                href="https://github.com/catppuccin/catppuccin/issues"
                className="flex items-center justify-center"
              >
                <img
                  alt="Issues"
                  src="https://img.shields.io/github/issues/catppuccin/catppuccin?style=for-the-badge&logo=gitbook&color=B5E8E0&logoColor=D9E0EE&labelColor=302D41"
                />
              </a>
              <a
                href="https://discord.catppuccin.com"
                className="flex items-center justify-center"
              >
                <img
                  alt="Discord"
                  src="https://img.shields.io/discord/907385605422448742?style=for-the-badge&logo=discord&color=DDB6F2&logoColor=D9E0EE&labelColor=302D41"
                />
              </a>
            </div>
          </div>
          <div
            className="prose min-w-full prose-img:m-0 prose-p:mb-0 prose-h2:mb-0 "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const markdown = fs.readFileSync("src/content/main.md", "utf8");
  const content = await markdownToHtml(markdown, { allowHtml: true });
  return {
    props: {
      content,
    },
  };
};
