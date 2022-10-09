import getIconColor from "../lib/getIconColor";
import { FiStar } from "react-icons/fi";
import { VscRepoForked } from "react-icons/vsc";
import { FC } from "react";
import { useRouter } from "next/router";
import { SVGIcon } from "./SVGIcon";
import { Port } from "../lib/types";

interface CardProps {
  port: Port;
}

export const Card: FC<CardProps> = ({ port }) => {
  const router = useRouter();
  return (
    <div
      className="bg-crust flex cursor-pointer hover:-translate-y-1 flex-col py-6 rounded-lg drop-shadow-md hover:drop-shadow-2xl hover:scale-[1.01] duration-300 items-center justify-evenly gap-3 max-h-fit h-fit"
      onClick={() => {
        router.push(`/ports/${port.name}`);
      }}
    >
      <h3 className=" text-zinc-300">{port.name}</h3>
      <div
        className={`flex text-${getIconColor(
          port.name
        )} justify-center items-center bg-base rounded-full p-3 fill-${getIconColor(
          port.name
        )}`}
      >
        <SVGIcon svgContent={port.icon} />
      </div>
      <div className="flex justify-center items-center gap-4 w-full">
        <p className="text-sm text-zinc-300 flex gap-1 justify-center">
          <FiStar />
          {port.stargazers_count}
        </p>
        <p className="text-sm text-zinc-300 flex gap-1 justify-center">
          <VscRepoForked />
          {port.forks_count}
        </p>
      </div>
    </div>
  );
};
