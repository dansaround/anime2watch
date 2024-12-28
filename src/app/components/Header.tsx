import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/logo.png";

export default function Header() {
  return (
    <header className="flex bg-black justify-between items-center p-4 border-b-4 border-blue-400">
      <Link href="/home">
        <Image src={Logo} alt="Logo" width={100} height={30} />
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>Popular</li>
          <Link href="/favorites">Favorites</Link>
          <li>Genres</li>
        </ul>
      </nav>
      <div>
        <button>Sign In</button>
      </div>
    </header>
  );
}
