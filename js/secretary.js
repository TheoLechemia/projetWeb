
var angular = require("angular"), angularMaterial=require( "angular-material" );
require( "angular-material/angular-material.css" );

var cabinetModule = angular.module( "cabinet", [ angularMaterial ] );

require( "./cabinetMedical/cabinetMedical.js" )(cabinetModule);


