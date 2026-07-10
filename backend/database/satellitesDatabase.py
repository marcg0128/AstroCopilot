import os
from .databaseSeassion import DatabaseSeassion
import time
import json

class SatellitesDatabase(DatabaseSeassion):
    def __init__(self):
        super().__init__()


    def fetch_all_satellites(self):
        query = "SELECT norad_id, name FROM satellites"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def get_satellite_data(self, norad_id):
        query = "SELECT * FROM satellites WHERE norad_id = %s"
        self.cursor.execute(query, (norad_id,))
        return self.cursor.fetchone()

    def get_satellites_data(self, norad_ids):
        format_strings = ','.join(['%s'] * len(norad_ids))
        query = f"SELECT * FROM satellites WHERE norad_id IN ({format_strings})"
        self.cursor.execute(query, tuple(norad_ids))
        return self.cursor.fetchall()

    def add_satellite_data(self, norad_id, data):
        query = """
            INSERT INTO satellites (norad_id, name, lat, lon, height, path, last_update)
            VALUES (%s, %s, %s, %s, %s, %s, NOW())
            ON DUPLICATE KEY UPDATE
                lat = VALUES(lat),
                lon = VALUES(lon),
                height = VALUES(height),
                path = VALUES(path),
                last_update = NOW()
        """

        path_json = json.dumps([
            {
                "lat": float(p["lat"]),
                "lon": float(p["lon"]),
                "height": float(p["height"])
            }
            for p in data["path"]
        ])

        self.cursor.execute(
            query,
            (
                norad_id,
                data["name"],
                float(data["lat"]),
                float(data["lon"]),
                float(data["height"]),
                path_json
            )
        )

        self.connection.commit()

    def update_satellite_data(self, norad_id, name, lat, lon, height, path):
        query = """
            UPDATE satellites
            SET lat = %s, lon = %s, height = %s, path = %s, last_update = NOW()
            WHERE norad_id = %s
        """

        if not self.get_satellite_data(norad_id):
            print(f"Satellite with NORAD ID {norad_id} not found in database. Adding new entry.")
            self.add_satellite_data(norad_id, name, lat, lon, path)
            return

        self.cursor.execute(query, (lat, lon, height, path, norad_id))
        self.connection.commit()



    def close(self):
        self.cursor.close()
        self.connection.close()