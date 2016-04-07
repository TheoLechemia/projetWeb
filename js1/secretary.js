var angular = require("angular"),
	angularMaterial = require( "angular-material" );

require( "angular-material/angular-material.css" );

// Instancier module 'cabinet'
var cabinetModule = angular.module( "cabinet", [ angularMaterial ] );
require( "./cabinetMedical/cabinetMedical.js" )(cabinetModule);

cabinetModule.directive("cabinetRoot", function() {return {
	bindToController: true,
	controller : function(){
		this.test ="oui";
		this.machin = null;
		this.changeMachin = function() {
			this.machin = 1;
		}
	}
 };})


