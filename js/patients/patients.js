// Template HTML
var template = require( "./patients.html" );
require( "./patients.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);

    var ctrlpatients = function( ) {
        console.log("salut, je suis le controleur d'un patient");
        console.log(this.data);
    }

    // Construire une balise <infirmier>
    moduleAngular.component( "patient", {
        'template'    : template,
        bindings    : {
            data: "<"
        },
        'controller'    : ctrlpatients
    });

};