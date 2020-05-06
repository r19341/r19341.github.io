'use strict';
import L from 'leaflet';
import 'leaflet_css';

import '@geoman-io/leaflet-geoman-free';
import 'leaflet_geoman_css';
// import 'leaflet_marker';
// import 'leaflet_marker_2x';
// import 'leaflet_marker_shadow';
const circleToPolygon = require('circle-to-polygon');

angular.module('mapComponent.components')
.component('mapSelectionDialog', {
    template: require('./map-selection-dialog.component.html'),
    bindings: {
        defaultGeoJson: '@?'
    },
    controller: ['$mdDialog', mapSelectionDialogController],
    controllerAs: 'msdc'
});

function mapSelectionDialogController($mdDialog) {
    var vm = this;
    const emptyGeoJson = {
        "type": "FeatureCollection",
        "features": []
    }
    vm.geoJsonObj = vm.defaultGeoJson;
    vm.openMapDialog = openMapDialog;

    function openMapDialog(ev) {
        $mdDialog.show({
            locals:{
                dataToPass: {
                    geoJSON: vm.geoJsonObj ? JSON.parse(vm.geoJsonObj) : emptyGeoJson
                },
                on_complete: function(data_from_dialog_controller) {
                    console.log(data_from_dialog_controller);
                    vm.geoJsonObj = JSON.stringify(data_from_dialog_controller);
                }
            }, 
            controller: ['$mdDialog', '$timeout', 'dataToPass', 'on_complete', mapDialogController],
            controllerAs: 'mdc',
            fullscreen: true,
            template: require('./map.dialog.html'),
            clickOutsideToClose: true,
            targetEvent: ev,
            hasBackdrop: false,
        })
    };


    function mapDialogController($mdDialog, $timeout, dataToPass, on_complete) {
        var vm = this;
        vm.dialogSubmit = dialogSubmit;
        vm.dialogClose = dialogClose;
        vm.geoJsonObj = dataToPass.geoJSON
        vm.circlePolygon = {
            long: -0.05,
            lat: 51.5,
            radius: 1000,
            numberOfEdges: 32
        }
        vm.circleChanged = circleChanged
        vm.geoJsonLayer;
        vm.circlePolygonLayer
        vm.map;

        function circleChanged() {
            console.log("circleChanged() has been called")
            let coordsArray = [parseFloat(vm.circlePolygon.long), parseFloat(vm.circlePolygon.lat)]
            let polygon = circleToPolygon(
                coordsArray,
                parseFloat(vm.circlePolygon.radius),
                parseInt(vm.circlePolygon.numberOfEdges));
            if (vm.circlePolygonLayer) {
                vm.map.removeLayer(vm.circlePolygonLayer)
            }
            vm.circlePolygonLayer = L.geoJson(polygon).addTo(vm.map);
            // zoom to new bounds of circle
            vm.map.fitBounds(vm.circlePolygonLayer.getBounds());
        }
        
        function dialogSubmit() {
            $mdDialog.cancel();

            // Collects all layers on map and converts to GeoJSON
            var fg = L.featureGroup();
            vm.map.eachLayer((layer)=>{
            if (layer instanceof L.Path || layer instanceof L.Marker){
                fg.addLayer(layer);
            }
            });
            console.log(fg.toGeoJSON());

            on_complete(fg.toGeoJSON());
        };
        function dialogClose() {
            $mdDialog.cancel();
        };

        $timeout(function() {

            // We’ll add a tile layer to add to our map, in this case it’s a OSM tile layer.
            // Creating a tile layer usually involves setting the URL template for the tile images
            var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, {
                maxZoom: 18,
                attribution: osmAttrib
            });

            // initialize the map on the "map" div with a given center and zoom
            vm.map = L.map('map').setView([0, 0], 1).addLayer(osm);

            var options = {
                position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
                drawMarker: true,  // adds button to draw markers
                drawPolygon: true,  // adds button to draw a polygon
                drawPolyline: true,  // adds button to draw a polyline
                drawCircle: true,  // adds button to draw a cricle
                editPolygon: true,  // adds button to toggle global edit mode
                deleteLayer: true   // adds a button to delete layers
            };

            // add leaflet.pm controls to the map
            vm.map.pm.addControls(options);

            // add sclae to map
            L.control.scale().addTo(vm.map);

            // get array of all available shapes
            vm.map.pm.Draw.getShapes()

            vm.geoJsonLayer = L.geoJson(vm.geoJsonObj).addTo(vm.map);

            // set view to the bounds of all geojson objects
            vm.map.fitBounds(vm.geoJsonLayer.getBounds());


        }, 0);
    }
}