import {
  SkeletonLancamento,
  SkeletonBorracharia,
  SkeletonSignature,
  SkeletonIntranet,
  SkeletonChamado,
} from ".";
import { Clipboard, FileX, Edit, Columns, Box } from "lucide-react";

export const items = [
  {
    title: "Lançamento de Pré Notas",
    description: <span>Verifique ou lance pré documentos de entrada.</span>,
    href: "/Inicio/Breve",
    header: <SkeletonLancamento />,
    className: "md:col-span-1",
    icon: <Clipboard className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Conferência de Saída de Pneus.",
    description: (
      <span>
        {" "}
        Gerencie e registre a entrega de pneus com precisão, garantindo controle
        total no fluxo de saída.
      </span>
    ),
    href: "#",
    header: <SkeletonBorracharia />,
    className: "md:col-span-2",
    icon: <FileX className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Gerador de Assinatura de email",
    description: (
      <span>Precisa de uma assinatura corporativa? Crie a sua agora.</span>
    ),
    href: "/Inicio/Breve",
    header: <SkeletonSignature />,
    className: "md:col-span-1",
    icon: <Edit className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Intranet",
    description: <span>Conheça nossos processos na intranet.</span>,
    href: "http://intranet.rodoparana.com.br",
    header: <SkeletonIntranet />,
    className: "md:col-span-1",
    icon: <Columns className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Central de Ajuda",
    description: (
      <span>Para quem precisa abrir um chamado solicitando ajuda.</span>
    ),
    href: "http://hesk.rodoparana.com.br",
    header: <SkeletonChamado />,
    className: "md:col-span-1",
    icon: <Box className="h-4 w-4 text-neutral-500" />,
  },
];
