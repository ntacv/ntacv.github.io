
const doc_id = "1xg-OM_tXRPOKN7Nd3BwPuxDFokHko9c7_MewAPGpj-A";
const sheet_id = "projects";
const api_url = ["https://docs.google.com/spreadsheets/d/","/edit?gid=","#gid="];

const api_key = "AIzaSyCnHahFvX5M06GoNyx_MFeCP538bCeibWc";

const full_url = api_url[0] + doc_id + api_url[1] + sheet_id + api_url[2] + sheet_id;


// interface Iproject {
//   title: string;
//   description: string;
//   url: string;
//   imgUrl: string;

//   status: status;
//   section: section;

//   date: string;
//   finished: string;
//   location: countryCode;
// }

const enum_status = {
  0 : "ToDo",
  1 : "Developing",
  2 : "Works on my machine",
  3 : "Should improve",
  4 : "Open to suggestions",
  5 : "Done"
}
const enum_section = {
  0 : "dev (php projects)",
  1 : "elec (coding for 13 years)",
  2 : "photo",
  3 : "video",
  4 : "typo (comm apple, rov, ved)",
  5 : "prototypes (maquettes, 3d models)",
  6 : "articles (esilv, medium, typo research)"
}

//console.log("Google Sheets URL: " + full_url);

const api_sheet_url = ["https://sheets.googleapis.com/v4/spreadsheets/","/values/","!","?key="];
const full_api_url = api_sheet_url[0] + doc_id + api_sheet_url[1] + sheet_id + api_sheet_url[2] + "A1:Z100" + api_sheet_url[3] + api_key;

//console.log("Google Sheets API URL: " + full_api_url);
var data_object = {};

async function getData() {
  const url = full_api_url;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }


    const result = await response.json();
    //console.log("RESULT : ",result);
    console.log("RESULT data : ",result.values);
    data_object = result.values;
    
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
    //console.log("OBJECT : ", data);

    document.querySelectorAll('.project_data').forEach( el => {
      el.innerHTML = "<div>" + data.map( project =>
        `<a href="${project.url}">
          <div class="project_item">
            <h3>${project.title}</h3>
            ${project.desc ? `<p>${project.desc}</p>` : '1'}
            <p>
            ${project.status ? ` Status: ${ enum_status[project.status]}` : '2'}

            ${project.status ? ` Section: ${enum_section[project.section]}` : '3'}

            ${ project.location ? ` Location: ${project.location}` : '4' }
            </p>
        </div>
        </a>` ).join('') + "</div>";
        
    });

    return result.values;
  } catch (error) {
    console.error(error);
  }
}

const data = getData().then(res => { return res; });

console.log("DATA : ", {data} );
console.log("DATA[0] : ", data.then(r => r[0][0]) );
