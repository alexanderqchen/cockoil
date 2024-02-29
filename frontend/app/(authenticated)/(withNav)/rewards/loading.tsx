const Rewards = async () => {
  return (
    <div className="max-w-2xl m-auto">
      <div className="w-full max-w-96 m-auto bg-[#432529] p-8 pb-12 rounded-3xl text-center mb-8 animate-pulse">
        <h1 className="text-2xl font-medium mb-8 invisible">Total Earned</h1>
        <p className="text-6xl font-bold invisible">$0.00</p>
      </div>

      <div>
        <h1 className="text-3xl font-medium mb-4">History</h1>
        <div className="w-full bg-gray-600 rounded-md h-10 animate-pulse mb-2" />
        <div className="w-full bg-gray-600 rounded-md h-10 animate-pulse mb-2" />
        <div className="w-full bg-gray-600 rounded-md h-10 animate-pulse mb-2" />
      </div>
    </div>
  );
};

export default Rewards;
