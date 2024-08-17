function xmlToJson(xml) {
  // Créer l'objet JSON
  const obj = {};

  // Si l'élément a des attributs, les ajouter à l'objet
  if (xml.nodeType === 1) {
    // Si c'est un élément
    // Ajouter les attributs
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    // Si c'est un texte
    obj = xml.nodeValue;
  }

  // Traiter les enfants
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof obj[nodeName] === "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push === "undefined") {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

module.exports = xmlToJson;
