type Reserva = {
    id: number,
    reservavel_id: number,
    responsavel_id: number,
    inicio: Date,
    devolucao_prevista: Date,
    devolucao: Date | undefined,
    descricao: string,
    reservavel: Reservavel
}
