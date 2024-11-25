import {
  AuctionIcon,
  UserIcon,
  HomeIcon,
  ExitIcon,
  RegisterIcon,
} from "../icons";

const optionsLogged = [
  {
    name: "Subastas",
    linksTo: "/",
    icon: AuctionIcon,
  },
  {
    name: "Menú",
    linksTo: "/sesion-iniciada",
    icon: HomeIcon,
  },
  {
    name: "Cerrar sesión",
    icon: ExitIcon,
  },
];

const optionsUnlogged = [
  {
    name: "Subastas",
    linksTo: "/",
    icon: AuctionIcon,
  },
  {
    name: "Iniciar sesión",
    linksTo: "/login",
    icon: UserIcon,
  },
  {
    name: "Registrarse",
    linksTo: "/registro",
    icon: RegisterIcon,
  },
];

export { optionsLogged, optionsUnlogged };
