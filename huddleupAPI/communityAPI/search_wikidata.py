import requests


def search_wikidata(tag_name):
    url = "https://www.wikidata.org/w/api.php"
    params = {
        "action": "wbsearchentities",
        "search": tag_name,
        "language": "en",
        "format": "json",
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    return None


def get_entity_details(entity_id):
    url = "https://www.wikidata.org/w/api.php"
    params = {
        "action": "wbgetentities",
        "ids": entity_id,
        "languages": "en",
        "format": "json",
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    return None
