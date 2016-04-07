   var templateInfirmier = require ("./infirmiers.html");


    moduleAngular.component( "infirmier", {
        template    : templateInfirmier,
        bindings    : {
            titre    : "@"
        },
        controller    : function(){
        	
        }
    });