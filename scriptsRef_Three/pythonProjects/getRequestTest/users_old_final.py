import http.client
import urllib
from base64 import b64encode

# build authorization
user_and_pass = b64encode(b"maggis:jack").decode("ascii")
# user_and_pass = b64encode(b"maggi:jack").decode("ascii")
print(user_and_pass)

# headers
headers = {'Authorization': 'Basic %s' % user_and_pass}

# connection
conn = http.client.HTTPConnection("localhost:8080")
conn.request('GET', '/geoserver/ows?service=wfs&version=2.0.0&request=GetCapabilities', None, headers)

# get result
response = conn.getresponse()

print (response.status, response.reason)

data = response.read()
# print(data)

conn.close()