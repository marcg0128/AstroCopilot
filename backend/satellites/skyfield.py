from skyfield.api import EarthSatellite, load, wgs84, utc
from datetime import datetime, timedelta

def get_coordinates(tle_data):
    satellite = EarthSatellite(tle_data["line1"], tle_data["line2"], tle_data["name"])
    geocentric = satellite.at(load.timescale().now())

    geo_pos = wgs84.geographic_position_of(geocentric)

    lat = geo_pos.latitude
    lon = geo_pos.longitude
    height = geo_pos.elevation.km

    return {
        "lat": lat.degrees,
        "lon": lon.degrees,
        "height": height
    }


def get_orbit_path(tle_data, points=60):
    satellite = EarthSatellite(tle_data["line1"], tle_data["line2"], tle_data["name"])
    ts = load.timescale()

    start_time = datetime.now(utc)

    path = []
    for i in range(points):
        current_time = start_time + timedelta(minutes=i * 2)
        t = ts.from_datetime(current_time)

        geocentric = satellite.at(t)
        subpoint = wgs84.geographic_position_of(geocentric)

        path.append({
            "lat": subpoint.latitude.degrees,
            "lon": subpoint.longitude.degrees,
            "height": subpoint.elevation.km
        })

    return path