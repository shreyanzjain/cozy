function Error404() {
  return (
    <div className="h-full w-full bg-slate-50" style={{ height: "100vh" }}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex-col">
          <h1 className="font-bold text-6xl">404 Not Found</h1>
          <p>what you are looking for, does it exist in this universe?</p>
        </div>
      </div>
    </div>
  );
}

export default Error404;
