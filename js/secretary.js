// require( "./secretary.css" );
var utils = require("./utils.js");
var monXml= 'data/cabinetInfirmier.xml';

var xmlContent;

var objectInfirmiers= {};
var objectPatients = [];


utils.XHR('GET', monXml).then( function (data){
	 xmlContent = data.response;
	var parser = new DOMParser();

	var doc = parser.parseFromString(xmlContent , 'text/xml');

	var infirmiers = Array.prototype.slice.apply(doc.querySelectorAll('infirmier'), []);
	var patients = Array.prototype.slice.apply(doc.querySelectorAll('patient'), []);


	// construction du tableau d'objets "infirmiers"
	infirmiers.forEach(function(unInfirmer) {
		objectInfirmiers[unInfirmer.getAttribute("id")] = {
			nom : unInfirmer.querySelector("nom").textContent,
			prenom: unInfirmer.querySelector("prenom").textContent,
			photo: unInfirmer.querySelector("photo").textContent,
			patients: [] // initialisation du tableau vide
	}
	});


	// construction du tableau d'objets "patients", l'indice du tableau est le n° de securité sociale du patient.

	patients.forEach(function(unPatient){
		objectPatients.push( {
			id: unPatient.querySelector("numero").textContent,
			nom: unPatient.querySelector("nom").textContent,
			prenom: unPatient.querySelector("prenom").textContent,
			sexe: unPatient.querySelector("sexe").textContent,
			date : unPatient.querySelector("naissance").textContent,
			adresse: [{
						rue: unPatient.querySelector("rue").textContent,
						ville: unPatient.querySelector("ville").textContent,
						codePostal: unPatient.querySelector("codePostal").textContent
					}],
			infirmier: unPatient.querySelector("visite").getAttribute("intervenant") // renseigne sur l'ID de infirmier qui s'occupe du patient, si null: le patient "n'appartient" à aucune infirmier: il n'a pas subi d'intervention !
		})
	});
console.log(objectPatients[0]);
	// remplissage du tableau des patients pour chaque infirmier
console.log(objectInfirmiers['003']);


	objectPatients.forEach(function(patient){
		if (patient.infirmier != null){
			objectInfirmiers[patient.infirmier].patients.push(patient); // on met dans le tableau de patient de l'infirmier l'object "patient" courant
		}
	});
console.log(objectInfirmiers);


	// ------------------
	});