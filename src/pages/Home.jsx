import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';


const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed z-10 bg-black opacity-90">
      <nav className="flex w-full py-2 md:py-3 px-4 md:px-20 items-center justify-between">
        <Link
          to="/"
          className="flex items-center justify-center text-white text-lg cursor-pointer"
        >
          <img
            src={Logo}
            alt="Logo"
            className="hidden md:block w-8 h-8 lg:w-14 lg:h-14"
          />
          Food<span>Verse</span>
        </Link>

        
        <ul className="hidden md:flex text-white gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/#recipes">Explore</a>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>

        <Button
          title="Sign in"
          conteinerStyle="hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]"
        />

        <button
          className="block md:hidden text-white text-xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
        </button>
      </nav>

     
      <div
        className={`${
          open ? 'flex' : 'hidden'
        } bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}
      >
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <a href="/#recipes" onClick={() => setOpen(false)}>
          Explore
        </a>
        <Link to="/favorites" onClick={() => setOpen(false)}>
          Favorites
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
