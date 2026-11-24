# Add an info window to a map.

## Overview

An `InfoWindow` displays content (text, HTML, or DOM nodes) in a popover window
above the map at a specified location or attached to an anchor (such as an
`AdvancedMarkerElement`). Info windows appear as a Dialog to screen readers and
include a content area, optional header content, a close control, and a tapered
stem pointing to the target location.

### Prerequisites

-   **Add a customizable, interactive map to a web page or mobile app.** Ensure
    the Maps JavaScript API is loaded and a map instance (`<gmp-map>` or
    `google.maps.Map`) is initialized with a valid `mapId` when using
    `AdvancedMarkerElement`.

--------------------------------------------------------------------------------

## Core API Reference

### `google.maps.InfoWindow` Constructor & `InfoWindowOptions`

Import `InfoWindow` from the `maps` library via
`google.maps.importLibrary('maps')`.

| Option          | Type                      | Description                    |
| :-------------- | :------------------------ | :----------------------------- |
| `content`       | `string \| Node`          | Text string, HTML snippet, or  |
:                 :                           : DOM element to display in the  :
:                 :                           : body of the info window.       :
| `headerContent` | `string \| Node`          | Text or DOM node to display in |
:                 :                           : the header row next to the     :
:                 :                           : close button.                  :
| `position`      | `LatLng \| LatLngLiteral` | The geographic coordinates at  |
:                 :                           : which the info window is       :
:                 :                           : anchored (if not attached to a :
:                 :                           : marker).                       :
| `maxWidth`      | `number`                  | Maximum width in pixels.       |
:                 :                           : Enforces text auto-wrapping    :
:                 :                           : and vertical expansion.        :
| `ariaLabel`     | `string`                  | Accessible label for screen    |
:                 :                           : readers describing the dialog. :
| `pixelOffset`   | `Size`                    | Offset from the tip of the     |
:                 :                           : stem to the anchor location    :
:                 :                           : (rarely needed; leave at       :
:                 :                           : default).                      :

### Key Methods & Events

-   **`open(options?: InfoWindowOpenOptions)`**: Makes the info window visible
    on the map.
    -   `map`: The `Map` or `StreetViewPanorama` on which to open.
    -   `anchor`: An anchor object (e.g., `AdvancedMarkerElement`) to attach to.
        If omitted/null, opens at the `position` property.
    -   `shouldFocus`: Boolean indicating whether to move focus into the info
        window upon opening.
-   **`close()`**: Closes the info window programmatically (users can also close
    it via the top-right close button or the `ESC` key).
-   **`setContent(content: string | Node)`**: Updates the body content
    dynamically.
-   **`setPosition(position: LatLng | LatLngLiteral)`**: Moves an unanchored
    info window to a new coordinate.
-   **`focus()`**: Sets keyboard focus on the info window. Must be called after
    the info window is visible (listen to the `visible` event before calling
    `focus()`).
-   **`closeclick` event**: Fired when the user clicks the close button. Listen
    via `infoWindow.addListener('closeclick', callback)` to override default
    focus restoration.

--------------------------------------------------------------------------------

## Implementation Patterns

### 1. Anchoring an InfoWindow to an `AdvancedMarkerElement` (Web Component Map)

This pattern uses `<gmp-map>`, constructs DOM nodes safely for the
`headerContent` and `content`, and opens the info window on initial load as well
as when the marker is clicked via the `gmp-click` event.

```html
<!-- HTML Map Container with Usage Attribution -->
<gmp-map
  center="-25.344,131.031"
  zoom="4"
  map-id="DEMO_MAP_ID"
  internal-usage-attribution-ids="gmp_git_agentskills_v1"
  style="height: 400px; width: 100%;"
></gmp-map>
```

```typescript
async function init(): Promise<void> {
  // Import the needed libraries.
  const [{ InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary('maps') as Promise<google.maps.MapsLibrary>,
    google.maps.importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
  ]);

  // Get the map element and the inner map from it.
  const mapElement = document.querySelector('gmp-map') as google.maps.MapElement;
  const innerMap = mapElement.innerMap;
  const center = mapElement.center;

  // Create the info window header and body DOM content safely.
  const heading = document.createElement('h1');
  heading.textContent = 'Uluru (Ayers Rock)';

  const content = document.createElement('div');
  const infoParagraph = document.createElement('p');
  infoParagraph.textContent =
    'Uluru, also referred to as Ayers Rock, is a large sandstone rock formation ' +
    'in the southern part of the Northern Territory, central Australia.';
  content.appendChild(infoParagraph);

  const link = document.createElement('a');
  link.href = 'https://en.wikipedia.org/w/index.php?title=Uluru';
  link.textContent = 'View on Wikipedia';
  link.target = '_blank';
  content.appendChild(link);

  // Create the info window.
  const infoWindow = new InfoWindow({
    headerContent: heading,
    content,
    ariaLabel: 'Uluru',
    maxWidth: 500,
  });

  // Create the interactive marker.
  const marker = new AdvancedMarkerElement({
    position: center,
    map: innerMap,
    title: 'Uluru (Ayers Rock)',
    gmpClickable: true,
  });

  // Open the info window when the map loads.
  infoWindow.open({
    anchor: marker,
    map: innerMap,
  });

  // Re-open the info window when the marker is clicked.
  marker.addEventListener('gmp-click', () => {
    infoWindow.open({
      anchor: marker,
      map: innerMap,
    });
  });
}

void init();
```

