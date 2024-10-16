<div class="flex flex-col items-center justify-center h-screen">
    <!-- Texto principal com animação refinada -->
    <div class="flex w-full flex-col items-center justify-center text-center animate-fadeInSlideUp mb-10">
      <h1 class="text-5xl md:text-7xl font-bold leading-relaxed">
        Lançaremos em <span class="text-error animate-pulse">breve...</span>
      </h1>
      <p class="text-xl md:text-3xl mt-4 text-neutral-700 dark:text-neutral-300">
        Nossos desenvolvedores ainda estão trabalhando no RodoApp. Fique ligado para novidades!
      </p>
    </div>
  
    <!-- Imagem centralizada com animação suave -->
    <div class="flex h-[45vh] w-full items-center justify-center animate-fadeInSlow">
      <img
        src="/soon.png"
        alt="coming soon"
        class="h-[100%] max-w-full object-contain transform transition-transform duration-500 hover:scale-105"
      />
    </div>
  </div>
  
  <style>
    @keyframes fadeInSlideUp {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  
    /* Classe de animação personalizada para fade-in e slide-up */
    .animate-fadeInSlideUp {
      animation: fadeInSlideUp 1.5s ease forwards;
    }
  
    /* Fade-in mais lento para a imagem */
    .animate-fadeInSlow {
      animation: fadeIn 2s ease forwards;
    }
  </style>
  