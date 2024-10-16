// Funções auxiliares (continuam as mesmas)
export function separarDocumentoESerie(docCompleto: string): { documento: string; serie: string } {
	const [documento, serie] = docCompleto.split(' - ').map((part) => part.trim());
	return { documento: documento || '', serie: serie || '' };
}

export function separarClienteLoja(clienteCompleto: string): { cliente: string; loja: string } {
	const [cliente, loja] = clienteCompleto.split(' - ').map((part) => part.trim());
	return { cliente: cliente || '', loja: loja || '' };
}