--------------------------------------------------------------------------------

### 2. Reusing a Single InfoWindow Instance (Best Practice)

For the best user experience, **only one info window should be open on the map
at any one time**. Instead of instantiating multiple `InfoWindow` objects that
clutter the map, create a single `InfoWindow` instance and update its content,
position, or anchor dynamically upon user events.

Adapted from
[samples/place-autocomplete-map/index.ts](https://github.com/googlemaps/js-samples/blob/HEAD/samples/place-autocomplete-map/index.ts?utm_campaign=gmp_git_agentskills_v1)
and
[samples/map-geolocation/index.ts](https://github.com/googlemaps/js-samples/blob/HEAD/samples/map-geolocation/index.ts?utm_campaign=gmp_git_agentskills_v1):

```typescript
let map: google.maps.Map;
let marker: google.maps.marker.AdvancedMarkerElement;
let infoWindow: google.maps.InfoWindow;

async function initMap(): Promise<void> {
  const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary('maps') as Promise<google.maps.MapsLibrary>,
    google.maps.importLibrary('marker') as Promise<google.maps.MarkerLibrary>,
  ]);

  map = new Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 40.749933, lng: -73.98633 },
    zoom: 13,
    mapId: 'DEMO_MAP_ID',
    internalUsageAttributionIds: ['gmp_git_agentskills_v1'],
  });

  // Instantiate a single reusable marker and InfoWindow
  marker = new AdvancedMarkerElement({ map });
  infoWindow = new InfoWindow();

  // Example: Update and move the single InfoWindow to any clicked location
  map.addListener('click', (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    marker.position = event.latLng;
    updateInfoWindow(`Selected coordinates: ${event.latLng.toUrlValue()}`, event.latLng);
  });
}

function updateInfoWindow(
  content: string | Node,
  position: google.maps.LatLng | google.maps.LatLngLiteral
): void {
  infoWindow.setContent(content);
  infoWindow.setPosition(position);
  infoWindow.open({
    map,
    anchor: marker,
    shouldFocus: false,
  });
}

void initMap();
```

--------------------------------------------------------------------------------

### 3. Opening an InfoWindow at a Coordinate (Without a Marker)

You can anchor an `InfoWindow` directly to a `LatLng` on the map without a
marker by setting `position` (via options or `setPosition()`) and omitting
`anchor` when calling `open()`.

Adapted from
[samples/map-coordinates/index.ts](https://github.com/googlemaps/js-samples/blob/HEAD/samples/map-coordinates/index.ts?utm_campaign=gmp_git_agentskills_v1):

```typescript
async function initCoordinateInfoWindow(): Promise<void> {
  const { Map, InfoWindow } = (await google.maps.importLibrary(
    'maps'
  )) as google.maps.MapsLibrary;

  const chicago = { lat: 41.85, lng: -87.65 };

  const map = new Map(document.getElementById('map') as HTMLElement, {
    center: chicago,
    zoom: 6,
    internalUsageAttributionIds: ['gmp_git_agentskills_v1'],
  });

  const coordInfoWindow = new InfoWindow({
    content: `Chicago, IL (Zoom: ${map.getZoom()})`,
    position: chicago,
  });

  coordInfoWindow.open({ map });

  map.addListener('zoom_changed', () => {
    coordInfoWindow.setContent(`Chicago, IL (Zoom: ${map.getZoom()})`);
    coordInfoWindow.open({ map });
  });
}
```

--------------------------------------------------------------------------------

## Managing Focus, Sizing, and Lifecycle

### Setting and Restoring Focus

-   **Focusing on Open**: Call `infoWindow.focus()` only after the info window
    is visible on screen. Listen to the `visible` event before invoking
    `focus()`:

    ```typescript
    infoWindow.addListener('visible', () => {
      infoWindow.focus();
    });
    ```
-   **Overriding Close Focus**: When an info window is closed, focus
    automatically returns to the element that was focused prior to opening (or
    falls back to the map). To manage focus manually when the user clicks the
    close button:

    ```typescript
    infoWindow.addListener('closeclick', () => {
      // Handle focus or state cleanup manually
      document.getElementById('custom-return-button')?.focus();
    });
    ```

### Custom Sizing & Scrolling

By default, an info window expands to fit its content and auto-wraps text if it
fills the map.

-   Use `maxWidth` in `InfoWindowOptions` to enforce a maximum pixel width.
-   If you explicitly size the content inside a `<div>`, apply CSS
    `overflow: auto` to enable scrolling. Without scrolling enabled, content
    exceeding the available space may spill out of the info window.
