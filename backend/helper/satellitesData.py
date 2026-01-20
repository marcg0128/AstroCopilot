import requests
import time

from backend.helper.readTLE import get_tle_data
from backend.helper.skyfield import get_coordinates, get_orbit_path

BASE_URL = "https://celestrak.org/NORAD/elements/gp.php"
REQUEST_DELAY_SECONDS = 0.4
REQUEST_TIMEOUT_SECONDS = 15
MAX_RETRIES = 3
BACKOFF_SECONDS = 0.7

def fetch_satellite_data(norad_id: int = None, group=None, format: str = "TLE"):
    params = {}

    if norad_id is not None:
        params['CATNR'] = norad_id
    if group is not None:
        params['GROUP'] = group
    if format is not None:
        params['FORMAT'] = format

    last_error = None
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(BASE_URL, params=params, timeout=REQUEST_TIMEOUT_SECONDS)
            response.raise_for_status()
            return response.content
        except requests.RequestException as exc:
            last_error = exc
            time.sleep(BACKOFF_SECONDS * (attempt + 1))

    raise last_error

def get_all_satellites_coordinates(norad_ids: list):
    all_satellites_tle = {}
    all_satellites_data = {}

    for id in norad_ids:
        data = fetch_satellite_data(norad_id=id)
        all_satellites_tle[id] = data.decode('utf-8')
        time.sleep(REQUEST_DELAY_SECONDS)

    for norad_id, tle_string in all_satellites_tle.items():
        tle_data = get_tle_data(tle_string)
        coords = get_coordinates(tle_data)
        path = get_orbit_path(tle_data)

        all_satellites_data[norad_id] = {
            "name": tle_data["name"],
            "lat": coords["lat"],
            "lon": coords["lon"],
            "height": coords["height"],
            "path": path
        }

    return all_satellites_data



