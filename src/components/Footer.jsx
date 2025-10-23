import React, { useState } from "react";
import { Mail, Send, Github, Twitter, Linkedin, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // mimic subscribe action
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setEmail("");
  };

  // Show/hide scroll to top button based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 py-10 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">RW</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
                React Week 3
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Small task manager project — built with React.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors duration-200"
                aria-label="Github"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2" aria-label="Footer">
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                Home
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                Tasks
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                About
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                Contact
              </a>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Resources
            </h4>
            <nav className="flex flex-col space-y-2" aria-label="Resources">
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                Documentation
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                API Reference
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                Support
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200 flex items-center"
                href="#"
              >
                <span className="w-1 h-1 bg-sky-600 rounded-full mr-2"></span>
                FAQ
              </a>
            </nav>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Stay Updated
            </h4>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sent
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg"
                }`}
              >
                {sent ? (
                  <>
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              We won't spam — unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              © {new Date().getFullYear()} React Week 3. All rights reserved.
              <span className="ml-1 text-red-500">
                <Heart size={14} fill="currentColor" />
              </span>
            </span>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;