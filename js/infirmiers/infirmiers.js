// Template HTML
var template = require( "./infirmiers.html" );
require( "./infirmiers.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);

    var ctrlInfirmiers = function() {
        var ctrl = this;

        ctrl.patientsCourant = null;

         ctrl.afficherPatient = function(inf){
            if (ctrl.patientsCourant === inf.patients){
                ctrl.patientsCourant  = null;
            } else {
             ctrl.patientsCourant = inf.patients; // renvoie un tableau de patients
              if (ctrl.patientsCourant.length == 0){
                        alert("Cet infirmier ne dispose d'aucun patient");
                     }
            }

        };
    }

    // Construire une balise <infirmier>
    moduleAngular.component( "infirmier", {
        'template'    : template,
        bindings    : {
            titre   : "@",
            data    : "<",
          //  displayPatient: '&'
        },
        'controller'    : ctrlInfirmiers
    });

};