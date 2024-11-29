import { motion } from "framer-motion";
import { Badge } from "ui";
import Link from "next/link";

//* - SKELETON DO APP DE PRÉ NOTAS \\

export const SkeletonLancamento = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 p-2 bg-white rounded-full border border-neutral-100 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <Link href="/Inicio/Lancamentos/Visualizacao" className="group">
          <motion.span
            initial={{ backgroundPosition: "0% 50%", color: "#6b7280" }}
            whileHover={{
              backgroundPosition: "100% 50%",
              color: "transparent",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="font-sans text-sm font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-violet-500"
            style={{
              backgroundSize: "200% 100%",
              display: "inline-block",
            }}
          >
            Ver Pré Notas
          </motion.span>
        </Link>
      </motion.div>

      <motion.div
        variants={variantsSecond}
        className="flex items-center justify-end space-x-2 p-2 ml-auto w-3/4 bg-white rounded-full border border-neutral-100 dark:border-white/[0.2] dark:bg-black"
      >
        <Link href="/Inicio/Lancamentos/XML" className="group">
          <motion.span
            initial={{ backgroundPosition: "0% 50%", color: "#6b7280" }}
            whileHover={{
              backgroundPosition: "100% 50%",
              color: "transparent",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="font-sans text-sm font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-violet-500"
            style={{
              backgroundSize: "200% 100%",
              display: "inline-block",
            }}
          >
            Importar XML
          </motion.span>
        </Link>
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>

      <motion.div
        variants={variants}
        className="group flex items-center space-x-2 p-2 bg-white rounded-full border border-neutral-100 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 " />
        <Link href="/Inicio/Lancamentos/Manual" className="">
          <motion.span
            initial={{ backgroundPosition: "0% 50%", color: "#6b7280" }}
            whileHover={{
              backgroundPosition: "100% 50%",
              color: "transparent",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="font-sans text-sm font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-violet-500"
            style={{
              backgroundSize: "200% 100%",
              display: "inline-block",
            }}
          >
            Importar manualmente
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

//* - SKELETON DA CENTRAL DE ENTREGA DE PNEUS \\

const links = [
  {
    href: "/Inicio/Controle/Borracharia",
    text: "Entregar Pneus",
    badge: "Borracharia",
    variants: {
      initial: { x: 20, rotate: -5 },
      hover: { x: 0, rotate: 0 },
    },
  },
  {
    href: "/Inicio/Controle/Portaria",
    text: "Conferir saída de Pneus",
    badge: "Portaria",
    variants: null, // Sem animações específicas
  },
  {
    href: "/Inicio/Controle/Historico",
    text: "Ver Timeline de Movimentações",
    badge: "Histórico",
    variants: {
      initial: { x: -20, rotate: 5 },
      hover: { x: 0, rotate: 0 },
    },
  },
];

export const SkeletonBorracharia = () => (
  <motion.div
    initial="initial"
    animate="animate"
    whileHover="hover"
    className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
  >
    {links.map(({ href, text, badge, variants }, index) => (
      <Link key={index} href={href} className="w-1/3 group">
        <motion.div
          variants={variants || undefined}
          className="
            flex flex-col items-center justify-center gap-2 h-full w-full p-4
            rounded-lg border shadow hover:shadow-sm
            bg-background
          "
        >
          <p
            className="
              sm:text-sm text-xs text-center font-bold 
              text-foreground/60 transition duration-300 ease-in-out bg-clip-text
              group-hover:text-transparent group-hover:bg-gradient-to-r 
              group-hover:from-cyan-500 group-hover:to-sky-400
              hover:text-transparent hover:bg-gradient-to-r hover:from-cyan-500 hover:to-sky-400
            "
          >
            {text}
          </p>
          <Badge className="bg-gradient-to-r from-sky-400 to-cyan-600">
            {badge}
          </Badge>
        </motion.div>
      </Link>
    ))}
  </motion.div>
);

//* - SKELETON DO GERADOR DE ASSINATURA \\

export const SkeletonSignature = () => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={{
      initial: { backgroundPosition: "0 50%" },
      animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2] rounded-lg"
    style={{
      background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
      backgroundSize: "400% 400%",
    }}
  />
);

//* - SKELETON DA INTRANET \\

export const SkeletonIntranet = () => (
  <motion.div
    initial="initial"
    animate="animate"
    whileHover="hover"
    className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.div
        key={i}
        variants={{
          initial: { width: 0 },
          animate: {
            width: "100%",
            transition: { duration: 0.2 },
          },
          hover: { width: ["0%", "100%"], transition: { duration: 2 } },
        }}
        style={{ maxWidth: `${Math.random() * (100 - 40) + 40}%` }}
        className="flex flex-row items-center space-x-2 p-2 w-full h-4 rounded-full border border-neutral-100 bg-neutral-100 dark:bg-black dark:border-white/[0.2]"
      />
    ))}
  </motion.div>
);

//* - SKELETON DE CHAMADOS \\

const variants = {
  initial: { x: 0 },
  animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
};
const variantsSecond = {
  initial: { x: 0 },
  animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
};
export const SkeletonChamado = () => (
  <motion.div
    initial="initial"
    whileHover="animate"
    className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2 bg-dot-black/[0.2] dark:bg-dot-white/[0.2]"
  >
    <motion.div
      variants={variants}
      className="flex flex-row items-start space-x-2 p-2 w-full rounded-2xl border border-neutral-100 bg-white dark:bg-black dark:border-white/[0.2]"
    >
      <p className="text-xs text-neutral-500">
        Bom dia! Você poderia me ajudar com...
      </p>
    </motion.div>
    <motion.div
      variants={variantsSecond}
      className="flex items-center justify-end space-x-2 p-2 w-3/4 ml-auto rounded-full border border-neutral-100 bg-white dark:bg-black dark:border-white/[0.2]"
    >
      <p className="text-xs text-neutral-500">Abra um chamado.</p>
      <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
    </motion.div>
  </motion.div>
);
