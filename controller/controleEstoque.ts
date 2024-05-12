import { Data } from "../model/interfaceData";
import { estoqueService } from "../service/serviceEstoque";

export async function adicionarProduto(data: Data) {
  try {
    await new estoqueService().criar(data);
    console.log("Produto adicionado com sucesso!");
  } catch (error) {
    if (error instanceof Error)
      console.log("Erro ao adicionar o produto: ", error.message);
    else console.log(error);
  }
}
