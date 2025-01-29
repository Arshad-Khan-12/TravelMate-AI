// utils.js
export const formatPrice = (priceString) => {
  if (!priceString) return "NA";
  const lowerPrice = priceString.toLowerCase();
  if (lowerPrice.includes("free")) {
    return "Free";
  }

  // Regex to find currency symbols followed by numbers and potential ranges
  const priceRegex = /[\p{Sc}](\s*\d[\d\s–-]*)/giu;
  const matches = priceString.match(priceRegex) || [];

  if (matches.length === 0) return "NA";

  // Clean each match by removing unwanted spaces
  const cleanedMatches = matches.map((match) => {
    // Remove space after currency symbol
    let cleaned = match.replace(/(\p{Sc})\s+(\d)/gu, "$1$2");
    // Remove spaces around hyphens/en-dashes
    cleaned = cleaned.replace(/\s*([–-])\s*/gu, "$1");
    return cleaned;
  });

  return cleanedMatches.join("");
};
