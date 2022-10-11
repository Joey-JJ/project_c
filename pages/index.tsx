import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className={"container"}>
      <h1>Dashboard Cavero</h1>
      <Image
        src={require("./../public/logo_loods.png")}
        alt="Logo loods"
        width={300}
        height={200}
      />
    </div>
  );
};

export default Home;
