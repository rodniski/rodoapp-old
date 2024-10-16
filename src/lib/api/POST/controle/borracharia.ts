// src/lib/api/protheusApi.ts

export async function incluirItemPortaria(body: any) {
	try {
		const response = await fetch('http://protheus-vm:9010/rest/MovPortaria/IncluirItem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			throw new Error(`Erro ao incluir item: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Erro ao incluir item: ${error.message}`);
	}
}
