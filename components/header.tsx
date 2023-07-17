
function Header() {
  return (
    <header className="flex flex-col" >
      <div className=" flex mr-1 p-2">
        <a href="" className="flex items-center min-w-fit">
          <img
            src="https://img.freepik.com/icones-gratis/pipoca_318-786598.jpg?w=2000"
            alt="logo-pipoca"
            width={50}
          />
        </a>
        <h1 className="font-black text-4xl sm:text-5xl text-red-500">
          CINE EXPLORER{" "}
        </h1>
      </div>

      <div className="text-sm font-light">
      </div>
    </header>
  );
}
export default Header;
