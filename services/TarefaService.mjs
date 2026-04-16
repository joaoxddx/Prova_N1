import { Tarefa } from "../model/tarefaModel.mjs";

export class TarefaService {
    constructor() {
        this.STORAGE_KEY = 'tarefas_app';
    }
    
    salvarTodas(tarefas) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tarefas));
    }

    buscarTodas() {
        const tarefasStr = localStorage.getItem(this.STORAGE_KEY);
        if (tarefasStr) {
            const tarefasParsed = JSON.parse(tarefasStr);
            return tarefasParsed.map(t => new Tarefa(t.descricao, t.concluida, t.id));
        }
        return [];
    }
}