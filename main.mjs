import { TarefaController } from "./Controller/TarefaController.mjs";

const controller = new TarefaController();

// Selecionar os elementos do DOM
const formTarefa = document.getElementById('form-tarefa');
const inputDescricao = document.getElementById('input-descricao');
const listaTarefas = document.getElementById('lista-tarefas');
const checkboxDatas = document.getElementById('check-datas');
const containerDatas = document.getElementById('container-datas');
const inputDataInicio = document.getElementById('input-data-inicio');
const inputDataFim = document.getElementById('input-data-fim');


const formatarData = (dataIso) => {
    if (!dataIso) return '';

    const isOnlyDate = dataIso.length === 10;
    const dt = isOnlyDate ? new Date(dataIso + 'T00:00:00') : new Date(dataIso);
    return dt.toLocaleDateString('pt-BR');
};


checkboxDatas.addEventListener('change', (e) => {
    if (e.target.checked) {
        containerDatas.classList.remove('d-none');
        containerDatas.classList.add('d-flex');
    } else {
        containerDatas.classList.add('d-none');
        containerDatas.classList.remove('d-flex');
        inputDataInicio.value = '';
        inputDataFim.value = '';
    }
});


function renderizarTarefas() {
    listaTarefas.innerHTML = '';
    const tarefas = controller.listarTarefas();

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = '<li class="list-group-item text-center text-muted py-5 fst-italic">Nenhuma tarefa encontrada. Adicione uma!</li>';
        return;
    }

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center p-3 fs-5 ${tarefa.concluida ? 'bg-light border-light-subtle' : ''}`;
        
        const textoContainer = document.createElement('div');
        textoContainer.className = 'd-flex align-items-center flex-grow-1 gap-3 text-break';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.className = 'form-check-input mt-0 shadow-sm';
        checkbox.style.cursor = 'pointer';
        checkbox.style.transform = 'scale(1.2)';
        checkbox.addEventListener('change', () => {
            controller.alternarConclusao(tarefa.id);
            renderizarTarefas();
        });

        const spanDescricao = document.createElement('span');
        spanDescricao.className = tarefa.concluida ? 'text-decoration-line-through text-muted' : 'fw-medium';
        spanDescricao.textContent = tarefa.descricao;

        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'd-flex mt-1 gap-2 flex-wrap';

        const criacaoBadge = document.createElement('span');
        criacaoBadge.className = 'badge bg-secondary-subtle text-secondary border border-secondary-subtle fw-normal';
        criacaoBadge.innerText = `Criada em: ${formatarData(tarefa.dataCriacao)}`;
        badgesContainer.appendChild(criacaoBadge);

        if (tarefa.dataInicio) {
            const inicioBadge = document.createElement('span');
            inicioBadge.className = 'badge bg-info-subtle text-info-emphasis border border-info-subtle fw-normal';
            inicioBadge.innerText = `Início: ${formatarData(tarefa.dataInicio)}`;
            badgesContainer.appendChild(inicioBadge);
        }

        if (tarefa.dataFim) {
            const fimBadge = document.createElement('span');
            fimBadge.className = 'badge bg-warning-subtle text-warning-emphasis border border-warning-subtle fw-normal';
            fimBadge.innerText = `Entrega: ${formatarData(tarefa.dataFim)}`;
            badgesContainer.appendChild(fimBadge);
        }

        const infoWrapper = document.createElement('div');
        infoWrapper.className = 'd-flex flex-column gap-1';
        infoWrapper.appendChild(spanDescricao);
        infoWrapper.appendChild(badgesContainer);

        textoContainer.appendChild(checkbox);
        textoContainer.appendChild(infoWrapper);

        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'd-flex gap-2 ms-3';

        const btnEditar = document.createElement('button');
        btnEditar.innerHTML = '<i class="bi bi-pencil-square"></i>';
        btnEditar.title = 'Editar tarefa';
        btnEditar.className = 'btn btn-outline-secondary btn-sm';
        btnEditar.addEventListener('click', () => {
            const novaDescricao = prompt("Edite a tarefa:", tarefa.descricao);
            if(novaDescricao !== null && novaDescricao.trim() !== '') {
                controller.atualizarTarefa(tarefa.id, { descricao: novaDescricao.trim() });
                renderizarTarefas();
            }
        });

        const btnRemover = document.createElement('button');
        btnRemover.innerHTML = '<i class="bi bi-trash"></i>';
        btnRemover.title = 'Excluir tarefa';
        btnRemover.className = 'btn btn-outline-danger btn-sm';
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


formTarefa.addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = inputDescricao.value.trim();
    const dataInicio = checkboxDatas.checked ? inputDataInicio.value : null;
    const dataFim = checkboxDatas.checked ? inputDataFim.value : null;

    if (descricao) {
        try {
            controller.adicionarTarefa(descricao, dataInicio, dataFim);
            inputDescricao.value = '';
            if (checkboxDatas.checked) {
                checkboxDatas.checked = false;
                checkboxDatas.dispatchEvent(new Event('change'));
            }
            renderizarTarefas();
        } catch (error) {
            alert(error.message);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderizarTarefas();
});
