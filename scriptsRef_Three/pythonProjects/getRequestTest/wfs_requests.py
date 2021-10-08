import requests
import json

headers = {
    'Content-Type': 'application/xml',
}

xml = """<GetCapabilities service="WFS" 
            xmlns="http://www.opengis.net/wfs" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
            xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"/>"""

formdata = {
    'username': 'maggi',
    'password': 'jack',
    'body': 2
}

response = requests.post('http://localhost:8080/geoserver/wfs', headers=headers, data=xml)

print(response.text)