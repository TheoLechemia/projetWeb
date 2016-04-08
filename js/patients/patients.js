// Template HTML
var template = require( "./patients.html" );
require( "./patients.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);

    var ctrlpatients = function( ) {

    }

    // Construire une balise <infirmier>
    moduleAngular.component( "patient", {
        'template'    : template,
        bindings    : {
            titre    : "@",
            data: "<"
        },
        'controller'    : ctrlpatients
    });

};