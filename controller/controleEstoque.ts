import { Data } from "../model/interfaceData";
import { estoqueService } from "../service/serviceEstoque";

export async function adicionarProduto(data: Data) {
  try {
    await new estoqueService().criar(data);
    console.log("\n\nProduto adicionado com sucesso!\n\n");
  } catch (error) {
    if (error instanceof Error)
      console.log("\n\nErro ao adicionar o produto: ", error.message, "\n\n");
    else console.log(error);
  }
}

export async function buscarProdutoId(id: number) {
  try {
    const data = await new estoqueService().buscar(id);
    console.log(data);
  } catch (error) {
    if (error instanceof Error)
      console.log("\n\nErro ao buscar o produto: ", error.message, "\n\n");
    else console.log(error);
  }
}

export async function removerProduto(id: number) {
  try {
    await new estoqueService().remover(id);
    console.log("\n\nProduto removido com sucesso!\n\n");
  } catch (error) {
    if (error instanceof Error)
      console.log("\n\nErro ao remover o produto: ", error.message, "\n\n");
    else console.log(error);
  }
}
