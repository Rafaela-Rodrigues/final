import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

export default function Map({ geo }) {
    const { lat, lon } = geo
    const position = [lat, lon]

    return (
        <MapContainer
            center={position}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} draggable animate>
                <Popup>Fica bem aqui!</Popup>
            </Marker>
        </MapContainer>
    )
}
