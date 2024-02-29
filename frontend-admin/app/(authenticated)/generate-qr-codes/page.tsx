import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
import { formatItemUrl } from "@/helpers";

const GenerateQRCodes = () => {
  const uuids = [];

  for (let i = 0; i < 250; i++) {
    uuids.push(uuidv4());
  }

  console.log(uuids);

  return (
    <div>
      {uuids.map((uuid) => {
        const itemUrl = formatItemUrl(uuid);

        return (
          <div
            key={uuid}
            className="border-[1px] border-black w-1/2 inline-block p-4"
          >
            <QRCode value={itemUrl} className="w-24 h-24 mb-4" />
            <p className="break-words text-sm">{itemUrl}</p>
          </div>
        );
      })}
    </div>
  );
};

export default GenerateQRCodes;
