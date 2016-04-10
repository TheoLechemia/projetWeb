var template = require( "./formPatient.html" );
// require( "./formPatient.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);


	var ctrlFormPatient = function($http , proxyNF){

		 this.patient = {
            patientNumber: "",
            patientName:"",
            patientForname : "",
            patientSex: "",
            patientBirthday: "",
            patientFloor:"",
            patientStreet: "",
            postalCode:"",
            patientCity: "",
            nurseNumber:""
        };
        
        this.submitPatient = function(){
            console.log(this.patient);
            proxyNF.ajouterPatient(this.patient);
            proxyNF.affecterPatient(this.patient.patientNumber, this.patient.nurseNumber)
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
