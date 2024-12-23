import { DOMParser } from 'xmldom'

export default function Parser({xmlString}){
  if(!xmlString) return null;

  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, "text/xml")

  // Get all nodes that are exactly "character_" followed by a number
  const characters = Array.from(xmlDoc.getElementsByTagName('*'))
    .filter(node => /^character_\d+$/.test(node.nodeName))
    .map(character => {
      const fullName = character.getElementsByTagName('full_name')[0]?.textContent;
      const introduction = character.getElementsByTagName('character_introduction')[0]?.textContent;
      
      return {
        id: character.nodeName,
        fullName,
        introduction
      };
    });

  return characters;
}

