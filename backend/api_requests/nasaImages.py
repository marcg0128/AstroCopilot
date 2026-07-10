import requests

def get_nasa_image_of_the_day(api_key='Up0G6skPEbRm5MV6y4kJVi14MxNcduvtptuvW3Se'):
    url = f'https://api.nasa.gov/planetary/apod?api_key={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {'error': 'Unable to fetch data from NASA API'}