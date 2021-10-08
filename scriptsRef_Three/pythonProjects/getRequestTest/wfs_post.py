import http.client
import json

headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
}

credentialsdata = {
    'username': 'maggis',
    'password': 'jack',
    'body': '''
        <GetCapabilities
        service="WFS"
        xmlns="http://www.opengis.net/wfs"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd"/>'''
}

json_credentialsdata = json.dumps(credentialsdata)

# connection
conn = http.client.HTTPConnection("localhost:8080")
conn.request('POST', '/geoserver/wfs', json_credentialsdata, headers)

# get result
response = conn.getresponse()

print (response.status, response.reason)

data = response.read()
print(data)

conn.close()