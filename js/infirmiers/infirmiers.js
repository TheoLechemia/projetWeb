        // Template HTML
var template = require( "./infirmiers.html" );
require( "./infirmiers.css" );

// Définition du composant

module.exports = function(moduleAngular) {

    var ctrlInfirmiers = function() {
            
        console.log(this.data);
    };

    // Construire une balise <infirmier>
    moduleAngular.component( "infirmier", {
        'template'    : template,
        bindings    : {
            titre   : "@",
            data    : "<",
            src : "@"
        },
        'controller'    : ctrlInfirmiers
    });

};