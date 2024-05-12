import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import { Data } from "./interfaceData";

export const writeCSV = async (
  filePath: string,
  data: Data[]
): Promise<void> => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: "id", title: "id" },
      { id: "nome", title: "nome" },
      { id: "peso", title: "peso" },
      { id: "valor", title: "valor" },
      { id: "quantidade", title: "quantidade" },
      { id: "tags", title: "tags" },
      { id: "removido", title: "removido" },
    ],
  });

  return csvWriter.writeRecords(data);
};
