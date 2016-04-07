// Template HTML
var template = require( "./cabinetMedical.html" );

require( "./cabinetMedical.css" );

// Définition du composant
module.exports = function(moduleAngular) {

    var proxyNF = require( "../proxy.js" )(moduleAngular);

    // Controller => utilisé pour instancier un cabinet
    var controller = function( proxyNF ) {

        // Message d'accueil
        console.log("Hey !! This is controller, man...j'essaye de te récupérer les données..." );

        // Récupérer les objets Cabinet, Infirmiers, Patients
        var ctrl = this;
        ctrl.data = proxyNF.getData;
        this.data = proxyNF.getData;
      
        if(! angular.isUndefined(ctrl.data)){
            console.log(ctrl.data);
            console.log(this.getData);
        }


        //  afficher les infirmiers . Faire un autre controller pour l'affichage, différent de la récup de donnée..
        this.affichage = null;

        this.afficheItem = function(item){
            this.affichage = item;
     
        }

    }
    //controller.$inject = [ proxyNF ]; // Injection de dépendances

    // Construire une balise <cabinet-medical>
    moduleAngular.component( "cabinetMedical", {
        'template'    : template,
        bindings    : {
            titre    : "@"
        },
        'controller'    : controller
    });


};
