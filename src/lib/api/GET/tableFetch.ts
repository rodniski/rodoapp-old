import { authStore } from '$stores';
export const tableFetching = async <T>(
	endpoint: string,
	sortBy: string,
	sortOrder: string,
	page: number = 1,
	pageSize: number = 10,
	filters: Record<string, any> = {},
	additionalHeaders: Record<string, string> = {}
): Promise<{ data: T[]; hasMore: boolean }> => {
	try {
		// Resgatando o token dos cookies usando js-cookie
		let token = '';
		authStore.subscribe((authState) => {
			token = authState.token;
		});

		const headers = new Headers({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}` // Incluindo o token no header Authorization
		});

		// Adiciona os filtros nos headers dinamicamente
		Object.keys(filters).forEach((column) => {
			if (filters[column]) {
				headers.append(`X-Filter-${column}`, filters[column]);
				console.log(`Filtro aplicado: X-Filter-${column} = ${filters[column]}`);
			}
		});

		// Adiciona headers adicionais
		Object.keys(additionalHeaders).forEach((key) => {
			if (additionalHeaders[key]) {
				headers.append(key, additionalHeaders[key]);
				console.log(`Header adicionado: ${key} = ${additionalHeaders[key]}`);
			}
		});

		// Log dos headers
		headers.forEach((value, key) => {
			console.log(`Header: ${key} = ${value}`);
		});

		const config = {
			method: 'GET',
			headers: headers
		};

		const response = await fetch(`http://rodoapp:8080/${endpoint}`, config);

		if (!response.ok) {
			throw new Error(`Erro na requisição da página ${page}: ${response.status}`);
		}

		const result = await response.json();

		return {
			data: result as T[],
			hasMore: result.length === pageSize
		};
	} catch (error) {
		console.error('Erro ao buscar os dados:', error);
		return { data: [], hasMore: false };
	}
};
