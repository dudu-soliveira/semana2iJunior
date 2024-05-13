import { Data } from "../model/interfaceData";
import { estoqueService } from "../service/serviceEstoque";

const separador = "--------------------------------------------";

export async function adicionarProduto(data: Data) {
  try {
    await new estoqueService().criar(data);
    console.log(
      `\n\n${separador} Produto adicionado com sucesso! ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error)
      console.log(
        `\n\n${separador} Erro ao adicionar o produto: `,
        error.message,
        `${separador}\n\n`
      );
    else console.log(error);
  }
}

export async function buscarProdutoId(id: number) {
  try {
    const data = await new estoqueService().buscar(id);
    console.table(
      [data],
      ["id", "nome", "peso", "valor", "quantidade", "tags"]
    );
    return true;
  } catch (error) {
    if (error instanceof Error)
      console.log(
        `\n\n${separador} Erro ao buscar o produto: `,
        error.message,
        `${separador}\n\n`
      );
    else console.log(error);
    return false;
  }
}

export async function removerProduto(id: number) {
  try {
    await new estoqueService().remover(id);
    console.log(
      `\n\n${separador} Produto removido com sucesso! ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error)
      console.log(
        `\n${separador}Erro ao remover o produto: `,
        error.message,
        `${separador}\n\n`
      );
    else console.log(error);
  }
}

export async function listarProdutos() {
  try {
    const dados = await new estoqueService().listar();
    console.log();
    console.table(dados);
    console.log();
    console.log();
  } catch (error) {
    if (error instanceof Error)
      console.log(
        `\n\n${separador} Erro ao listar os produtos: `,
        error.message,
        `${separador}\n\n`
      );
    else console.log(error);
  }
}

export async function valorTotalEstoque() {
  try {
    const valorTotal = await new estoqueService().valorTotalEstoque();
    console.log(
      `\n${separador} Valor total do estoque: R$ ${valorTotal
        .toFixed(2)
        .replace(".", ",")} ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `\n\n${separador} Erro ao calcular o valor total do estoque: `,
        error.message,
        `${separador}\n\n`
      );
    } else console.log(error);
  }
}
