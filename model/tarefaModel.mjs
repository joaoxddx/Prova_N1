export class Tarefa {
    constructor(descricao, concluida = false, id = null, dataCriacao = null, dataInicio = null, dataFim = null) {
        this.id = id || Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.descricao = descricao;
        this.concluida = concluida;
        this.dataCriacao = dataCriacao || new Date().toISOString();
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    static Validar(descricao, dataInicio, dataFim) {
        if (descricao == null || descricao.trim() === "") {
            throw new Error("Descrição é obrigatória");
        }
        if (dataInicio && dataFim && dataFim < dataInicio) {
            throw new Error("A data de entrega não pode ser anterior à data de início");
        }
    }
}