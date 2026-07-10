def get_tle_data(tle_string: str):
    lines = tle_string.strip().split('\n')
    if len(lines) != 3:
        raise ValueError("TLE string must contain exactly three lines.")

    name = lines[0].strip()
    line1 = lines[1].strip()
    line2 = lines[2].strip()

    return {
        "name": name,
        "line1": line1,
        "line2": line2
    }