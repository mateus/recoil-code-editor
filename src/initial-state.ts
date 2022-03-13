import type { File } from "./atoms/code-editor-atoms";
import { faker } from "@faker-js/faker";

enum Folders {
  Template = "Template",
  Assets = "Assets",
  Locale = "Locale",
}

function createPathname(folder: string, filename: string) {
  return [folder, filename].join("/");
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

function selectRandomFolder() {
  const folders = Object.keys(Folders);

  return folders.at(getRandomNumber(folders.length - 1)) ?? Folders.Template;
}

function createFile(folder = selectRandomFolder()): File {
  const filename = faker.random.word().toLowerCase() + ".liquid";

  return {
    pathname: createPathname(folder, filename),
    filename,
    document: faker.lorem.paragraphs(getRandomNumber(10), "\n"),
  };
}

export const initialDirectoryTree: File[] = [
  createFile(Folders.Template),
  createFile(Folders.Template),
  createFile(Folders.Template),
  createFile(Folders.Template),

  createFile(Folders.Assets),
  createFile(Folders.Assets),
  createFile(Folders.Assets),
  createFile(Folders.Assets),

  createFile(Folders.Locale),
  createFile(Folders.Locale),
  createFile(Folders.Locale),

  createFile(),
  createFile(),
  createFile(),
  createFile(),
  createFile(),
  createFile(),
  createFile(),
  createFile(),
];
