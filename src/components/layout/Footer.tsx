import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <h3 className="font-bold text-white text-lg mb-4">
              Wemis Agency
            </h3>
            <p className="text-neutral-400 mb-4">
              Providing quality car rentals since 2010. Our mission is to offer
              convenient, reliable, and affordable transportation options for
              every journey.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <FaFacebook />
              </Link>
              <Link
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <FaTwitter />
              </Link>
              <Link
                href="#"
                className="text-neutral-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-neutral-400 hover:text-white transition-colors duration-300">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/cars">
                  <span className="text-neutral-400 hover:text-white transition-colors duration-300">
                    Cars
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/locations">
                  <span className="text-neutral-400 hover:text-white transition-colors duration-300">
                    Locations
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us">
                  <span className="text-neutral-400 hover:text-white transition-colors duration-300">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-4">
              Contact Information
            </h3>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                <span>Mother Tereza Airport, Rinas, Albania</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3"></i>
                <span>+355 68 409 3623</span>
              </li>
              <li className="flex items-center lowercase">
                <i className="fas fa-envelope mr-3"></i>
                <span>reservation@goldcarsalbania.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3"></i>
                <span>Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Wemis Agency. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4 text-sm text-neutral-400">
            <Link href="/#faq">
              <span className="hover:text-white transition-colors duration-300">
                Customer Support
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
