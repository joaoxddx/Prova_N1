export class Tarefa {
    constructor(descricao, concluida = false, id = null) {
        this.id = id || Date.now().toString(36) + Math.random().toString(36).substring(2);
        this.descricao = descricao;
        this.concluida = concluida;
    }
    
    static Validar(descricao){
        if(descricao == null || descricao.trim() === ""){
            throw new Error("Descrição é obrigatória");
        }
    }
}