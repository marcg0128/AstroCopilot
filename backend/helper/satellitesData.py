import requests

from backend.helper.readTLE import get_tle_data
from backend.helper.skyfield import get_coordinates

NORAD_IDS = [
    25544,  # ISS
    20580,  # Hubble
    48274,  # Tiangong
    39634,  # Sentinel-1A
    40697,  # Sentinel-2A
]

BASE_URL = "https://celestrak.org/NORAD/elements/gp.php"

def fetch_satellite_data(norad_id: int = None, group=None, format: str = "TLE"):
    params = {}

    if norad_id is not None:
        params['CATNR'] = norad_id
    if group is not None:
        params['GROUP'] = group
    if format is not None:
        params['FORMAT'] = format

    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.content

def test():
    all_satellites = {}
    for norad_id in NORAD_IDS:
        data = fetch_satellite_data(norad_id=norad_id)
        all_satellites[norad_id] = data.decode('utf-8')

    for norad_id, tle_string in all_satellites.items():
        tle_data = get_tle_data(tle_string)

        get_coordinates(tle_data)



