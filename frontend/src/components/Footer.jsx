const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold tracking-tight">
              Qwertyinfosys
            </h3>
            <p className="text-text-tertiary text-sm leading-relaxed">
              Transforming ideas into innovative technology solutions with
              minimalist elegance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-text-secondary">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-text-tertiary hover:text-text-primary text-sm transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-text-tertiary hover:text-text-primary text-sm transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-text-tertiary hover:text-text-primary text-sm transition-colors"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-text-secondary">
              Services
            </h4>
            <ul className="space-y-3">
              <li className="text-text-tertiary text-sm">Web Development</li>
              <li className="text-text-tertiary text-sm">App Development</li>
              <li className="text-text-tertiary text-sm">Custom Software</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-text-secondary">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-text-tertiary text-sm">
                mrgdchauhan@gmail.com
              </li>
              <li className="text-text-tertiary text-sm">+91 9328043160</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#222222] mt-16 pt-8 text-center">
          <p className="text-text-tertiary text-sm">
            © 2024 QDTS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
