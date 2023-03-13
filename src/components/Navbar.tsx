import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="z-20 min-w-full bg-purple-900 px-2 py-3 shadow-xl">
      <div className="text-xl font-bold text-white">
        <ul className="flex">
          <li>
            <Link
              href="/"
              className="px-3 text-center transition-colors  hover:text-white/80 active:text-white/60"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="px-3 text-center transition-colors  hover:text-white/80 active:text-white/60"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/experimental"
              className="px-3 text-center transition-colors  hover:text-white/80 active:text-white/60"
            >
              Experimental
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="px-3 text-center transition-colors  hover:text-white/80 active:text-white/60"
            >
              Transactions
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
