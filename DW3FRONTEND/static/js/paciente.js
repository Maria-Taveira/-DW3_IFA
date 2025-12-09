// dw3frontend/static/js/paciente.js

const formManutencaoPet = document.getElementById('formPacManutencao');
const params = new URLSearchParams(window.location.search);
const pacienteId = params.get('pacienteid') || 0;
const isEdicao = pacienteId !== 0;

window.onload = function () {
    if (document.getElementById('listaPaciente')) {
        carregarPaciente();
    }
    
    if (document.getElementById('formPacManutencao')) {
        carregarMedicoSelect()
            .then(() => {
                if (isEdicao) {
                    document.getElementById('manutencaoTitulo').textContent = `Editar Paciente (ID: ${pacienteId})`;
                    carregarDadosPaciente(pacienteId); 
                } else {
                    document.getElementById('pacienteid').value = 0;
                    document.getElementById('manutencaoTitulo').textContent = 'Cadastrar Novo Paciente';
                }
            });
    }
};

//mostra medico
async function carregarMedicoMap() {
    const response = await fetchAPI('/getAllMedico', { method: 'GET' });
    const medicoMap = {};
    if (response.status === 'ok' && response.registro) {
        response.registro.forEach(medico => {
            medicoMap[medico.medicoid] = medico.nome;
        });
    }
    return medicoMap;
}

//abre o form
function abrirPacManutencao(id = 0) {
    if (id === 0) {
        window.location.href = '/paciente/manutencao';
    } else {
        window.location.href = `/paciente/manutencao?pacienteid=${id}`;
    }
}


//mostra pacientes
async function carregarPaciente() {
    const listaBody = document.getElementById('listaPaciente');
    listaBody.innerHTML = '<tr><td colspan="6">Carregando dados...</td></tr>';

    const response = await fetchAPI('/getAllPaciente', { method: 'GET' });

    listaBody.innerHTML = '';

    if (response.status === 'ok' && response.registro) {
        if ($.fn.DataTable.isDataTable('#dataTablePaciente')) {
            $('#dataTablePaciente').DataTable().destroy();
        }

        response.registro.forEach(paciente => {
            const row = listaBody.insertRow();
            row.insertCell(0).textContent = paciente.pacienteid;
            row.insertCell(1).textContent = paciente.nome;
            row.insertCell(3).textContent = paciente.datanascimento ? paciente.datanascimento.split('T')[0] : '';
            
            row.insertCell(4).textContent = paciente.nome_medico; 
            
            const acoesCell = row.insertCell(5);
            acoesCell.innerHTML = `
                <button class="btn btn-sm btn-info me-2" title="Editar" onclick="abrirPacManutencao(${paciente.pacienteid})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" title="Excluir (Soft Delete)" onclick="deletarPaciente(${paciente.pacienteid}, '${paciente.nome}')">
                    <i class="fas fa-trash"></i>
                </button>
            `;
        });
        $('#dataTablePaciente').DataTable();
    } else {
        listaBody.innerHTML = '<tr><td colspan="6" class="text-danger">Erro ao carregar.</td></tr>';
    }
}


//soft delte
async function deletarPaciente(id, nome) {
    if (confirm(`Deseja realmente desativar (Soft Delete) o paciente ${nome} (ID: ${id})?`)) {
        
        const response = await fetchAPI('/deletePaciente', {
            method: 'POST',
            body: JSON.stringify({ pacienteid: id })
        });

        if (response.status === 'ok' && response.linhasAfetadas > 0) {
            alert('Paciente desativado com sucesso.');
            carregarPaciente();
        } else {
            alert('Falha ao desativar. Erro: ' + (response.message || 'Desconhecido'));
        }
    }
}


async function carregarMedicoSelect() {
    const selectMedico = document.getElementById('medicoid');
    selectMedico.innerHTML = '<option value="">Carregando...</option>';

    const response = await fetchAPI('/getAllMedico', { method: 'GET' });

    if (response.status === 'ok' && response.registro) {
        selectMedico.innerHTML = '<option value="">-- Selecione um Medico --</option>';
        response.registro.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.medicoid;
            option.textContent = `${medico.nome} (ID: ${medico.medicoid})`; 
            selectMedico.appendChild(option);
        });
    } else {
        selectMedico.innerHTML = '<option value="">Erro ao carregar Medico</option>';
        document.getElementById('mensagemErro').textContent = 'Erro ao carregar lista de Medicos.';
    }
    return Promise.resolve();
}

//mostra as info dos pacientes
async function carregarDadosPaciente(id) {
    document.getElementById('pacienteid').value = id;
    document.getElementById('mensagemErro').textContent = 'Carregando dados...';

    const response = await fetchAPI('/getPetByID', {
        method: 'POST',
        body: JSON.stringify({ pacienteid: id })
    });
    
    document.getElementById('mensagemErro').textContent = '';

    if (response.status === 'ok' && response.registro && response.registro.length > 0) {
        const paciente = response.registro[0];
        document.getElementById('nome').value = paciente.nome;
        document.getElementById('datanascimento').value = paciente.data_nascimento.split('T')[0];
        document.getElementById('medicoid').value = paciente.medicoid; 
        
    } else {
        document.getElementById('mensagemErro').textContent = 'Erro ao carregar os dados do Paciente.';
        alert('Erro: Paciente não encontrado ou falha na API.');
    }
}


//salva o paciente
async function salvarPaciente() {
    if (!document.getElementById('nome').value || !document.getElementById('medicoid').value) {
        document.getElementById('mensagemErro').textContent = 'Erro: Nome do paciente e medico são obrigatórios.';
        return;
    }

    const id = document.getElementById('pacienteid').value;
    const isUpdate = id !== '0';
    
    const formData = new FormData(formPacManutencao);
    const pacData = Object.fromEntries(formData.entries());

    pacData.deleted = false; 

    const endpoint = isUpdate ? '/updatePacientes' : '/insertPacientes';
    
    document.getElementById('mensagemErro').textContent = 'Salvando...';

    const response = await fetchAPI(endpoint, {
        method: 'POST',
        body: JSON.stringify(petData)
    });

    document.getElementById('mensagemErro').textContent = '';

    if (response.status === 'ok') {
        alert(isUpdate ? 'Paciente atualizado com sucesso!' : 'Paciente cadastrado com sucesso!');
        window.location.href = '/paciente'; 
    } else {
        document.getElementById('mensagemErro').textContent = 'Falha ao salvar. Erro: ' + (response.message || response.status);
        alert('Falha ao salvar. Verifique o console.');
    }
}