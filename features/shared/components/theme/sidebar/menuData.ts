import { LifeBuoy, AudioWaveform, Truck, TreePine, Store } from "lucide-react";

export const menuData = {
  teams: [{ name: "RodoApp", logo: LifeBuoy }],
  navMain: [
    {
      title: "Lançamento de Notas",
      icon: Store,
      items: [
        {
          title: "Lista de Pre Notas",
          url: "/Inicio/Lancamentos/Visualizacao",
        },
        { title: "Incluir Manualmente", url: "/Inicio/Lancamentos/Manual" },
        { title: "Incluir XML", url: "/Inicio/Lancamentos/XML" },
      ],
    },
    {
      title: "Controle de Itens",
      icon: Truck,
      items: [
        { title: "Borracharia", url: "/Inicio/Controle/Borracharia" },
        { title: "Conferência", url: "/Inicio/Controle/Portaria" },
        {
          title: "Histórico de Conferência",
          url: "/Inicio/Controle/Historico",
        },
      ],
    },
    {
      title: "Assinatura de Email",
      icon: TreePine,
      items: [
        { title: "Timber", url: "/Inicio/Breve" },
        { title: "Rodoparaná", url: "/Inicio/Breve" },
      ],
    },
  ],
  projects: [
    { name: "Suporte", url: "http://hesk.rodoparana.com.br", icon: LifeBuoy },
    {
      name: "Intranet",
      url: "https://sites.google.com/site/baserodoparana/home",
      icon: AudioWaveform,
    },
    { name: "Rodoparaná", url: "https://rodoparana.com.br", icon: Truck },
    { name: "Timber", url: "https://grupotimber.com.br", icon: TreePine },
  ],
};
