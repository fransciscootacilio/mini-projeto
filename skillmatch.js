//Candidato
const candidato = {
    nome: "Francisco", 
    area: "Front-End",
    habilidades: [
        "HTML",
        "CSS",
        "javaScript",
        "Lógica de Programação",
        "Kanban"
    ],
    experiencia: 3,
};

// Criação da classe vaga
class Vaga {
    id = 0;
    empresa = "";
    cargo = "";
    requisitos = "";
    salario = 0;
    modalidade = "";
    constructor(id, empresa, cargo, requisitos, salario, modalidade) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this. salario = salario;
        this.modalidade = modalidade;
    }

    exibirResumo() {
        return `${this.cargo} na empresa ${this.empresa} (${this.modalidade}) – R$ ${this.salario}/mês`;
    }
}

class VagasFrontEnd  extends Vaga { 
    constructor (id, empresa, cargo, requisitos, salario, modalidade, nivel) {
        super(id, empresa, cargo, requisitos, salario, modalidade)
        this.nivel = nivel;
    }

    exibirNivel() {
        return `Nível de vaga ${this.nivel}`;
    }
}

// cadastro de arrays de vagas
const vagas = [
  {
    id: 1,
    empresa: "TechStart",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["JavaScript", "GitHub", "Lógica de Programação"],
    salario: 2800,
    modalidade: "Remoto"
  },
  {
    id: 2,
    empresa: "CodeLab",
    cargo: "Estágio Front-End",
    requisitos: ["JavaScript", "Kanban", "GitHub"],
    salario: 1800,
    modalidade: "Híbrido"
  },
  {
    id: 3,
    empresa: "WebSolutions",
    cargo: "Programador JavaScript Júnior",
    requisitos: ["JavaScript", "Arrays", "Objetos", "Funções"],
    salario: 3000,
    modalidade: "Presencial"
  }
]

function criarContadorDeAnalise() {
    let total = 0;

    return function() {
        total++;

        return total;
    };
}

const contadorAnalises = criarContadorDeAnalise();


// Classificação de compatibilidade
function classificarCompatibilidade(percentual) {
    if(percentual >=80) {
        return "Alta compatibilidade";
    }

    else if(percentual >=50) {
        return "Média compatibilidade";
    }

    else {
        return "Baixa Compatibilidade";
    }
}

//

function finalizarAnalise(nomeCandidato, callback) {
    console.log("\nAnalise finalizada")

    callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
    console.log(
        `${nome}, revise suas habilidades faltantes e atualize seu plano de estudo.`
    );
}

//Analisa vagas
function analisarVaga(vaga) {

    const habilidadesEncontradas = 
        vaga.requisitos.filter(requisito =>
            candidato.habilidades.includes(requisito)
        );

    const habilidadesFaltantes = 
        vaga.requisitos.filter(requisito => 
            !candidato.habilidades.includes(requisito)
        );

    const percuntual = 
        Math.round(
            (habilidadesEncontradas.length /
            vaga.requisitos.length) * 100
        );

//Classificação

    const classificacao = classificarCompatibilidade(percuntual);

    return {
        empresa: vaga.empresa,
        cargo: vaga.cargo,
        percuntual,
        classificacao,
        habilidadesEncontradas,
        habilidadesFaltantes
        };
}

//

function buscarVagas() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(vagas);
        }, 2000);
    });
}

//função que aprensanta as informações na tela
async function iniciarSistema() {
    console.log("SKILLMATCH JS")

    console.log(`Candidato: ${candidato.nome}`);
    console.log(`Área: ${candidato.area}`);
    console.log(
        `Habilidades: ${candidato.habilidades.join(", ")}`
        );

    console.log("\nAnalisando vagas...\n");

    const vagasCarregadas =
    await buscarVagas();

    const resultados =
    vagasCarregadas.map(vaga =>
        analisarVaga(vaga)
    );

      resultados.forEach(resultado => {

        console.log("==================================");

        console.log(`Empresa: ${resultado.empresa}`);

        console.log(`Cargo: ${resultado.cargo}`);

        console.log(
            `Compatibilidade: ${resultado.percentual}%`
        );

        console.log(
            `Classificação: ${resultado.classificacao}`
        );

        console.log(
            `Habilidades encontradas: ${resultado.habilidadesEncontradas.join(", ")}`
        );

        console.log(
            `Habilidades faltantes: ${resultado.habilidadesFaltantes.join(", ")}`
        );

        console.log("==================================");

        // closure
            console.log(
            `Análises realizadas: ${contadorAnalises()}`
        );
    });

    // REDUCE
    const melhorVaga =
        resultados.reduce((melhor, atual) => {

            if (atual.percentual > melhor.percentual) {
                return atual;
            }

            return melhor;
        });

    console.log("\n");
    console.log("==================================");
    console.log("VAGA MAIS COMPATÍVEL");
    console.log("==================================");

    console.log(
        `${melhorVaga.cargo} - ${melhorVaga.percentual}%`
    );

    // FIND
    const vagaAltaCompatibilidade =
        resultados.find(resultado =>
            resultado.percentual >= 80
        );

    if (vagaAltaCompatibilidade) {

        console.log("\nPrimeira vaga com alta compatibilidade:");

        console.log(vagaAltaCompatibilidade.cargo);
    }

    // EVERY
    const todasExigemJavaScript =
        vagas.every(vaga =>
            vaga.requisitos.includes("JavaScript")
        );

    console.log("\nTodas as vagas exigem JavaScript?");
    console.log(
        todasExigemJavaScript ? "Sim" : "Não"
    );

    // RECOMENDAÇÃO DE ESTUDOS
    console.log("\n==================================");
    console.log("RECOMENDAÇÃO DE ESTUDOS");
    console.log("==================================");

    // REDUCE
    const habilidadesParaEstudar =
        resultados.reduce((lista, resultado) => {

            resultado.habilidadesFaltantes.forEach(habilidade => {

                if (!lista.includes(habilidade)) {
                    lista.push(habilidade);
                }
            });

            return lista;

        }, []);

    console.log(
        `Priorize estudar: ${habilidadesParaEstudar.join(", ")}`
    );

    // CALLBACK
    finalizarAnalise(
        candidato.nome,
        exibirMensagemFinal
    );
}

// ==========================================
// EXECUTAR SISTEMA
// ==========================================
iniciarSistema();