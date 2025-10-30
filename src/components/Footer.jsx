import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Button from "./Button";

const Footer = () => {
  return (
    <footer className="text-white py-16 bg_gradient mt-auto">
      <div className="container mx-auto px-6 lg:px-20 py-10 flex flex-col gap-10 md:flex-row justify-between border-t border-slate-800">
      
        <div className="flex">
          <p className="font-bold text-center">
            Food<span className="text-green-500 text-xl">Verse</span>
          </p>
        </div>

    
        <div>
          <p className="font-semibold mb-2">QUICK LINKS</p>
          <div className="flex flex-col text-start">
            {["Home", "About"].map((item, i) => (
              <a
                key={i}
                href="#"
                className="block py-1 hover:text-gray-400 transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

       
        <div>
          <p className="font-semibold mb-2">LEGAL</p>
          <div className="flex flex-col text-start text-[14px]">
            {[
              "Terms and Conditions",
              "License Agreement",
              "Privacy Policy",
              "Copyright Information",
              "Cookies Policy",
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className="block py-1 hover:text-gray-400 transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        
        <div className="flex flex-col">
          <p className="font-semibold mb-2">SOCIAL MEDIA</p>
          <div className="flex mt-4 gap-3">
            <a href="#" className="bg-blue-600 p-2 rounded hover:scale-110 transition">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="bg-pink-600 p-2 rounded hover:scale-110 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="bg-blue-400 p-2 rounded hover:scale-110 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="bg-red-600 p-2 rounded hover:scale-110 transition">
              <FaYoutube size={18} />
            </a>
          </div>

          <Button
            title="Sign up"
            btnType="button"
            conteinerStyle="mt-8 bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-md min-w-[130px]"
          />
        </div>
      </div>

      
      <div className="flex items-center justify-center py-6 border-t border-slate-700 mt-6">
        <span className="text-gray-400 text-sm">OmTawde </span>
      </div>
    </footer>
  );
};

export default Footer;
