import { Tags } from "../model/enumTags";
import { Data } from "../model/interfaceData";
import { readCSV } from "../model/readCSV";
import { writeCSV } from "../model/writeCSV";

const filePath =
  "/home/dudu-soliveira/Desktop/iJunior/semana2/model/estoque.csv";

// Não entendi como fazer a função readCSV retornar um array de Data
export class estoqueService {
  constructor() {}

  validaData(data: Data): void {
    if (typeof data.nome !== "string") {
      throw new Error("Nome inválido.");
    }

    if (isNaN(data.peso) || data.peso <= 0) {
      throw new Error("Peso inválido.");
    }

    if (isNaN(data.quantidade) || data.quantidade <= 0) {
      throw new Error("Quantidade inválida.");
    }

    if (!data.tags.every((tag) => Object.values(Tags).includes(tag))) {
      throw new Error("Tag(s) inválida(s).");
    }

    if (isNaN(data.valor) || data.valor <= 0) {
      throw new Error("Valor inválido.");
    }
  }

  async criar(data: Data) {
    this.validaData(data);

    const dados = await readCSV(filePath);

    data.id = dados.length;
    data.removido = false;
    dados.push(data);

    await writeCSV(filePath, dados);
  }

  async buscar(id: number) {
    const dados = await readCSV(filePath);

    if (isNaN(id) || id < 0 || id >= dados.length) {
      throw new Error("Id inválida.");
    }

    if (dados[id].removido === "true") throw new Error("Produto removido.");

    return dados[id];
  }

  async remover(id: number) {
    const dados = await readCSV(filePath);

    dados[id].removido = true;

    await writeCSV(filePath, dados);
  }

  async listar() {
    return (await readCSV(filePath)).filter(
      (data) => data.removido === "false"
    );
  }

  async valorTotalEstoque() {
    const dados = await readCSV(filePath);

    const valorTotal = dados.reduce((acc, data) => {
      if (data.removido === "false") {
        return acc + parseFloat(data.valor) * parseInt(data.quantidade, 10);
      } else {
        return acc;
      }
    }, 0);

    return valorTotal;
  }

  async pesoTotalEstoque() {
    const dados = await readCSV(filePath);

    const pesoTotal = dados.reduce((acc, data) => {
      if (data.removido === "false") {
        return acc + parseFloat(data.peso) * parseInt(data.quantidade, 10);
      } else {
        return acc;
      }
    }, 0);

    return pesoTotal / 1000;
  }

  async valorMedioEstoque() {
    const dados = await readCSV(filePath);

    const valorEQuantidadeProdutos = dados.reduce(
      (acc, data) => {
        if (data.removido === "false") {
          return [
            acc[0] + parseFloat(data.valor) * parseInt(data.quantidade, 10),
            acc[1] + parseInt(data.quantidade, 10),
          ];
        } else {
          return acc;
        }
      },
      [0, 0]
    );

    return valorEQuantidadeProdutos[0] / valorEQuantidadeProdutos[1];
  }

  async pesoMedioEstoque() {
    const dados = await readCSV(filePath);

    const pesoEQuantidadeProdutos = dados.reduce(
      (acc, data) => {
        if (data.removido === "false") {
          return [
            acc[0] + parseFloat(data.peso) * parseInt(data.quantidade, 10),
            acc[1] + parseInt(data.quantidade, 10),
          ];
        } else {
          return acc;
        }
      },
      [0, 0]
    );

    return pesoEQuantidadeProdutos[0] / pesoEQuantidadeProdutos[1];
  }
}
