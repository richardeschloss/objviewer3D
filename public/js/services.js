'use strict';

/* Services */
//angular.module('ObjViewer3D.services', []).value('version', '0.1');

angular.module('ObjViewer3D.services', ['ngResource']).value('version', '0.1')

.factory('Backend', ['$resource',
   function($resource){
	return $resource('/:querystr', {}, {
	   // [methodName]: { url: '...', method: '...', params: {}, isArray: false }
	});
}])

.factory('fileUploader', ['$http', function ($http) {
    this.upload = function(file, uploadUrl, callback){
        var fd = new FormData();
        fd.append('uploadedFile', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data, status, headers, config){
          callback(data);
        })
        .error(function(){
        });
    }
    return this;
}]);
