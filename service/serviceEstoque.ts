import { Tags } from "../model/enumTags";
import { Data } from "../model/interfaceData";
import { readCSV } from "../model/readCSV";
import { writeCSV } from "../model/writeCSV";

const filePath =
  "/home/dudu-soliveira/Desktop/iJunior/semana2/model/estoque.csv";

export class estoqueService {
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

  constructor() {}
}
