import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Menu, User, X } from 'lucide-react';

const BrandMark = () => (
  <div className="flex items-center gap-4">
    <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold-400/45 bg-primary-950 shadow-lg shadow-gold-400/5">
      <span className="font-serif text-2xl font-black"><span className="text-white">I</span><span className="gold-text">D</span></span>
    </div>
    <div className="leading-tight">
      <div className="text-base font-extrabold tracking-[.28em] text-white sm:text-xl">ISHARA DILSHAN</div>
      <div className="text-[10px] font-bold tracking-[.48em] text-gold-400 sm:text-xs">MATHEMATICS</div>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Classes', href: '/courses' },
    { name: 'Lessons', href: '/lessons' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const checkAuth = () => {
      const info = localStorage.getItem('studentInfo');
      setStudentInfo(info ? JSON.parse(info) : null);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentInfo');
    setStudentInfo(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gold-400/10 bg-[#07111f]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex h-[88px] items-center justify-between">
          <Link to="/" className="flex-shrink-0"><BrandMark /></Link>
          <div className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className={`rounded-full px-6 py-3 text-base font-semibold transition-all ${location.pathname === item.href ? 'bg-gold-400 text-primary-950 shadow-lg shadow-gold-400/20' : 'text-white hover:bg-white/5 hover:text-gold-400'}`}>
                {item.name}
              </Link>
            ))}
            {studentInfo ? (
              <button onClick={handleLogout} className="ml-4 flex items-center rounded-full border border-red-400/30 px-6 py-3 text-base font-semibold text-red-200 hover:bg-red-500/10"><LogOut className="mr-2 h-5 w-5" />Logout</button>
            ) : (
              <Link to="/login" className="ml-4 inline-flex items-center rounded-full border border-gold-400/65 px-7 py-3 text-base font-bold text-gold-400 transition hover:bg-gold-400 hover:text-primary-950">
                Student Login <LogIn className="ml-4 h-5 w-5" />
              </Link>
            )}
            <Link to="/admin" className="text-slate-500 hover:text-gold-400 p-2"><User className="h-5 w-5" /></Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:bg-white/5"><span className="sr-only">Open menu</span>{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden border-t border-gold-400/10 bg-primary-950 px-4 pb-5">
          <div className="space-y-2 pt-4">
            {navigation.map((item) => <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 text-slate-200 hover:bg-white/5">{item.name}</Link>)}
            <Link to="/login" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 text-gold-400 border border-gold-400/20">Student Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
