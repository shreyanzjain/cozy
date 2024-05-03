import { useState } from "react";
import { ethers } from "ethers";
const price = 0.0008;
const contractAddress = "0xE5c4073136039F2Ac62Bf6b9B1975C3f2Ab5f89b";
const transData = [
  {
    key: 1,
    value: "0.008ETH",
    space: "10GB",
  },
  {
    key: 2,
    value: "0.016ETH",
    space: "20GB",
  },
  {
    key: 3,
    value: "0.032ETH",
    space: "40GB",
  },
  {
    key: 1,
    value: "0.008ETH",
    space: "10GB",
  },
  {
    key: 2,
    value: "0.016ETH",
    space: "20GB",
  },
  {
    key: 3,
    value: "0.032ETH",
    space: "40GB",
  }
];

function SideBar({ num_to_quantity_bytes, data }) {
  const [storage, setStorage] = useState(
    num_to_quantity_bytes(data.stats.available)
  );
  const [provider, setProvider] = useState(
    new ethers.BrowserProvider(window.ethereum)
  );

  const dataList = transData.map(({ key, value, space }) => {
    return (<div key={key} className="flex justify-between items-center h-1/6 w-full ps-3 pe-3">
      <p className="italic text-lg">{space}</p>
      <p className="italic text-lg"> - - - - </p>
      <p className="italic text-lg">{value}</p>
    </div>);
  });

  const signer = provider.getSigner();
  const [space, setSpace] = useState(0);
  return (
    <div className="container-lg h-full w-1/4 bg-slate-50 p-3">
      {/* Padded Inner Container Flex Column */}
      <div className="flex-col h-full w-full">
        {/* stats */}
        <div className="flex h-1/6 w-full bg-slate-800 rounded-2xl items-center justify-center text-white gap-1">
          <div className="h-full w-1/2 flex items-center justify-center flex-col">
            <p className="font-bold text-3xl">{storage}</p>
            <p className="">available</p>
          </div>
        </div>
        {/* Buy Space */}
        <div className="h-1/6 pt-3">
          <form className="flex h-full w-full bg-slate-800 rounded-t-2xl items-center ps-3">
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                id="storage_space"
                className="w-1/3 h-1/2 p-2 rounded-xl bg-slate-50 text-black font-semibold text-3xl border-2 border-slate-700 focus:outline-none focus:border-slate-400"
                value={space}
                onChange={(e) => setSpace(e.target.valueAsNumber)}
              />
              <div className="text-3xl font-bold">GB</div>
            </div>
            <div
              className="me-3 text-3xl text-slate-900 font-bold p-3 border-2 border-slate-700 bg-slate-50 rounded-xl hover:cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                const weiPrice = ethers.parseEther((price * space).toString());
                const txnReq = {
                  to: contractAddress,
                  value: weiPrice.toString(),
                };
                (await signer)
                  .sendTransaction(txnReq)
                  .then((res) => {
                    console.log(res);
                    setStorage(
                      num_to_quantity_bytes(space * 1024 * 1024 * 1024)
                    );
                  })
                  .catch((err) => {
                    return;
                  });
              }}
            >
              Buy
            </div>
          </form>
        </div>
        {/* Transactions */}
        <div className="h-4/6 pt-3">
          <div className="flex-col h-full w-full bg-slate-900">
            <div className="flex-col h-1/2 w-full">
              <div className="flex justify-center items-center h-1/6 w-full border-b-2 border-slate-50">
                <p className="italic text-lg">Transactions</p>
              </div>
              {dataList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
