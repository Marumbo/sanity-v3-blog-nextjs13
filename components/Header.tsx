import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header
      className="flex items-center justify-between space-x-2 font-bold
        px-10 py-5"
    >
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            className="rounded-full"
            src="https://marumbopoetry.com/static/media/studioTwo.f7bc5cd1e812921bd6c2.jpg"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>
        <Link href="/">
          <h1>Tutorial</h1>
        </Link>
      </div>
      <div>
        <Link
          href="https://marumbopoetry.com/"
          className="px-5 py-3 text-sm md:text-base bg-gray-900 text-[#F7AB0A] flex items-center rounded-full text-center"
        >
          {" "}
          Go to marumbopoetry
        </Link>
      </div>
    </header>
  );
}

export default Header;
