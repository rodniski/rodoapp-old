import {
  LifeBuoy,
  Truck,
  TreePine,
  Usb,
  Receipt,
  RefreshCcwDot,
  MailCheck,
} from "lucide-react";

export const menuData = {
  navMain: [
    {
      title: "Lançamento de Notas",
      icon: Receipt,
      items: [
        {
          title: "Lista de Pre Notas",
          url: "/central/prenota",
        },
        { title: "Incluir Manualmente", url: "/central/prenota/manual" },
        { title: "Incluir XML", url: "/central/prenota/xml" },
      ],
    },
    {
      title: "Controle de Itens",
      icon: RefreshCcwDot,
      items: [
        { title: "Borracharia", url: "/central/portaria/lancamento" },
        { title: "Conferência", url: "/central/portaria/conferencia" },
        {
          title: "Histórico de Conferência",
          url: "/central/portaria",
        },
      ],
    },
    {
      title: "Assinatura de Email",
      icon: MailCheck,
      items: [
        { title: "Timber", url: "/Inicio/Breve" },
        { title: "Rodoparaná", url: "/Inicio/Breve" },
      ],
    },
  ],
  projects: [
    { title: "Suporte", url: "http://hesk.rodoparana.com.br", icon: LifeBuoy },
    {
      title: "Intranet",
      url: "https://sites.google.com/site/baserodoparana/home",
      icon: Usb,
    },
    { title: "Rodoparaná", url: "https://rodoparana.com.br", icon: Truck },
    { title: "Timber", url: "https://grupotimber.com.br", icon: TreePine },
  ],
};
