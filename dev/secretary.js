/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// require( "./secretary.css" );
	var utils = __webpack_require__(2);
	var monXml= 'data/cabinetInfirmier.xml';

	var xmlContent;

	var objectInfirmiers= {};
	var objectPatients = [];
	var patientsNonAffectes = [];


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
			} else {
				patientsNonAffectes.push(patient);
			}
		});
	console.log(objectInfirmiers);


		// ------------------
		});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		XHR : function(method, ad, params) {
			// method	: GET or POST
			// ad		: adress of the ressource to be loaded
			// params : An object containing two possible parameters.
			//		- onload	: a function taking no argument, response will be contains in object this.
			//		- variables : an object containing a set of attribute<->value
			//		- form 		: a reference to a HTML form node
			var P = new Promise( function(resolve, reject) {
				 var xhr = new XMLHttpRequest();
				 params = params || {};
				 xhr.onload = function() {if(this.status >= 400) {reject(this);} else {resolve(this);}};
				 xhr.open(method, ad, true);
				 if(params.form || params.variables) {
					 var F;
					 if(params.form) F= new FormData( params.form );
						else F = new FormData();
					 for(var i in params.variables) {
						 F.append(i, params.variables[i]);
						}
					 xhr.send( F );
					} else {xhr.send();}
				} );
			return P;
		}
	};


/***/ }
/******/ ]);