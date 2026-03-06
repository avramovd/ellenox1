"use client"

import { useEffect, useMemo } from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"

export type UKInstaller = {
  id: string
  type: "hq" | "installer"
  lat: number
  lng: number
  name: string
  city: string
  postcodePrefixes: string[]
  website: string
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo([lat, lng], 9, { duration: 0.8 })
  }, [lat, lng, map])

  return null
}

function InvalidateSize({ deps }: { deps: string }) {
  const map = useMap()

  useEffect(() => {
    const t1 = window.setTimeout(() => map.invalidateSize(), 0)
    const t2 = window.setTimeout(() => map.invalidateSize(), 150)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [deps, map])

  return null
}

export default function UKLeafletMap({
  installers,
  selected,
  onSelect,
}: {
  installers: UKInstaller[]
  selected: UKInstaller | null
  onSelect: (i: UKInstaller) => void
}) {
  const markerIcon = useMemo(() => {
    const iconRetinaUrl = new URL(
      "leaflet/dist/images/marker-icon-2x.png",
      import.meta.url
    ).toString()
    const iconUrl = new URL(
      "leaflet/dist/images/marker-icon.png",
      import.meta.url
    ).toString()
    const shadowUrl = new URL(
      "leaflet/dist/images/marker-shadow.png",
      import.meta.url
    ).toString()

    return L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }, [])

  const mapKey =
    useMemo(() => installers.map((i) => i.id).join("|") || "empty", [installers])

  const deps = `${mapKey}-${selected?.id ?? "none"}`

  return (
    <MapContainer
      key={mapKey}
      center={[54.5, -2.5]}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <InvalidateSize deps={deps} />

      {selected && <FlyTo lat={selected.lat} lng={selected.lng} />}

      {installers.map((ins) => (
        <Marker
          key={ins.id}
          position={[ins.lat, ins.lng]}
          icon={markerIcon}
          eventHandlers={{ click: () => onSelect(ins) }}
        >
          <Popup>
            <div style={{ minWidth: 180 }}>
              <strong>{ins.name}</strong>
              <div style={{ marginTop: 4 }}>{ins.city}</div>

              <a
                href={ins.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  color: "#2563eb",
                  textDecoration: "underline",
                }}
              >
                Visit Website
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
