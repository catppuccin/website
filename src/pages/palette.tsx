import { variants } from "@catppuccin/palette";
import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { useState } from "react";
import CopyToClipboardBtn from "../components/CopyToClipboardBtn";
import Link from "next/link";
import { capitalize, convertTo } from "../lib/utils";

const formats = ["Hex", "RGB", "HSL", "HSV", "Lab"];

export default function PalettePage({
  palette,
}: {
  palette: any;
}): JSX.Element {
  const [selectedFlavour, setSelectedFlavour] = useState("mocha");
  const [selectedFormat, setSelectedFormat] = useState("Hex");

  return (
    <Layout title="Palette">
      <div className="grow max-w-4xl mx-auto">
        <div className="prose lg:prose-lg py-4">
          <h1>Palettes</h1>
          <p>
            Catppuccin constist of 4 beautiful pastel color palettes. All the
            details can be found below. To make the best use them please refer
            to the{" "}
            <Link href="https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md">
              <a>style guide.</a>
            </Link>
          </p>
        </div>
        <div className="flex items-baseline justify-between">
          <div>
            <label
              htmlFor="flavour"
              className="block text-sm font-medium text-subtext0"
            >
              Flavour
            </label>
            <select
              id="flavour"
              onChange={(e) => {
                setSelectedFlavour(e.target.value.toLowerCase());
              }}
              defaultValue="Mocha"
              className="mt-1 block w-full rounded-md border-crust py-2 pl-3 pr-10 text-text focus:border-rosewater focus:outline-none focus:ring-rosewater sm:text-sm"
            >
              {Object.keys(palette).map((flavour) => {
                return <option key={flavour}>{capitalize(flavour)}</option>;
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="format"
              className="block text-sm font-medium text-subtext0"
            >
              Format
            </label>
            <select
              id="format"
              onChange={(e) => {
                setSelectedFormat(e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-crust py-2 pl-3 pr-10 text-text focus:border-rosewater focus:outline-none focus:ring-rosewater sm:text-sm"
            >
              {formats.map((format) => {
                return <option key={format}>{format}</option>;
              })}
            </select>
          </div>
        </div>
        <table className="table-auto divide-y divide-surface2 border-collapse border-spacing-2.5 w-full px-2">
          <thead>
            <tr>
              <th></th>
              <th>Label</th>
              <th>{selectedFormat}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(palette[selectedFlavour]).map(
              ([colourName, hexCode], colourIdx) => {
                const format = convertTo(hexCode as string, selectedFormat);
                return (
                  <tr
                    key={colourName}
                    className={colourIdx % 2 === 0 ? undefined : "bg-mantle/50"}
                  >
                    <td className={`${selectedFlavour} p-2 w-12`}>
                      <div
                        className={`rounded-full w-6 h-6 bg-${colourName}`}
                      />
                    </td>
                    <td className="p-2">{capitalize(colourName)}</td>
                    <td className="flex gap-4 justify-between p-2">
                      <code className="font-fira bg-transparent">{format}</code>
                      <CopyToClipboardBtn text={format} />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const palette = Object.entries(variants)
    .map(([key, value]) => {
      return {
        [key]: Object.fromEntries(
          Object.entries(value).map(([key, value]) => {
            return [key, value.hex];
          })
        ),
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return {
    props: {
      palette,
    },
  };
};
