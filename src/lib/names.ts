import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

export function generateRandomName() {
  return uniqueNamesGenerator({
    dictionaries: [colors, animals],
    separator: " ",
    style: "capital",
  });
}
