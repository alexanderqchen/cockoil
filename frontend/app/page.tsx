import Image from "next/image";
import Logo from "./logo.png";
import Login from "@/components/Login";
import Toast from "@/components/Toast";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const Home = ({ searchParams }: Props) => {
  return (
    <div className="p-8">
      <Image src={Logo} alt="logo" className="m-auto py-4" />
      <Login />
      {searchParams.toast && <Toast visible={true}>{searchParams.toast}</Toast>}
    </div>
  );
};

export default Home;
