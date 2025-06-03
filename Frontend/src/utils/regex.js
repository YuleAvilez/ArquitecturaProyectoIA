export const regex = {
  alphanumeric: {
    execute: /^[a-zA-Z0-9\sñÑáéíóúÁÉÍÓÚ]*$/,
    message: "Únicamente caracteres alfanuméricos",
  },
  noSpaces: { execute: /^[^\s]*$/, message: "Remover espacios" },
  spacesAtBeginning: {
    execute: /^\S.*$/,
    message: "No se permiten espacios al inicio",
  },
  trim: {
    execute: /^(?!\s)[\w\s\S]*(?<!\s)$/,
    message: "Remover espacios de principio y final",
  },
  onlyLetters: {
    execute: /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]*$/,
    message: "Solo se permiten letras",
  },
  onlyNumbers: { execute: /^[0-9]*$/, message: "Solo se permiten números" },
  onlyPositiveNumbers: {
    execute: /^[1-9]\d*$/,
    message: "Solo se permiten números positivos",
  },
};
