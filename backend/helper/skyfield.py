from skyfield.api import EarthSatellite, load, wgs84


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