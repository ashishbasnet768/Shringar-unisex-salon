# Customize a Marker on a Map

## Overview

With `AdvancedMarkerElement`, markers are added directly to the DOM as HTML
elements. Because `AdvancedMarkerElement` is a DOM element (or wraps custom DOM
content via its `content` property), you can apply standard CSS styles, build
custom markers from scratch using arbitrary HTML elements, attach interactive
event listeners, and run CSS animations or transitions.

## Prerequisites

*   **Add a marker to a map**: You must have an initialized Google Map
    configured with a valid `mapId` (required for `AdvancedMarkerElement`) and
    the `marker` library imported via `google.maps.importLibrary("marker")`.

--------------------------------------------------------------------------------

## Implementation Workflows

### 1. Simple Custom HTML Marker

You can replace the default red pin with a custom DOM element (such as a `div`
displaying a price tag or badge) by either passing the element to the `content`
option or appending it directly to the `AdvancedMarkerElement`.

#### JavaScript / TypeScript

```typescript
async function initMap(): Promise<void> {
  const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("maps") as Promise<google.maps.MapsLibrary>,
    google.maps.importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
  ]);

  const map = new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 37.42, lng: -122.1 },
    zoom: 14,
    mapId: "DEMO_MAP_ID",
    internalUsageAttributionIds: ["gmp_git_agentskills_v1"],
  });

  // Create custom HTML content
  const priceTag = document.createElement("div");
  priceTag.className = "price-tag";
  priceTag.textContent = "$2.5M";

  // Instantiate the marker with custom HTML content
  const marker = new AdvancedMarkerElement({
    map,
    position: { lat: 37.42, lng: -122.1 },
    content: priceTag,
  });
}

void initMap();
```

#### Web Component (`<gmp-map>`) Alternative

If using the `<gmp-map>` web component, you can append the custom DOM element
directly to the `AdvancedMarkerElement` and append the marker to the map
element:

```html
<gmp-map
  center="37.42,-122.1"
  zoom="14"
  map-id="DEMO_MAP_ID"
  internal-usage-attribution-ids="gmp_git_agentskills_v1">
</gmp-map>
```

```javascript
const mapElement = document.querySelector("gmp-map");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

const priceTag = document.createElement("div");
priceTag.className = "price-tag";
priceTag.textContent = "$2.5M";

const marker = new AdvancedMarkerElement({
  position: { lat: 37.42, lng: -122.1 },
});
marker.append(priceTag);
mapElement.append(marker);
```

#### CSS

```css
.price-tag {
  background-color: #4285f4;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  padding: 10px 15px;
  position: relative;
  transform: translateY(-8px);
}

/* Pointer triangle at the bottom of the tag */
.price-tag::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #4285f4;
}
```

--------------------------------------------------------------------------------

### 2. Customizing Default Pins with `PinElement`

If you want to keep the standard pin shape but customize its colors, border,
scale, or inner glyph (text or icon), use `PinElement` from the `marker`
library.

```typescript
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

const pinGlyph = new PinElement({
  background: "#fbbc04",
  borderColor: "#137333",
  glyph: "A",
  glyphColor: "white",
  scale: 1.2,
});

const marker = new AdvancedMarkerElement({
  map,
  position: { lat: -25.344, lng: 131.031 },
  content: pinGlyph.element,
});
```

--------------------------------------------------------------------------------

### 3. Interactive HTML Markers

To make custom HTML markers respond to user clicks (such as expanding a card to
show details), set `gmpClickable: true` on the `AdvancedMarkerElement` and
listen for the `gmp-click` event. Be sure to adjust `zIndex` when expanding a
marker so it renders above neighboring markers.

#### JavaScript / TypeScript

```typescript
interface Property {
  address: string;
  description: string;
  price: string;
  position: google.maps.LatLngLiteral;
}

async function initInteractiveMarkers(): Promise<void> {
  const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("maps") as Promise<google.maps.MapsLibrary>,
    google.maps.importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
  ]);

  const map = new Map(document.getElementById("map") as HTMLElement, {
    zoom: 11,
    center: { lat: 37.432, lng: -122.167 },
    mapId: "DEMO_MAP_ID",
    internalUsageAttributionIds: ["gmp_git_agentskills_v1"],
  });

  const property: Property = {
    address: "215 Emily St, Mountain View, CA",
    description: "Single family house with modern design",
    price: "$3,889,000",
    position: { lat: 37.5, lng: -122.285 },
  };

  const marker = new AdvancedMarkerElement({
    map,
    content: buildContent(property),
    position: property.position,
    title: property.description,
    gmpClickable: true,
  });

  marker.addEventListener("gmp-click", () => {
    toggleHighlight(marker);
  });
}

function buildContent(property: Property): HTMLElement {
  const content = document.createElement("div");
  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">🏠</div>
    <div class="details">
      <div class="price">${property.price}</div>
      <div class="address">${property.address}</div>
    </div>
  `;
  return content;
}

function toggleHighlight(markerView: google.maps.marker.AdvancedMarkerElement): void {
  const content = markerView.content as HTMLElement;
  if (content.classList.contains("highlight")) {
    content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    content.classList.add("highlight");
    markerView.zIndex = 1; // Bring expanded marker to the front
  }
}

void initInteractiveMarkers();
```

#### CSS

```css
.property {
  align-items: center;
  background-color: #0288d1;
  border-radius: 50%;
  color: #ffffff;
  display: flex;
  height: 30px;
  justify-content: center;
  padding: 4px;
  position: relative;
  transition: all 0.3s ease-out;
  width: 30px;
  transform: translateY(-9px);
}

