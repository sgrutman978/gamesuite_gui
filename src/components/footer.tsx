import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link
              to="/"
              className="flex-shrink-0 gap-2 flex items-center group"
            >
              <img
                src="/logo-icon.png"
                className="w-full max-w-[40px]"
                alt=""
              />
              <img
                src="/logo-text.png"
                className="w-full max-w-[130px]"
                alt=""
              />
            </Link>
            <p className="text-gray-400 mb-4 mt-4">
              The ultimate gaming platform with blockchain integration and
              rewards
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games" className="text-gray-400 hover:text-white">
                  Games
                </Link>
              </li>
              <li>
                <Link
                  to="/tokenomics"
                  className="text-gray-400 hover:text-white"
                >
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-400 hover:text-white">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white">
                  Developer API
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Stay updated with our latest news and announcements
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              {/* <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button> */}
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} GameSuite. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-white text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
