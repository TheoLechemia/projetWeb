var proxyNF = function($http){

	// Message d'accueil
	console.log("Hello ! this is proxy !");

	// Dépendances et Variables
	require( "./secretary.css" );
	var utils = require("./utils.js");
	var monXml= 'data/cabinetInfirmier.xml';
	var xmlContent;

	var objectInfirmiers = [];
	var objectPatients   = [];
	var objectCabinet    = [];

	this.getData = {
		objectCabinet: objectCabinet,
		objectInfirmiers: objectInfirmiers,
		objectPatients: objectPatients
		};

	//this.getdata = function() {
	$http.get(monXml).success(function(response){
		xmlContent = response;
	//utils.XHR('GET', monXml).then( function (data){
	//xmlContent = data.response;

		// Parser le XML
		var parser = new DOMParser();
		var doc    = parser.parseFromString(xmlContent , 'text/xml');

		// Récupération et construction du tableau d'objets "Cabinet"
		// l'indice du tableau est son nom
		var cabinet = Array.prototype.slice.apply(doc.querySelectorAll('cabinet'), []);
		cabinet.forEach( function(cab)	{
			objectCabinet[cab] = {
				nom : cab.querySelector( "cabinet>nom" ).textContent,
				adresse : {
					numero: 	cab.querySelector("cabinet>adresse>numero").textContent,
					rue: 		cab.querySelector("cabinet>adresse>rue").textContent,
					ville: 		cab.querySelector("cabinet>adresse>ville").textContent,
					codePostal: cab.querySelector("cabinet>adresse>codePostal").textContent
					}
			}
		});


		// Récupération et construction du tableau d'objets "Infirmiers"
		// l'indice du tableau est son n°id
		var infirmiers = Array.prototype.slice.apply(doc.querySelectorAll('infirmier'), []);
		console.log(infirmiers);
		
		infirmiers.forEach(function(unInfirmer) {
			objectInfirmiers.push ( {
				id: unInfirmer.getAttribute("id"),
				nom : 	unInfirmer.querySelector("nom").textContent,
				prenom: unInfirmer.querySelector("prenom").textContent,
				photo: 	unInfirmer.querySelector("photo").textContent,
				patients: [] // initialisation du tableau vide
			})
		});

		// Récupérer et construction du tableau d'objets "patient",
		// l'indice du tableau est le n° de securité sociale du patient
		var patients   = Array.prototype.slice.apply(doc.querySelectorAll('patient'), []);
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

		// Remplir le tableau des patients pour chaque infirmier
		// le patient "courant" est ajouté
		objectPatients.forEach(function(patient){
			if (patient.infirmier != null){
				objectInfirmiers.forEach(function(unInfirmier){
					if (unInfirmier.id == patient.infirmier){
						unInfirmier.patients.push(patient)
					}
				});
			}
		});


		//console.log("Les infirmiers :");
		//console.log(infirmiers);
		//console.log(objectInfirmiers);

		});

	//};
};
proxyNF.$inject = [ "$http" ]; //Injection de dépendances


module.exports = function(moduleAngular) {
	var id = "proxyNF";
	moduleAngular.service(id, proxyNF);
	return id;
};
