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
        return `${this.cargo} na empresa ${this.empresa}`;
    }
}

class VagasFrontEnd  extends Vaga { 
    constructor (id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    this.nivel = nivel;
    }

    exibirNivel() {
        return `Nível de vaga ${this.nivel}`;
    }
}