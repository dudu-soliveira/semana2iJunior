import { Tags } from "../model/enumTags";
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

export async function buscarPorId(id: number) {
  try {
    const data = await new estoqueService().buscarPorId(id);
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
    console.table(dados, ["id", "nome", "peso", "valor", "quantidade", "tags"]);
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

export async function pesoTotalEstoque() {
  try {
    const pesoTotal = await new estoqueService().pesoTotalEstoque();
    console.log(
      `\n${separador} Peso total do estoque: ${pesoTotal
        .toFixed(2)
        .replace(".", ",")}kg ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `\n\n${separador} Erro ao calcular o peso total do estoque: `,
        error.message,
        `${separador}\n\n`
      );
    } else console.log(error);
  }
}

export async function valorMedioEstoque() {
  try {
    const valorMedio = await new estoqueService().valorMedioEstoque();
    console.log(
      `\n${separador} Valor médio dos produtos no estoque: R$ ${valorMedio
        .toFixed(2)
        .replace(".", ",")} ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `\n\n${separador} Erro ao calcular o valor médio do estoque: `,
        error.message,
        `${separador}\n\n`
      );
    } else console.log(error);
  }
}

export async function pesoMedioEstoque() {
  try {
    const pesoMedio = await new estoqueService().pesoMedioEstoque();
    console.log(
      `\n${separador} Peso médio dos produtos no estoque: ${pesoMedio.toFixed(
        0
      )}g ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `\n\n${separador} Erro ao calcular o peso médio do estoque: `,
        error.message,
        `${separador}\n\n`
      );
    } else console.log(error);
  }
}

export async function quantidadeTotalItens() {
  try {
    const quantidadeTotal = await new estoqueService().quantidadeTotalItens();
    console.log(
      `\n${separador} Quantidade total de itens no estoque: ${quantidadeTotal} ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `\n\n${separador} Erro ao calcular a quantidade total de itens no estoque: `,
        error.message,
        `${separador}\n\n`
      );
    } else console.log(error);
  }
}

export async function quantidadeTotalProdutos() {
  try {
    const quantidadeTotal =
      await new estoqueService().quantidadeTotalProdutos();
    console.log(
      `\n${separador} Quantidade total de produtos no estoque: ${quantidadeTotal} ${separador}\n\n`
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `\n\n${separador} Erro ao calcular a quantidade total de produtos no estoque: `,
        error.message,
        `${separador}\n\n`
      );
    } else console.log(error);
  }
}

export async function buscarPorNome(nome: string) {
  try {
    const dados = await new estoqueService().buscarPorNome(nome);

    if (!dados.length) {
      console.log(
        `\n${separador} Não há produtos com o nome ${nome} no estoque ${separador}\n\n`
      );
      return;
    }

    console.log();
    console.table(dados, ["id", "nome", "peso", "valor", "quantidade", "tags"]);
    console.log();
    console.log();
  } catch (error) {
    if (error instanceof Error)
      console.log(
        `\n\n${separador} Erro ao buscar o produto: `,
        error.message,
        `${separador}\n\n`
      );
    else console.log(error);
  }
}

export async function buscarPorTag(tag: Tags) {
  try {
    const dados = await new estoqueService().buscarPorTag(tag);

    if (!dados.length) {
      console.log(
        `\n${separador} Não há produtos com a tag ${tag} no estoque ${separador}\n\n`
      );
      return;
    }

    console.log();
    console.table(dados, ["id", "nome", "peso", "valor", "quantidade", "tags"]);
    console.log();
    console.log();
  } catch (error) {
    if (error instanceof Error)
      console.log(
        `\n\n${separador} Erro ao buscar o produto: `,
        error.message,
        `${separador}\n\n`
      );
    else console.log(error);
  }
}

export async function buscarPorNomeETag(nome: string, tag: Tags) {
  try {
    const dados = await new estoqueService().buscarPorNomeETag(nome, tag);

    if (!dados.length) {
      console.log(
        `\n${separador} Não há produtos com a tag ${tag} e o nome ${nome} no estoque ${separador}\n\n`
      );
      return;
    }

    console.log();
    console.table(dados, ["id", "nome", "peso", "valor", "quantidade", "tags"]);
    console.log();
    console.log();
  } catch (error) {
    if (error instanceof Error)
      console.log(
        `\n\n${separador} Erro ao buscar o produto: `,
        error.message,
        `${separador}\n\n`
      );
    else console.log(error);
  }
}
