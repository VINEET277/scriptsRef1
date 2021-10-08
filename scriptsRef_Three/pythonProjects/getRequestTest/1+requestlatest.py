import requests
from base64 import b64encode

# user = 'maggi'
# passwd = 'jack'
# headers = {'Authorization': 'Basic %s' % b64encode(str.encode("{}:{}".format(user, passwd))).decode("ascii")}
headers = None

x = requests.post('http://localhost:8080/geoserver/ows?service=wfs&version=2.0.0&request=GetCapabilities', headers=headers)
print(x.text)
print(x.reason)
print(x.status_code)