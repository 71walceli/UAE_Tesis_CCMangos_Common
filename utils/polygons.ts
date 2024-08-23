import {center, area, length} from "@turf/turf";

export const parsePolygon = (string: string) => string.trim() !== ""
  ?string.split(";").map(coord => coord.split(":"))
    .map(([lat, lng]) => ({ lat: Number(lat), lng: Number(lng) }))
  :[]

export const getCenter = (polygon: {lat: number, lng: number}[]) => {
  const _center = center({
    type: "Polygon",
    coordinates: [polygon.map(({ lat, lng }) => [lng, lat])]
  }).geometry.coordinates.reverse();
  return { lat: _center[0], lng: _center[1] };
}

/**
 * @param polygon {lat: number, lng: number}[]
 * @returns length in kilometers
 */
export const getLength = (polygon: {lat: number, lng: number}[]) => length({ 
  type: "Polygon", 
  coordinates: [polygon.map(({ lat, lng }) => [lng, lat])],
  //units: "kilometers",
})

/**
 * @param polygon {lat: number, lng: number}[]
 * @returns area in square meters
 */
export const getArea = (polygon: {lat: number, lng: number}[]) => area({ 
  type: "Polygon", 
  coordinates: [polygon.map(({ lat, lng }) => [lng, lat])],
  //units: "hectares",
})
