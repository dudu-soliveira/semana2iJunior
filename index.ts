import {
  adicionarProduto,
  buscarProdutoId,
  removerProduto,
} from "./controller/controleEstoque";
import { Tags } from "./model/enumTags";
import { Data } from "./model/interfaceData";

const prompt = require("prompt-sync")({ sigint: true });

const main = async () => {
  while (true) {
    console.log(
      "Para adicionar produto digite: 1" +
        "\nPara remover produto digite: 2" +
        "\nPara lista os produtos digite: 3" +
        "\nPara ver valor total do estoque digite: 4" +
        "\nPara ver peso total do estoque digite: 5" +
        "\nPara ver média do valor dos produtos digite: 6" +
        "\nPara ver média dos pesos dos produtos digite: 7" +
        "\nPara ver quantidade total de produtos do estoque digite: 8" +
        "\nPara sair digite: 9\n"
    );

    let entrada = prompt("Digite a ação desejada: ");
    let W = parseInt(entrada, 10);

    console.log();

    switch (W) {
      case 1:
        let nome = prompt("Digite o nome do produto: ");
        let peso = parseFloat(prompt("Digite o peso do produto (g): "));
        let valor = parseFloat(prompt("Digite o valor do produto: "));
        let quantidade = parseInt(
          prompt("Digite a quantidade do produto: "),
          10
        );
        console.log(
          "\nAs tags possíveis são: ",
          Object.values(Tags).join("\n")
        );

        let tags = prompt("Digite as tags do produto separadas por vírgula: ")
          .trim()
          .split(",")
          .map((tag: string) => tag.trim());

        const data = {
          nome,
          peso,
          valor,
          quantidade,
          tags,
        } as Data;

        await adicionarProduto(data);
        break;

      case 2:
        let id = parseInt(
          prompt("Digite o id do produto a ser removido: "),
          10
        );

        await buscarProdutoId(id);

        let confirmacao = prompt(
          "Deseja realmente remover o produto acima? (s/n): "
        ).toLowerCase();

        if (confirmacao.startsWith("s")) await removerProduto(id);
        else if (confirmacao.startsWith("n"))
          console.log("\n\nProduto não removido.\n\n");
        else console.log("\n\nOpção inválida.\n\n");

        break;
    }
  }
};

main().then();
