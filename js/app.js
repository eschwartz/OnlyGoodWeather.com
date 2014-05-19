require.config({
  paths: {
    leaflet: '//cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.2/leaflet',
    'leaflet-markercluster': '../bower_components/leaflet.markercluster/dist/leaflet-markercluster',

    underscore: '../bower_components/underscore/underscore',
    jquery: '../bower_components/jquery/dist/jquery.min',
    backbone: '../bower_components/backbone/backbone',

    aeris: '../bower_components/aerisjs/src',
    'aeris/maps/strategy': '../bower_components/aerisjs/src/maps/leaflet'
  },

  shim: {
    'leaflet-markercluster': {
      deps: ['leaflet'],
      exports: 'L.MarkerClusterGroup'
    }
  },

  config: {
    'aeris/config': {
      apiId: 'DsGVvRrlXhwuRAduyhx1V',
      apiSecret: 'DsGVvRrlXhwuRAduyhx1V'
    }
  }
});

require([
  'aeris/maps/map',
  'TileLayer/AlwaysSunny'
], function(AerisMap, AlwaysSunny) {
  var aerisMap = new AerisMap('map-canvas');
  var alwaysSunny = new AlwaysSunny();

  alwaysSunny.addTo(aerisMap.getView());
  alwaysSunny.setZIndex(10e7);
});
