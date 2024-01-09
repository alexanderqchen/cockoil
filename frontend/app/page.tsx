import Image from "next/image";
import Logo from "./logo.png";
import Login from "@/components/Login";

const Home = () => {
  return (
    <div className="p-8">
      <Image src={Logo} alt="logo" className="m-auto py-4" />
      <Login />
    </div>
  );
};

export default Home;
