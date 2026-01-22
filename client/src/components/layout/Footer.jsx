import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Description */}
        <div>
          <h3 className="text-white font-black text-xl mb-4 italic">SUBPILOT.</h3>
          <p className="text-sm leading-relaxed">
            The ultimate command center for your digital life. We help you track, manage, and optimize your monthly subscriptions to ensure your money works for you, not against you.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2">
          <div className="space-y-2 text-sm">
            <p className="text-white font-bold mb-3 uppercase text-xs">Navigation</p>
            <p className="hover:text-indigo-400 cursor-pointer">Dashboard</p>
            <p className="hover:text-indigo-400 cursor-pointer">Analytics</p>
            <p className="hover:text-indigo-400 cursor-pointer">Security</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-white font-bold mb-3 uppercase text-xs">Socials</p>
            <a href="https://github.com" className="block hover:text-white">GitHub</a>
            <a href="https://linkedin.com" className="block hover:text-white">LinkedIn</a>
            <a href="https://peerlist.io" className="block hover:text-white">Peerlist</a>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <p className="text-white font-bold mb-3 uppercase text-xs">Contact Us</p>
          <p className="text-sm">+91 98765 43210</p>
          <p className="text-sm text-indigo-400 font-bold">support@subpilot.io</p>
          <p className="text-[10px] mt-6 text-slate-600 uppercase font-black">© 2026 SubPilot System Inc.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;