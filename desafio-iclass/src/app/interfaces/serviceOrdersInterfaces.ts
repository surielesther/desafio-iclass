export interface IServiceOrder{
    clusterName: string,
    createdDate_begin: string,
    createdDate_end: string,
    serviceOrderCode?: string,
    customerName?: string,
    ssn?: string,
    thirdPartyCode?: string,
    statuses?: number[],
    updatedDate_begin?: string,
    updatedDate_end?: string,
    closedBy?: string,
    pagenumber?: number,
    pagesize?: number,
    orderBy?: string[],
    
}

export interface IServiceResponse {
    currentpage?: number,
    pagesize?: number,
    objects?: [{
        id?: number,
        codigo?: string,
        contrato?: {
            codigo?: string,
            nomeTitular?: string,
            segmentacaoClienteId?: number,
            cpf?: string,
            email?: string,
            celular?: string,
            tipoIdentificacao?: number
        },
        operadora?: {
            nome?: string
        },
        credenciada?: {
            codigo?: string,
            nome?: string
        },
        node?: {
            codigo?: string,
            descricao?: string
        },
        tipoOs?: {
            descricao?: string,
            resumoTipoOs?: string
        },
        endereco?: {
            numero?: string,
            logradouro?: string,
            cidade?: string,
            estado?: string,
            pais?: string,
            latitude?: number,
            longitude?: number
        },
        status?: {
            id?: number,
            descricao?: string
        },
        criadoPor?: {
            nome?: string,
            login?: string,
            data?: string
        },
        alteradoPor?: {
            nome?: string,
            login?: string,
            data?: string
        },
        coordenadasFechamento?: {},
        equipe?: {
            login?: string,
            tecnico?: string,
            fone1?: string,
            status?: string,
            tipoEquipe?: string,
            email?: string,
            ativo?: string
        },
        dataAgendamento?:string,
        dataSolicitacao?: string,
        historicoStatus?: string,
        procedimentos?: string,
        pesquisas?: string,
        materiais?: string,
        ativos?: string,
        historicoAtivos?: string,
        despesas?: string
    },],
    offset?: number
}