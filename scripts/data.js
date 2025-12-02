
const doc_id = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const sheet_id = "projects";
const api_url = ["https://docs.google.com/spreadsheets/d/","/edit?gid=","#gid="];

const api_key = "";

const full_url = api_url[0] + doc_id + api_url[1] + sheet_id + api_url[2] + sheet_id;

console.log("Google Sheets URL: " + full_url);

const api_sheet_url = ["https://sheets.googleapis.com/v4/spreadsheets/","/values/","!","?key="];
const full_api_url = api_sheet_url[0] + doc_id + api_sheet_url[1] + sheet_id + api_sheet_url[2] + "A1:Z100" + api_sheet_url[3] + api_key;

console.log("Google Sheets API URL: " + full_api_url);


async function getData() {
  const url = full_api_url;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }


    const result = await response.json();
    console.log("RESULT : ",result);
    console.log("RESULT data : ",result.values);
    
    const values = result.values; // Récupérer les lignes du document
    const titles = values.shift(); // Sortir la première ligne qui représente nos titres
    const data = []; // Création d'un tableau qui contiendra nos données
    for (const i in values) {
    /*
        Remplacement de Lodash _.zipObject par une construction manuelle de l'objet
        Cette méthode associe chaque titre à la cellule correspondante de la ligne
    */
        const row = values[i];
        const obj = /** @type {Record<string, any>} */ ({});
        for (let j = 0; j < titles.length; j++) {
            const key = String(titles[j]);
            obj[key] = row[j] !== undefined ? row[j] : null;
        }
        data.push(obj);
    }
    console.log("OBJECT : ", data);


    return result.values;
  } catch (error) {
    console.error(error);
  }
}

const data = getData().then(res => { return res; });

console.log("DATA : ", data );
console.log("DATA[0] : ", data.then(r => r[0][0]) );