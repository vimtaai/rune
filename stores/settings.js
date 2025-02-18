import { Store } from "../utilities/store.js";

const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const ZOOM_INCREMENT = 0.1;

export const settings = new Store({
  zoom: DEFAULT_ZOOM,

  zoomIn() {
    this.zoom = Math.min(this.zoom + ZOOM_INCREMENT, MAX_ZOOM);
  },

  zoomOut() {
    this.zoom = Math.max(this.zoom - ZOOM_INCREMENT, MIN_ZOOM);
  },

  zoomReset() {
    this.zoom = DEFAULT_ZOOM;
  },
});
