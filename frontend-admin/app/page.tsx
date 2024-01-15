import Login from "@/components/Login";
import Toast from "@/components/Toast";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: Props) {
  return (
    <div className="w-screen h-screen text-center flex items-center justify-center">
      <Login />
      {searchParams.toast && <Toast visible={true}>{searchParams.toast}</Toast>}
    </div>
  );
}
