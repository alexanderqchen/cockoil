const Settings = async () => {
  return (
    <div className="text-xl leading-10 max-w-2xl m-auto">
      <label>Name</label>
      <div className="w-full bg-gray-600 rounded-md h-10 animate-pulse mb-2" />
      <label>Email</label>
      <div className="w-full bg-gray-600 rounded-md h-10 animate-pulse mb-2" />
      <label>Payout Method</label>
      <div className="w-full bg-gray-600 rounded-md h-10 animate-pulse mb-2" />
    </div>
  );
};

export default Settings;
