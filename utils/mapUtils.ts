import { Position } from "@/models/position";
import { LatLng } from "react-native-maps";

function getCenter(positions: Position[] | LatLng[]) {

    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    if (positions.length == 0) {
        return {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 20,
            longitudeDelta: 20,
        }
    }

    positions.forEach((coordinate) => {
        minLat = Math.min(minLat, coordinate.latitude);
        maxLat = Math.max(maxLat, coordinate.latitude);
        minLng = Math.min(minLng, coordinate.longitude);
        maxLng = Math.max(maxLng, coordinate.longitude);
    });

    const region = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: maxLat - minLat + 0.009,
        longitudeDelta: maxLng - minLng + 0.0009,
    };

    return region;
}

export default { getCenter }