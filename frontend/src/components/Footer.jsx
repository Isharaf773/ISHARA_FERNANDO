import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gold-400/15 bg-primary-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-2xl font-black tracking-[.2em]">ISHARA DILSHAN</div>
            <div className="mt-1 text-sm font-bold tracking-[.45em] text-gold-400">MATHEMATICS</div>
            <p className="mt-5 max-w-md leading-7 text-slate-400">Grade 6–11 | O/L Mathematics — concept based learning with weekly evaluations and structured notes.</p>
          </div>
          <div>
            <h3 className="font-bold text-gold-400">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/courses" className="hover:text-white">Classes</Link></li>
              <li><Link to="/lessons" className="hover:text-white">Lessons</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gold-400">Contact</h3>
            <ul className="mt-4 space-y-4 text-slate-400">
              <li className="flex gap-3"><Phone className="h-5 w-5 text-gold-400" />076 472 6172</li>
              <li className="flex gap-3"><Mail className="h-5 w-5 text-gold-400" />isharaf773@gmail.com</li>
              <li className="flex gap-3"><Globe className="h-5 w-5 text-gold-400" />ishara-fernando-tutor.vercel.app</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Ishara Dilshan | Mathematics. All rights reserved.</p>
          <Link to="/admin" className="hover:text-gold-400">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
