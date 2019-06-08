'use strict';

var activeStockElem;

/* Directives */
angular.module('ObjViewer3D.directives', [])

.directive('customClick', function() {
    return function(scope, element, attrs) {
    	element.bind('click', function(){
        	$(attrs.customClick).click();
        });
    }
})

.directive('initNavbar', function($compile, $http) {
    return function(scope, elm, attrs) {
        $http.get("partials/navbarView.html").then(function (result) {
            elm.replaceWith($compile(result.data)(scope));
        });
    };
})

.directive('fileModel', ['$parse', function ($parse) {
    return function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
                scope.upload3dFile();
            });
        });
    }

}])

.directive('selectedFileChanged', function($compile, $http) {
    return function(scope, elm, attrs) {
        scope.$watch('SelectedFile', function(newValue,oldValue){
        });
    }
})

.directive('updateModel', function($compile, $http) {
    return function(scope, elm, attrs) {
        scope.$watch(attrs.updateModel, function(newValue,oldValue){
        	if(newValue){
        	  scope.loadOBJModel();
            }
        });
    }
});
