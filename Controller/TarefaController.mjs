import { Tarefa } from "../model/tarefaModel.mjs";
import { TarefaService } from "../services/TarefaService.mjs";

export class TarefaController {
    constructor() {
        this.service = new TarefaService();
    }

    adicionarTarefa(descricao) {
        Tarefa.Validar(descricao);
        const novaTarefa = new Tarefa(descricao);
        const tarefas = this.service.buscarTodas();
        tarefas.push(novaTarefa);
        this.service.salvarTodas(tarefas);
        return novaTarefa;
    }

    listarTarefas() {
        return this.service.buscarTodas();
    }

    atualizarTarefa(id, novosDados) {
        const tarefas = this.service.buscarTodas();
        const index = tarefas.findIndex(t => t.id === id);
        if (index !== -1) {
            Object.assign(tarefas[index], novosDados);
            this.service.salvarTodas(tarefas);
        }
    }

    removerTarefa(id) {
        let tarefas = this.service.buscarTodas();
        tarefas = tarefas.filter(t => t.id !== id);
        this.service.salvarTodas(tarefas);
    }

    alternarConclusao(id) {
        const tarefas = this.service.buscarTodas();
        const index = tarefas.findIndex(t => t.id === id);
        if (index !== -1) {
            tarefas[index].concluida = !tarefas[index].concluida;
            this.service.salvarTodas(tarefas);
        }
    }
}
