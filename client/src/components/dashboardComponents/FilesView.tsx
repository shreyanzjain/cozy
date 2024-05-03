import NoFilesView from "./filesView/NoFilesView";
function FilesView({ noFiles }) {
  return <div className="h-5/6 w-full rounded-b-2xl">
    {noFiles && <NoFilesView/>}
  </div>;
}

export default FilesView;
