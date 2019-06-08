'use strict';

/* Filters */

angular.module('ObjViewer3D.filters', [])

.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
}]);
