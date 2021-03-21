export const getFormattedText = (value: string) =>
  value.split(/(?=[A-Z])/).join(" ");
