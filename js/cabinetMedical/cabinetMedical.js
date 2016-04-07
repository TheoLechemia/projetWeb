// Template HTML
var template = require( "./cabinetMedical.html" );
require( "./cabinetMedical.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);

    var controller = function(proxyNF) {

        var ctrl = this;

        proxyNF.getData(this.src).then(function(cabinetJS) {
            ctrl.data = cabinetJS;

        });
    }


    require("../infirmiers/infirmiers.js")(moduleAngular);
    require("../patients/patients.js")(moduleAngular);


    // Construire une balise <cabinet-medical>
    moduleAngular.component( "cabinetMedical", {
        'template'    : template,
        bindings    : {
            src: '@',
            titre    : "@"
        },
        'controller'    : controller
    });
};