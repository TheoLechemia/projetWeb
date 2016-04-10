// Template HTML
var template = require( "./cabinetMedical.html" );
require( "./cabinetMedical.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);

    var controller = function(proxyNF, $http) {

        // Message d'accueil
        console.log("Hey !! This is controller, man...j'essaye de te récupérer les données..." );

        // Récupérer les objets Cabinet, Infirmiers, Patients
        var ctrl = this;
        proxyNF.getData(this.src).then( function(cabinetJS) {
            ctrl.data = cabinetJS;
           console.log(ctrl.data);
        });



//----------- Afficher la liste des patients des infirmiers 
        ctrl.patientsCourant = null;

        ctrl.afficherPatient = function(inf){ // fonction d'afficher - désaficher les patients de l'infirmiers
            if (ctrl.patientsCourant === inf.patients){
                ctrl.patientsCourant  = null;
            } else {
             ctrl.patientsCourant = inf.patients; // renvoie un tableau de patients
              if (ctrl.patientsCourant.length == 0){
                        alert("Cet infirmier ne dispose d'aucun patient");
                     }
            }

        };

// afficher le formulaire d'ajout d'un patient

        ctrl.formulairePatient = false;
        ctrl.afficherFormulaire = function(){

            if (ctrl.formulairePatient == true){
                ctrl.formulairePatient = false;
            }else {
                 ctrl.formulairePatient = true;

            }
            console.log(ctrl.formulairePatient);
        };

       

       

};


    controller.$inject = ['proxyNF', '$http'];


    require("../infirmiers/infirmiers.js")(moduleAngular);
    require("../patients/patients.js")(moduleAngular);
    require("../formPatient/formPatient.js")(moduleAngular);


    // Construire une balise <cabinet-medical>
    moduleAngular.component( "cabinetMedical", {
        'template'    : template,
        bindings    : {
            src: "@",
            titre    : "@"
        },
        'controller'    : controller
    });
};