.property .details {
  display: none;
  flex-direction: column;
}

.property.highlight {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
  color: #263238;
  gap: 12px;
  height: auto;
  padding: 8px 15px;
  width: auto;
}

.property.highlight .details {
  display: flex;
}
```

--------------------------------------------------------------------------------

### 4. Animated Markers (CSS Keyframes + `IntersectionObserver`)

Because `AdvancedMarkerElement` content is a standard DOM element, you can
animate markers using CSS `@keyframes` and trigger animations when markers enter
the viewport using the browser's `IntersectionObserver`.

#### JavaScript / TypeScript

```typescript
const intersectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("drop");
      intersectionObserver.unobserve(entry.target);
    }
  }
});

function createAnimatedMarker(
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement,
  PinElement: typeof google.maps.marker.PinElement
): void {
  const content = new PinElement().element;

  new AdvancedMarkerElement({
    position,
    map,
    content,
  });

  // Hide initially until animation runs
  content.style.opacity = "0";
  content.addEventListener("animationend", () => {
    content.classList.remove("drop");
    content.style.opacity = "1";
  });

  const delay = 0.5 + Math.random();
  content.style.setProperty("--delay-time", `${delay}s`);
  intersectionObserver.observe(content);
}
```

#### CSS

```css
:root {
  --delay-time: 0.5s;
}

@keyframes drop {
  0% {
    transform: translateY(-200px) scaleY(0.9);
    opacity: 0;
  }
  5% {
    opacity: 0.7;
  }
  50% {
    transform: translateY(0px) scaleY(1);
    opacity: 1;
  }
  65% {
    transform: translateY(-17px) scaleY(0.9);
    opacity: 1;
  }
  75% {
    transform: translateY(-22px) scaleY(0.9);
    opacity: 1;
  }
  100% {
    transform: translateY(0px) scaleY(1);
    opacity: 1;
  }
}

.drop {
  animation: drop 0.3s linear forwards var(--delay-time);
}
```

--------------------------------------------------------------------------------

## React Integration (`@vis.gl/react-google-maps`)

If building with React using `@vis.gl/react-google-maps`, you can customize
markers declaratively by passing `<Pin />` or custom JSX elements as children of
`<AdvancedMarker />`.

*   Reference Sample:
    [`examples/advanced-marker-interaction/src/app.tsx`](https://github.com/visgl/react-google-maps/blob/HEAD/examples/advanced-marker-interaction/src/app.tsx?utm_campaign=gmp_git_agentskills_v1)

```tsx
import React, { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  CollisionBehavior,
} from '@vis.gl/react-google-maps';

export function CustomMarkerMap() {
  const [selected, setSelected] = useState(false);

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY!} libraries={['marker']}>
      <Map
        mapId="bf51a910020fa25a"
        defaultZoom={12}
        defaultCenter={{ lat: 53.559, lng: 10.005 }}
        internalUsageAttributionIds={['gmp_git_agentskills_v1']}>

        {/* Customized Pin */}
        <AdvancedMarker
          position={{ lat: 53.559, lng: 10.005 }}
          onClick={() => setSelected(!selected)}>
          <Pin
            background={selected ? '#22ccff' : 'orange'}
            borderColor={selected ? '#1e89a1' : null}
            glyphColor={selected ? '#0f677a' : null}
          />
        </AdvancedMarker>

        {/* Custom HTML / JSX Content */}
        <AdvancedMarker
          position={{ lat: 53.565, lng: 10.015 }}
          collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}>
          <div className="custom-html-badge">Custom JSX Marker</div>
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
```

--------------------------------------------------------------------------------

## Best Practices & Common Pitfalls

*   **Map ID Requirement**: `AdvancedMarkerElement` requires a `mapId`
    configured on the `Map` instance (or `map-id` attribute on `<gmp-map>`).
    Without a `mapId`, advanced markers will fail to render. Use `'DEMO_MAP_ID'`
    for quick testing or create a Map ID in the Google Cloud Console.
*   **Z-Index Management**: When markers overlap—especially interactive markers
    that expand on hover or click—explicitly increase `marker.zIndex` on the
    active/hovered marker so its expanded UI is not clipped behind adjacent
    markers. A common pattern is sorting markers by latitude
    (`b.position.lat - a.position.lat`) for default `zIndex` ordering so
    southern markers naturally appear in front.
*   **Keyboard Accessibility**: Markers are only keyboard-focusable (via `Tab`
    and arrow keys) when they have a click listener attached (`gmp-click` or
    `click`) and `gmpClickable: true`. Always provide a meaningful `title`
    attribute or screen-reader-only text (`aria-hidden` / `.sr-only`) inside
    custom HTML markers.
*   **Prefer `AdvancedMarkerElement` over Legacy `google.maps.Marker`**: While
    legacy `google.maps.Marker` supports `icon` and `SymbolPath` customizations
    (see
    [`samples/marker-symbol-custom/index.ts`](https://github.com/googlemaps/js-samples/blob/HEAD/samples/marker-symbol-custom/index.ts?utm_campaign=gmp_git_agentskills_v1)
    and
    [`samples/marker-clustering/index.ts`](https://github.com/googlemaps/js-samples/blob/HEAD/samples/marker-clustering/index.ts?utm_campaign=gmp_git_agentskills_v1)),
    `AdvancedMarkerElement` is the modern standard offering full DOM/CSS
    capabilities and higher rendering performance.
