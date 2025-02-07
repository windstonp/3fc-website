import Link from "next/link";
import { Button } from "../ui/button";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Container } from "../Container";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#4D4D4D] text-white py-6 mt-8">
      <Container styles="flex flex-wrap justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/img/logo.png"
            alt="3fc Logo"
            width={100}
            height={100}
            className="w-24 h-24"
          />
          <nav className="flex flex-col ml-4">
            <Link href="#Home" className="hover:underline">
              <Button className="text-white hover:text-gray-400" variant="link">
                Início
              </Button>
            </Link>
            <Link href="#services" className="hover:underline">
              <Button className="text-white hover:text-gray-400" variant="link">
                Serviços
              </Button>
            </Link>
            <Link href="#about" className="hover:underline">
              <Button className="text-white hover:text-gray-400" variant="link">
                Sobre
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap">
          <div className="flex flex-col text-gray-300 my-4 mr-4">
            <div className="flex items-center mx-2">
              <FaWhatsapp className="text-green-500 mr-4" />
              <span>48 9999-9999</span>
            </div>
            <div className="flex items-center mx-2">
              <MdEmail className="text-blue-400 mr-4" />
              <span>mail@mail.com</span>
            </div>
            <div className="flex items-center mx-2">
              <MdLocationOn className="text-blue-400 mr-4" />
              <span>Lorem ipsum, lorem, SC - 88750-000</span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="font-semibold">Siga-nos</span>
            <div className="flex space-x-3">
              <Button className="bg-black rounded-full" size="icon">
                <FaInstagram className="text-white" />
              </Button>
              <Button className="bg-black rounded-full" size="icon">
                <FaFacebook className="text-white" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
