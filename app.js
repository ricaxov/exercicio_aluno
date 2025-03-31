// Array para armazenar os alunos
let alunos = [];
let alunoEditando = null;

// Classe Aluno
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = Number(idade);
        this.curso = curso;
        this.notaFinal = Number(notaFinal);
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
    }
}

// Função para renderizar a tabela de alunos
const renderTabela = () => {
    const tabela = document.getElementById('tabelaAlunos');
    tabela.innerHTML = '';
    alunos.forEach((aluno, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>${aluno.isAprovado() ? 'Sim' : 'Não'}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
};

// Função para adicionar ou atualizar aluno
const salvarAluno = (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('notaFinal').value;

    if (alunoEditando !== null) {
        // Atualiza o aluno
        alunos[alunoEditando] = new Aluno(nome, idade, curso, notaFinal);
        alert("Aluno atualizado com sucesso!");
        alunoEditando = null;
    } else {
        // Adiciona novo aluno
        const novoAluno = new Aluno(nome, idade, curso, notaFinal);
        alunos.push(novoAluno);
        alert("Aluno cadastrado com sucesso!");
    }
    document.getElementById('alunoForm').reset();
    renderTabela();
};

// Função para editar aluno
const editarAluno = (index) => {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('notaFinal').value = aluno.notaFinal;
    alunoEditando = index;
};

// Função para excluir aluno
const excluirAluno = (index) => {
    if (confirm("Deseja realmente excluir este aluno?")) {
        alunos.splice(index, 1);
        alert("Aluno excluído com sucesso!");
        renderTabela();
    }
};

// Eventos do formulário
document.getElementById('alunoForm').addEventListener('submit', salvarAluno);

// Funções para relatórios

// 1. Listar alunos aprovados
document.getElementById('relAprovados').addEventListener('click', () => {
    const aprovados = alunos.filter(aluno => aluno.isAprovado());
    let relatorio = '<h3>Alunos Aprovados:</h3>';
    aprovados.forEach(aluno => {
        relatorio += `<p>${aluno.toString()}</p>`;
    });
    document.getElementById('relatorioResultado').innerHTML = relatorio;
});

// 2. Média das notas finais
document.getElementById('mediaNotas').addEventListener('click', () => {
    if (alunos.length === 0) {
        alert("Nenhum aluno cadastrado.");
        return;
    }
    const somaNotas = alunos.reduce((soma, aluno) => soma + aluno.notaFinal, 0);
    const media = somaNotas / alunos.length;
    document.getElementById('relatorioResultado').innerHTML = `<h3>Média das Notas Finais: ${media.toFixed(2)}</h3>`;
});

// 3. Média das idades
document.getElementById('mediaIdades').addEventListener('click', () => {
    if (alunos.length === 0) {
        alert("Nenhum aluno cadastrado.");
        return;
    }
    const somaIdades = alunos.reduce((soma, aluno) => soma + aluno.idade, 0);
    const media = somaIdades / alunos.length;
    document.getElementById('relatorioResultado').innerHTML = `<h3>Média das Idades: ${media.toFixed(2)}</h3>`;
});

// 4. Listar os nomes dos alunos em ordem alfabética
document.getElementById('nomesOrdenados').addEventListener('click', () => {
    const nomes = alunos.map(aluno => aluno.nome);
    nomes.sort();
    let relatorio = '<h3>Nomes em Ordem Alfabética:</h3>';
    nomes.forEach(nome => {
        relatorio += `<p>${nome}</p>`;
    });
    document.getElementById('relatorioResultado').innerHTML = relatorio;
});

// 5. Mostrar a quantidade de alunos por curso
document.getElementById('quantCurso').addEventListener('click', () => {
    const contagem = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});
    let relatorio = '<h3>Quantidade de Alunos por Curso:</h3>';
    for (const curso in contagem) {
        relatorio += `<p>${curso}: ${contagem[curso]}</p>`;
    }
    document.getElementById('relatorioResultado').innerHTML = relatorio;
});
