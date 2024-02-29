import Link from "next/link";

const Utilities = () => {
  return (
    <div>
      <h1 className="text-3xl mb-8">Utilities</h1>
      <Link
        href="/generate-qr-codes"
        className="py-2 px-4 bg-slate-700 rounded-md text-gray-200 font-medium"
      >
        Generate QR Codes
      </Link>
    </div>
  );
};
export default Utilities;
