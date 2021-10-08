import http.client
import urllib
from urllib.parse import urlencode

credentialsdata = {
    'username': 'maggi',
    'password': 'jack'
}

headers = {'Content-Type': 'application/x-www-form-urlencoded'}

encodeddata = urlencode(credentialsdata)
# connection
conn = http.client.HTTPConnection("localhost:8080")
conn.request('GET', '/geoserver/j_spring_security_check/', encodeddata, headers)

# get result
response = conn.getresponse()

print (response.status, response.reason)

data = response.read()
print(data)

conn.close()