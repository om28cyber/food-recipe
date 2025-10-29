import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed z-10 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-md shadow-lg'
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <nav className='flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between'>
        {/* Logo + Brand */}
        <Link
          to="/"
          className='flex items-center justify-center text-white text-lg cursor-pointer font-semibold tracking-wide'
        >
          <img src={Logo} alt="Logo" className='hidden md:block w-8 h-8 lg:w-14 lg:h-14 mr-2' />
          Food<span className='text-[#00e676]'>Verse</span>
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex text-white gap-8 text-[16px]'>
          <li><Link to="/">Home</Link></li>
          <li><a href="/#recipes">Explore</a></li>
          <li><Link to="/favorites">Favorites</Link></li>
        </ul>

        {/* Sign-in Button */}
        <Button
          title='Sign in'
          conteinerStyle='hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]'
        />

        {/* Mobile Menu Icon */}
        <button
          className='block md:hidden text-white text-2xl'
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`${
          open ? 'flex' : 'hidden'
        } flex-col bg-black/80 backdrop-blur-md w-full px-4 pt-16 pb-10 text-white gap-6 text-[15px]`}
      >
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <a href="/#recipes" onClick={() => setOpen(false)}>Explore</a>
        <Link to="/favorites" onClick={() => setOpen(false)}>Favorites</Link>
      </div>
    </header>
  );
};

export default Navbar;
