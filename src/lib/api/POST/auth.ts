// src/lib/api/auth.ts

export async function loginToProtheus(username: string, password: string) {
	const myHeaders = new Headers();
	myHeaders.append('grant_type', 'password');
	myHeaders.append('username', username);
	myHeaders.append('password', password);

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		redirect: 'follow' as const
	};

	// Fazendo a requisição ao web service do Protheus
	console.log('Enviando requisição para o Protheus com:', { username, password });

	const res = await fetch('http://protheus-app:8400/rest/api/oauth2/v1/token', requestOptions);

	// Verifica se a resposta foi bem-sucedida
	if (!res.ok) {
		const result = await res.text(); // Pode retornar uma mensagem de erro
		console.log('Erro na resposta do Protheus:', result);
		throw new Error(result || 'Falha no login');
	}

	// Se sucesso, retorna o JSON da resposta
	const data = await res.json();
	console.log('Resposta do Protheus:', data);
	return data;
}
