import { adicionarProduto } from "./controller/controleEstoque";
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
        "\nPara sair digite: 9"
    );

    let entrada = prompt("\nDigite a ação desejada: ");
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
          "\nAs tags existentes são: ",
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

        console.log();

        await adicionarProduto(data);
        break;
    }

    console.log();
  }
};

main().then();
