import requests
import os
import json

def get_eclipses_for_year(year):
    eclipses = {
        "lunar": [],
        "solar": []
    }

    url = f"https://opale.imcce.fr/api/v1/phenomena/eclipses/301/{year}"

    data = requests.get(url).json()

    try:
        eclipses["lunar"].append(data["response"]["lunareclipse"])

    except KeyError:
        print(f"No lunar reclipses for {year}")



    try:
        eclipses["solar"].append(data["response"]["solareclipse"])
    except KeyError:
        print(f"No solar reclipses for {year}")


    new_json = json.dumps(eclipses)


    dir_path = os.path.join(os.path.dirname(__file__), "..", "database", "json")
    os.makedirs(dir_path, exist_ok=True)

    file_path = os.path.join(dir_path, f"eclipses_{year}.json")

    with open(file_path, "w", encoding="utf-8") as outfile:
        json.dump(eclipses, outfile, ensure_ascii=False, indent=4)

    return True