const Settings = async () => {
  return (
    <div className="text-xl leading-10">
      <label>Name</label>
      <div className="w-full bg-[#28282F] rounded-md h-10 animate-pulse mb-2" />
      <label>Email</label>
      <div className="w-full bg-[#28282F] rounded-md h-10 animate-pulse mb-2" />
      <label>Payout Method</label>
      <div className="w-full bg-[#28282F] rounded-md h-10 animate-pulse mb-2" />
      <button className="w-full bg-[#432529] rounded-md h-10 font-medium mt-4">
        SAVE
      </button>
    </div>
  );
};

export default Settings;
