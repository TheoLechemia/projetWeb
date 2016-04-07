//require("infirmiers.css")

var templatePatient = require ("./patients.html");
var controller = function(){
	console.log(this.getData.objectInfirmiers);
}

controller.$inject= [proxyNF]
module.exports = function(moduleAngular){

    moduleAngular.component( "patient", {
        template    : templatePatient,
        bindings    : {
            getData: "<"
        },
        controller    : controller
    });
};