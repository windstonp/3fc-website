import Link from "next/link";
import { Container } from "../Container";
import Styles from "./style.module.css";
import { Button } from "../ui/button";
export function NavBar() {
  return (
    <menu
      className={`fixed z-10 top-0 right-0 left-0 menu-bg ${Styles.menu__bg}`}
    >
      <Container>
        <nav className="p-4">
          <div className="flex items-center justify-between">
            <img alt="3fc Logo" src="/img/logo.png" className="h-50" />
            <div className="flex items-center justify-between">
              <ul className="flex space-x-6 mr-4">
                <li>
                  <Link href="#">
                    <Button
                      className="text-white hover:text-gray-400"
                      variant="link"
                    >
                      Início
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Button
                      className="text-white hover:text-gray-400"
                      variant="link"
                    >
                      Serviços
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <Button
                      className="text-white hover:text-gray-400"
                      variant="link"
                    >
                      Sobre
                    </Button>
                  </Link>
                </li>
              </ul>
              <Button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200">
                Faça um Orçamento
              </Button>
            </div>
          </div>
        </nav>
      </Container>
    </menu>
  );
}
