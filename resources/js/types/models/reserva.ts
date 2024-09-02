type Reserva = {
    id: number,
    reservavel: Reservavel,
    responsavel_id: number,
    inicio: number,
    devolucao_prevista: number,
    devolucao: Date | undefined,
    descricao: string
}
