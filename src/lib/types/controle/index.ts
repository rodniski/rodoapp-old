export interface Borracharia {
	Filial: string;
	NF: string;
	Vendedor: string;
	Cliente: string;
	Produto: string;
	TipoMov: string;
	Emissao: string;
}

export interface Conferencia {
	Filial: string;
	NF: string;
	Cliente: string;
	Produto: string;
	TipoMov: string;
	DataHora: string;
	Responsavel: string;
	Placa: string;
	Observacao: string;
	Seq: string;
	Saldo: number;
	actions?: () => void;
}

export interface Historico {
	Filial: string;
	NF: string;
	Vendedor: string;
	Cliente: string;
	Produto: string;
	DataHora: string;
	Responsavel: string;
	Placa: string;
	Observacao: string;
	DataConf: string;
	Seq: string;
	Saldo: number;
	actions?: () => void;
}

export interface ItemNF {
	quantity: number;
	D2_ITEM: string;
	D2_COD: string;
	B1_DESC: string;
	SALDO: number;
}
