var template = require( "./formPatient.html" );
// require( "./formPatient.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);


	var ctrlFormPatient = function($http, proxyNF){
		this.$http = $http;
		this.proxyNF = proxyNF;

		this.patient = {
			id: "",
			nom:"",
			prenom : "",
			sexe: "",
			date: "",
			adresse: [{
						rue:"",
						ville:"",
						codePostal:""
						}],
			infirmier: ""
		};
		
		this.submitPatient = function(){
			console.log(this.patient);
			this.proxyNF.addPatient(this.patient);
			};
	}




ctrlFormPatient.$inject = ['$http', 'proxyNF'];


   moduleAngular.component( "formPatient", {
        template    : template,
        bindings    : {
        			src: "@"
        },
        'controller'    : ctrlFormPatient
    });

};
