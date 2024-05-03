const data = {
  stats: {
    available: 140 * 1024 * 1024 * 1024,
  },
  transactions: {},
};

import { useState } from "react";
import SideBar from "./dashboardComponents/SideBar";
import FilesView from "./dashboardComponents/FilesView";

// function to convert a pure numeric value to KB, GB, etc.
function num_to_quantity_bytes(number: number) {
  const suffixes = ["B", "KB", "MB", "GB", "TB", "PB"];
  let counter = 0;

  while (number > 1024 && counter < suffixes.length - 1) {
    number /= 1024;
    counter++;
  }

  return number.toFixed(2) + " " + suffixes[counter];
}
function Dashboard() {
  // if noFiles is true then there are no files uploaded by the user
  const [noFiles, setNoFiles] = useState(true);
  return (
    <div className="w-full bg-slate-800 text-white" style={{ height: "100vh" }}>
      <div className="flex h-full w-full">
        {/* Main data view */}
        <div className="container-lg h-full w-3/4 bg-slate-800 p-3">
          {/* Padded Inner Container Flex Column*/}
          <div className="flex-col h-full w-full bg-slate-700 rounded-2xl">
            {/* decoration bar /files */}
            <div className="h-1/6 w-full rounded-t-2xl bg-slate-500">
              <div className="flex h-full w-full items-center">
                <p className="text-3xl font-bold ms-4">/filesystem</p>
              </div>
            </div>
            {/* Files View */}
            <FilesView noFiles={noFiles} />
          </div>
        </div>
        {/* Sidebar */}
        <SideBar num_to_quantity_bytes={num_to_quantity_bytes} data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
