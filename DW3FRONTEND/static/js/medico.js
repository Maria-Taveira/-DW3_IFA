// dw3frontend/static/js/medico.js
// 1. Inicialização do Modal e Formulário
const modalMedManutencao = new bootstrap.Modal(document.getElementById('modalMedManutencao'));
const formMedManutencao = document.getElementById('formManutencao');

window.onload = function () {
    carregarMedico();
};

//carregar medico
async function carregarMedico() {
    const listaBody = document.getElementById('listaMedico');
    listaBody.innerHTML = '<tr><td colspan="6">Carregando dados...</td></tr>';

    const response = await fetchAPI('/getAllMedico', {
        method: 'GET'
    });

    listaBody.innerHTML = '';

    if (response.status === 'ok' && response.registro) {
        
        if ($.fn.DataTable.isDataTable('#dataTableMedico')) {
            $('#dataTableMedico').DataTable().destroy();
        }

        response.registro.forEach(medico => {
            const row = listaBody.insertRow();
            row.insertCell(0).textContent = medico.medicoid;
            row.insertCell(1).textContent = medico.nome;
            row.insertCell(4).textContent = medico.especialidade;

            const acoesCell = row.insertCell(5);
            acoesCell.innerHTML = `
                <button class="btn btn-sm btn-info me-2" title="Editar" onclick="abrirModalEdicao(${medico.medicoid})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" title="Excluir (Soft Delete)" onclick="deletarTutor(${medico.medicoid}, '${medico.nome}')">
                    <i class="fas fa-trash"></i>
                </button>
            `;
        });
        
        $('#dataTableMedico').DataTable(); 

    } else {
        listaBody.innerHTML = '<tr><td colspan="6" class="text-danger">Não foi possível carregar os medicos. Erro: ' + (response.message || 'Desconhecido') + '</td></tr>';
    }
}



//abrir cadastro medico
function abrirModalCadastro() {
    document.getElementById('modalLabel').textContent = 'Cadastro de Novo Medico';
    formMedManutencao.reset();
    document.getElementById('medicoid').value = 0;
    modalMedManutencao.show();
}


async function abrirModalEdicao(id) {
    document.getElementById('modalLabel').textContent = 'Edição de medico (ID: ' + id + ')';
    formMedManutencao.reset();
    document.getElementById('medicoid').value = id;

    const response = await fetchAPI('/getMedicoByID', {
        method: 'POST',
        body: JSON.stringify({ medicoid: id })
    });
    
    if (response.status === 'ok' && response.registro && response.registro.length > 0) {
        const tutor = response.registro[0];
        document.getElementById('nome').value = medico.nome;
        document.getElementById('bairro').value = medico.id;
        document.getElementById('cidade').value = medico.especialidade;
        
        modalMedManutencao.show();
    } else {
        alert('Erro: Medico não encontrado ou falha na API.');
    }
}




//salvar medico
async function salvarMedico() {
    const id = document.getElementById('medicoid').value;
    const isUpdate = id !== '0';
    
    const formData = new FormData(formMedManutencao);
    const medicoData = Object.fromEntries(formData.entries());

    const endpoint = isUpdate ? '/updateMedico' : '/insertMedico';
    
    const response = await fetchAPI(endpoint, {
        method: 'POST',
        body: JSON.stringify(medicoData)
    });

    if (response.status === 'ok') {
        alert(isUpdate ? 'medico atualizado com sucesso!' : 'medico cadastrado com sucesso!');
        modalMedManutencao.hide();
        carregarMedico();
    } else {
        alert('Falha ao salvar. Erro: ' + (response.message || response.status));
    }
}



 //soft delete
async function deletarMedico(id, nome) {
    if (confirm(`Deseja realmente desativar (Soft Delete) o medico ${nome} (ID: ${id})?`)) {
        
        const response = await fetchAPI('/deleteMedico', {
            method: 'POST',
            body: JSON.stringify({ medicoid: id })
        });

        if (response.status === 'ok' && response.linhasAfetadas > 0) {
            alert('Medico desativado com sucesso.');
            carregarMedico();
        } else {
            alert('Falha ao desativar. O registro pode já ter sido removido. Erro: ' + (response.message || 'Desconhecido'));
        }
    }
}