import Link from "next/link";
import VercelFooter from "../../powered-by-vercel.svg";

export const PoweredByVercel = () => (
  <div className="p-2">
    <Link href="https://vercel.com/?utm_source=catppuccin&utm_campaign=oss">

      <VercelFooter className="h-12" />

    </Link>
  </div>
);
