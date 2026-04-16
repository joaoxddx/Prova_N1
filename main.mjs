import { TarefaController } from "./Controller/TarefaController.mjs";

const controller = new TarefaController();

// Selecionar os elementos do DOM
const formTarefa = document.getElementById('form-tarefa');
const inputDescricao = document.getElementById('input-descricao');
const listaTarefas = document.getElementById('lista-tarefas');

// Função para renderizar a lista de tarefas
function renderizarTarefas() {
    listaTarefas.innerHTML = '';
    const tarefas = controller.listarTarefas();

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = '<li class="empty-state">Nenhuma tarefa encontrada. Adicione uma!</li>';
        return;
    }

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = 'tarefa-item' + (tarefa.concluida ? ' concluida' : '');
        
        const textoContainer = document.createElement('div');
        textoContainer.className = 'tarefa-texto';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.className = 'tarefa-checkbox';
        checkbox.addEventListener('change', () => {
            controller.alternarConclusao(tarefa.id);
            renderizarTarefas();
        });

        const spanDescricao = document.createElement('span');
        spanDescricao.textContent = tarefa.descricao;

        textoContainer.appendChild(checkbox);
        textoContainer.appendChild(spanDescricao);

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'tarefa-actions';

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.addEventListener('click', () => {
            const novaDescricao = prompt("Edite a tarefa:", tarefa.descricao);
            if(novaDescricao !== null && novaDescricao.trim() !== '') {
                controller.atualizarTarefa(tarefa.id, { descricao: novaDescricao.trim() });
                renderizarTarefas();
            }
        });

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Excluir';
        btnRemover.className = 'btn-excluir';
        btnRemover.addEventListener('click', () => {
            if(confirm("Tem certeza que deseja remover esta tarefa?")) {
                controller.removerTarefa(tarefa.id);
                renderizarTarefas();
            }
        });

        actionsContainer.appendChild(btnEditar);
        actionsContainer.appendChild(btnRemover);

        li.appendChild(textoContainer);
        li.appendChild(actionsContainer);
        listaTarefas.appendChild(li);
    });
}

// Evento de submissão do formulário
formTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = inputDescricao.value.trim();
    if (descricao) {
        try {
            controller.adicionarTarefa(descricao);
            inputDescricao.value = '';
            renderizarTarefas();
        } catch (error) {
            alert(error.message);
        }
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarTarefas();
});
