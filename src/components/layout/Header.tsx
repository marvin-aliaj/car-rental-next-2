"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathName === path;
  };
  const navItems = [
    {path: "/", name: "Home"},
    {path: "/cars", name: "Cars"},
    {path: "/locations", name: "Locations"},
    {path: "/contact-us", name: "Contact Us"},
  ];
  return (
      <header className="bg-[rgba(21,24,27)] border-b border-gray-800 text-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex w-full justify-between gap-8 items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <div className="flex items-center cursor-pointer hover:scale-95 transition-all duration-300">
                    <div className="text-2xl font-bold text-primary italic">
                      <span className="text-4xl font-bold text-primary italic">W</span>
                      emis
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                    <Link href={item.path} key={item.path}>
                      <div className="relative px-4 py-2 group">
                    <span
                        className={`relative z-10 ${
                            isActive(item.path)
                                ? "text-white font-medium"
                                : "text-gray-400 hover:text-white"
                        } transition-colors duration-300`}
                    >
                      {item.name}
                    </span>
                        {isActive(item.path) && (
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-white rounded-full origin-left animate-underline"></div>
                        )}
                        <div
                            className={`absolute bottom-0 left-0 right-0 bg-white rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${
                                isActive(item.path) ? "hidden" : ""
                            }`}
                        ></div>
                      </div>
                    </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                  onClick={() => toggleMenu()}
                  className="p-2 rounded-lg hover:bg-gray-800 focus:outline-none transition-colors duration-300"
                  aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col items-center">
                <span
                    className={`block h-0.5 w-6 bg-gray-300 rounded-full transition-all duration-300 ${
                        isMenuOpen
                            ? "rotate-45 translate-y-1.5"
                            : "-translate-y-0.5"
                    }`}
                ></span>
                  <span
                      className={`block h-0.5 w-6 bg-gray-300 rounded-full mt-1.5 transition-all duration-300 ${
                          isMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                  ></span>
                  <span
                      className={`block h-0.5 w-6 bg-gray-300 rounded-full mt-1.5 transition-all duration-300 ${
                          isMenuOpen
                              ? "-rotate-45 -translate-y-1.5"
                              : "translate-y-0.5"
                      }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-gray-900 border-t border-gray-800">
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                    <Link href={item.path} key={item.path}>
                <span
                    className={`${
                        isActive(item.path)
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    } block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-300`}
                    onClick={closeMenu}
                >
                  {item.name}
                </span>
                    </Link>
                ))}
              </div>
            </div>
        )}
      </header>
  );
}
