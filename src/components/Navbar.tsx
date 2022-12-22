import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="fixed z-20 min-w-full bg-purple-900 px-6 py-4 shadow-xl">
      <div className="text-2xl font-bold text-white">
        <ul className="flex">
          <li>
            <Link href="/" className="navbar-item">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="navbar-item">
              Products
            </Link>
          </li>
          <li>
            <Link href="/experimetal" className="navbar-item">
              Experimental
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
