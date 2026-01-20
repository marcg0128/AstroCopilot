import requests
import time

from backend.helper.readTLE import get_tle_data
from backend.helper.skyfield import get_coordinates

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

def get_all_satellites_coordinates(norad_ids: list):
    all_satellites_tle = {}
    all_satellites_data = {}

    for id in norad_ids:
        data = fetch_satellite_data(norad_id=id)
        all_satellites_tle[id] = data.decode('utf-8')
        time.sleep(0.5)


    for norad_id, tle_string in all_satellites_tle.items():
        tle_data = get_tle_data(tle_string)
        coords = get_coordinates(tle_data)

        all_satellites_data[norad_id] = {
            "name": tle_data["name"],
            "coordinates": coords
        }

    return all_satellites_data



