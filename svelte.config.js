import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			$lib: 'src/lib', // Alias para a pasta lib
			$components: 'src/lib/components', // Alias para componentes
			$utils: 'src/lib/utils', // Alias para utilitários
			$stores: 'src/lib/stores', // Alias para stores globais
			$api: 'src/lib/api', // Alias para serviços de API
			$pages: 'src/lib/pages',
			$types: 'src/lib/types', // Alias para tipos TypeScript globais
			$hooks: 'src/lib/hooks' // Alias para hooks personalizados
		},
		adapter: adapter()
	}
};

export default config;
