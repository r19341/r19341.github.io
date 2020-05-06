'use strict';

angular.module('mapComponent.demo')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mapComponent/demo', {
    template: require('./demo.html'),
    controller: [demoController],
    controllerAs: 'dc'
  });
}])

function demoController() {
  var vm = this;
  vm.defaultGeoJson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "properties": {
            "shape": "Rectangle",
            "maps": ["default-map"],
            "name": "Unnamed Layer",
            "category": "default",
            "id": "671e9661-943c-443f-a9e1-4834fdc892bd"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [-0.11982, 51.516541],
                    [-0.11982, 51.498271],
                    [-0.075016, 51.498271],
                    [-0.075016, 51.516541],
                    [-0.11982, 51.516541]
                ]
            ]
        }
    }]
  }
}
