import AsyncStorage from "@react-native-async-storage/async-storage";

const colors = [
  "#FFD1DC",
  "#AEC6CF",
  "#CFCFC4",
  "#FDFD96",
  "#C4A3BF",
  "#FFB7B2",
  "#B4E7CE",
  "#FFDAC1",
  "#E1C5C5",
  "#E6E6FA",
  "#B2EBF2",
  "#FAD6A5",
  "#FFFDD0",
  "#98FF98",
  "#F4C2C2",
];

const cacheRGB = {};

function hexToRGB(_hex) {
  if (cacheRGB[_hex]) return cacheRGB[_hex];

  const hex = _hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  cacheRGB[_hex] = { r, g, b };
  return { r, g, b };
}

function calculateDistance(color1, color2) {
  return (
    Math.abs(color1.r - color2.r) +
    Math.abs(color1.g - color2.g) +
    Math.abs(color1.b - color2.b)
  );
}

function findClosestColor(hexColor, colorList) {
  const inputColor = hexToRGB(hexColor);
  let closestColor = null;
  let closestDistance = Infinity;

  for (const color of colorList) {
    const distance = calculateDistance(inputColor, hexToRGB(color));

    if (distance < closestDistance) {
      closestColor = color;
      closestDistance = distance;
    }
  }

  return closestColor;
}

function getClosestColor(hexColor) {
  return findClosestColor(hexColor, colors);
}

function getClosestRessourceColor(codeRessource) {
  function hashCode(str) {
    let hash = 5;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i) + 1;
      hash = (hash << 5) - hash + char;
    }
    return hash;
  }

  const hash = hashCode(codeRessource);

  const multiplierR = 32;
  const multiplierG = 26;
  const multiplierB = 22;

  const r = Math.abs(((hash * multiplierR * hash) / 0.7) % 231);
  const g = Math.abs(((hash * multiplierG * hash) / 1.6) % 213);
  const b = Math.abs(((hash * multiplierB * hash) / 0.5) % 246);

  const hexColor = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return hexColor;
}

async function associateRessourceColor(student_year) {
  const resourceColors = {};
  const totalCodes = 15;
  let prefix1, prefix2;

  if (student_year.includes("Y1")) {
    prefix1 = "R1.";
    prefix2 = "R2.";
  } else if (student_year.includes("Y2")) {
    console.log("Y2");
    prefix1 = "R3.";
    prefix2 = "R4.";
  } else if (student_year.includes("Y3")) {
    prefix1 = "R5.";
    prefix2 = "R6.";
  } else {
    return {};
  }

  let savedColors = await AsyncStorage.getItem("savedColors");

  if (savedColors) {
    savedColors = JSON.parse(savedColors);
  } else {
    savedColors = {};
  }

  for (let i = 1; i <= totalCodes; i++) {
    const codeSuffix = i.toString().padStart(2, "0");
    const code1 = `${prefix1}${codeSuffix}`;
    const code2 = `${prefix2}${codeSuffix}`;

    let color;
    if (i <= colors.length) {
      color = colors[i - 1];
    } else {
      const newColorHex = getClosestRessourceColor(code1);
      color = getClosestColor(newColorHex);
      colors.push(color);
    }

    resourceColors[code1] = color;
    resourceColors[code2] = color;

    // Save the colors in AsyncStorage
    savedColors[code1] = color;
    savedColors[code2] = color;
  }

  await AsyncStorage.setItem("savedColors", JSON.stringify(savedColors));
  return resourceColors;
}

async function getRessourceColor(ressource) {
  let savedColors = await AsyncStorage.getItem("savedColors");
  if (savedColors) {
    savedColors = JSON.parse(savedColors);
  } else {
    savedColors = {};
  }

  if (savedColors[ressource]) {
    return savedColors[ressource];
  } else {
    let newColor;
    const colorListLength = Object.keys(savedColors).length;
    if (colorListLength < colors.length) {
      newColor = colors[colorListLength];
    } else {
      const newColorHex = getClosestRessourceColor(ressource);
      newColor = getClosestColor(newColorHex);
    }

    savedColors[ressource] = newColor;
    await AsyncStorage.setItem("savedColors", JSON.stringify(savedColors));

    return newColor;
  }
}

export default associateRessourceColor;
export { getRessourceColor };
