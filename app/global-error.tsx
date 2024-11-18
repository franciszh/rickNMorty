"use client";

import Image from "next/image";
import rickHead from "@/public/rick-headshot.png";

export default function GlobalError() {
  return (
    <html>
      <body>
        <section className="flex-center py-[15%]">
          <Image src={rickHead} alt="rick headshot" height={300} width={300} />
          <h1 className="error-heading">
            Something went wrong! Time to restart the universe
          </h1>
        </section>
      </body>
    </html>
  );
}
