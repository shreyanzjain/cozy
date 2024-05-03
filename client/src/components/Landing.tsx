import Spline from "@splinetool/react-spline";
import { ethers } from "ethers";
import { useState } from "react";
import { Link } from "react-router-dom";
function Landing() {
  // Metamask Connection
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(
    new ethers.BrowserProvider(window.ethereum)
  );

  const initiateWalletConnection = async () => {
    try {
      const tmp_accounts = await provider.send("eth_requestAccounts", []);
      const tmp_account = tmp_accounts[0];
      setAccount(tmp_account);
      console.log("Account:", tmp_account);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // the outer div fixes the landing page height to a maximum of 100% of viewport height of the client device
    <div className="h-full w-full" style={{ height: "100vh" }}>
      <div className="h-full w-full">
        <div className="h-1/6 w-full container-lg bg-slate-800">
          <div className="flex h-full w-full items-center">
            {/* Home - Navbar */}
            <div className="container-lg h-1/2 w-full ms-4 me-4">
              <div className="flex h-full w-full items-center">
                <div className="container-lg h-full w-1/6">
                  <div className="flex h-full p-2 w-full items-center justify-center">
                    <div className="flex h-full items-center me-2">
                      <img
                        className="h-full w-full"
                        src="disk_rental_white.svg"
                        style={{ height: "70%" }}
                      ></img>
                    </div>
                    <div className="flex items-center h-full font-semibold font-mono text-white text-3xl">
                      Cozy
                    </div>
                  </div>
                </div>
                <div className="container-lg h-full w-4/6"></div>
                <div className="container-lg h-full w-1/6">
                  <div className="flex h-full w-full items-center justify-center">
                    {/* ENTER APP button */}
                    <Link
                      onClick={initiateWalletConnection}
                      to={"app"}
                      relative="path"
                      className="flex items-center justify-center rounded-3xl h-2/3 w-1/2 bg-white text-sm font-semibold text-black hover:cursor-pointer"
                    >
                      ENTER APP
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content below the home - navbar */}
        <div className="h-5/6 w-full container-lg bg-slate-50">
          <div className="flex h-full w-full">
            <div className="h-full w-1/2">
              <div className="flex flex-col h-full w-full">
                <div className="h-1/6"></div>
                <div className="flex h-5/6">
                  <div className="h-full w-1/6"></div>
                  <div className="h-full w-5/6">
                    <div className="flex flex-col h-full w-full">
                      <p className="text-4xl font-bold">Decentralized Disk Space Rental</p>
                      <p className="text-xl mt-12 mb-12">
                        Cozy is a long-term disk space rental service that accepts
                        payments in digital currencies.
                      </p>
                      <div className="flex h-1/3 text-black">
                        <div className="flex h-full w-1/2 items-center justify-start border-2 border-slate-800 rounded-lg ps-8">
                          <div className="flex flex-col h-3/4 w-3/4 items-start justify-center">
                            <h1 className="text-6xl font-bold">0.0008</h1>
                            <p className="text-xl">eth per decade per gigabyte.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 bg-slate-50">
              <Spline scene="https://prod.spline.design/NYaL6vTClqNxIVpL/scene.splinecode" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
