/**
 * @module ol/source/OSM
 */

import XYZ from './XYZ.js';

/**
 * The attribution containing a link to the OpenStreetMap Copyright and License
 * page.
 * @const
 * @type {string}
 * @api
 */
export const ATTRIBUTION =
  '&#169; ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> ' +
  'contributors.';

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [imageSmoothing=true] Enable image smoothing.
 * @property {number} [maxZoom=19] Max zoom.
 * @property {boolean} [opaque=true] Whether the layer is opaque.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [url='https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'] URL template.
 * Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 */

/**
 * @classdesc
 * Layer source for the OpenStreetMap tile server.
 * @api
 */
class OSM extends XYZ {
  /**
   * @param {Options} [opt_options] Open Street Map options.
   */
  constructor(opt_options) {
    const options = opt_options || {};

    let attributions;
    if (options.attributions !== undefined) {
      attributions = options.attributions;
    } else {
      attributions = [ATTRIBUTION];
    }

    const crossOrigin =
      options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

    const url =
      options.url !== undefined
        ? options.url
        : 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    super({
      attributions: attributions,
      attributionsCollapsible: false,
      cacheSize: options.cacheSize,
      crossOrigin: crossOrigin,
      imageSmoothing: options.imageSmoothing,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
      opaque: options.opaque !== undefined ? options.opaque : true,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      transition: options.transition,
      url: url,
      wrapX: options.wrapX,
    });
  }
}

export default OSM;
