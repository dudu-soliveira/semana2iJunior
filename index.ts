import {
  adicionarProduto,
  buscarPorNome,
  buscarPorId,
  listarProdutos,
  pesoMedioEstoque,
  pesoTotalEstoque,
  quantidadeTotalItens,
  quantidadeTotalProdutos,
  removerProduto,
  valorMedioEstoque,
  valorTotalEstoque,
  buscarPorTag,
  buscarPorNomeETag,
} from "./controller/controleEstoque";
import { Tags } from "./model/enumTags";
import { Data } from "./model/interfaceData";

const prompt = require("prompt-sync")({ sigint: true });

const separador = "--------------------------------------------";

const help = () => {
  console.log(
    "Para adicionar produto digite: 1" +
      "\nPara remover produto digite: 2" +
      "\nPara listar os produtos digite: 3" +
      "\nPara ver valor total do estoque digite: 4" +
      "\nPara ver peso total do estoque digite: 5" +
      "\nPara ver média do valor dos produtos digite: 6" +
      "\nPara ver média dos pesos dos produtos digite: 7" +
      "\nPara ver quantidade total de itens no estoque digite: 8" +
      "\nPara ver quantidade total de produtos no estoque digite: 9" +
      "\nPara realizar uma busca digite: 10" +
      "\nPara sair digite: 0\n"
  );
};

const main = async () => {
  help();

  while (true) {
    let entrada = prompt(
      'Digite a ação desejada ou "h" para ajuda: '
    ).toLowerCase();

    if (entrada === "h") {
      console.log();
      help();
      continue;
    }

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
        console.log("\nAs tags possíveis são: ");
        console.log(Object.values(Tags).join("\n"));

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

        let idValido = await buscarPorId(id);

        if (idValido) {
          let confirmacao = prompt(
            "Deseja realmente remover o produto acima? (s/n): "
          ).toLowerCase();

          if (confirmacao.startsWith("s")) await removerProduto(id);
          else if (confirmacao.startsWith("n"))
            console.log(
              `\n\n${separador} Produto não removido ${separador}\n\n`
            );
          else console.log(`\n\n${separador} Opção inválida ${separador}\n\n`);
        }
        break;

      case 3:
        await listarProdutos();
        break;

      case 4:
        await valorTotalEstoque();
        break;

      case 5:
        await pesoTotalEstoque();
        break;

      case 6:
        await valorMedioEstoque();
        break;

      case 7:
        await pesoMedioEstoque();
        break;

      case 8:
        await quantidadeTotalItens();
        break;

      case 9:
        await quantidadeTotalProdutos();
        break;

      case 10:
        let parametroDeBusca = prompt(
          "Digite o parâmetro de busca (Nome, Tag, Ambos): "
        )
          .toLowerCase()
          .trim();

        if (parametroDeBusca === "nome") {
          let nome = prompt("Digite o nome do produto: ");
          await buscarPorNome(nome);
        } else if (parametroDeBusca === "tag") {
          console.log("As tags possíveis são:");
          console.log(Object.values(Tags).join("\n"));

          let tag = prompt("Digite a tag do produto: ");
          await buscarPorTag(tag);
        } else if (parametroDeBusca === "ambos") {
          console.log("As tags possíveis são:");
          console.log(Object.values(Tags).join("\n"));

          let tag = prompt("Digite a tag do produto: ");
          let nome = prompt("Digite o nome do produto: ");
          await buscarPorNomeETag(nome, tag);
        } else console.log(`\n\n${separador} Opção inválida ${separador}\n\n`);
        break;

      case 0:
        return;

      default:
        console.log(`\n${separador} Opção inválida ${separador}\n\n`);
        break;
    }
  }
};

main().then();
