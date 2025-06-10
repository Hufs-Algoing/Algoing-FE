export const getLanguageForHighlighter = (language: string): string => {
  const langMap: { [key: string]: string } = {
    python: "python",
    "python 3": "python",
    python3: "python",
    pypy: "python",
    pypy3: "python",

    java: "java",
    "java 8": "java",
    "java 11": "java",
    "java 17": "java",

    "c++": "cpp",
    "c++14": "cpp",
    "c++17": "cpp",
    "c++20": "cpp",
    cpp: "cpp",
    "g++": "cpp",

    c: "c",

    javascript: "javascript",
    js: "javascript",
    "node.js": "javascript",
    nodejs: "javascript",
    node: "javascript",

    typescript: "typescript",
    html: "html",
    css: "css",
  };

  const normalizedLang = language.toLowerCase().trim();
  return langMap[normalizedLang] || "text";
};
