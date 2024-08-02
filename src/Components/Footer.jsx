import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900">
      <div className="container mx-auto text-gray-600 text-sm flex gap-20 justify-center">
        <h1>Developed By: Kartikay</h1>
        <h1 className="flex items-center gap-2">
          Github: 
          <a 
            href="https://github.com/karikay18" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#a08521]"
          >
            <FaGithub size={20} />
          </a>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;