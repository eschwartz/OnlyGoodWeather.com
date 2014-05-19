define([
  'leaflet',
  'underscore',
  './helper/normalizeTilePoint'
], function(L, _, normalizeTilePoint) {
  function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  var AlwaysSunny = function() {
    /**
     * @property tileSize_
     * @type {number}
     * @private
     */
    this.tileSize_ = 192;

    L.TileLayer.Canvas.call(this, {
      async: true,
      tileSize: this.tileSize_
    });
  };
  AlwaysSunny.prototype = Object.create(L.TileLayer.Canvas.prototype);


  /**
   * @method drawTile
   */
  AlwaysSunny.prototype.drawTile = function(canvas, tilePoint, zoom) {
    var ctx = canvas.getContext('2d');
    var drawImageOnCanvas = this.drawImage_.bind(this, ctx);
    var done = this.tileDrawn.bind(this, canvas);
    var throwError = function(err) {
      _.defer(function() {
        throw err;
      });
    };

    //this.drawTileCoords_(canvas, tilePoint);

    this.createHappySunImage_().
      then(drawImageOnCanvas).
      then(done).
      catch(throwError);
  };


  AlwaysSunny.prototype.drawTileCoords_ = function(canvas, tilePoint) {
    var ctx = canvas.getContext('2d');

    ctx.font = '30px Arial';
    ctx.fillText([tilePoint.x, tilePoint.y].join(', '), 100, 100);

    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
  };


  /**
   * @method createHappySunImage_
   * @private
   * @return {Image}
   */
  AlwaysSunny.prototype.createHappySunImage_ = function() {
    return new Promise(function(resolve, reject) {
      var url = '/js/TileLayer/assets/happy_sun.png';
      var img = new Image();

      img.src = url;

      img.onload = resolve.bind(this, img);
      img.onerror = reject.bind(this, new Error('Failed to load happy sun image.'));
    });
  };


  /**
   * @method drawImage_
   * @private
   */
  AlwaysSunny.prototype.drawImage_ = function(ctx, img) {
    var width = height = 75;
    var maxX = this.tileSize_ - width;
    var maxY = this.tileSize_ - height;
    var x = randomIntFromInterval(0, maxX);
    var y = randomIntFromInterval(0, maxY);

    ctx.drawImage(img,
      0, 0,                     // clip x, y
      img.width, img.height,    // clip-end x, y
      x, y,                     // stretch x, y
      width, width      // stretch-end x, y
    );
  };



  return AlwaysSunny;
});
