import http.client
import urllib

# headers
headers = {'X-Credentials': 'private-user={user}&private-pw={password}'.format(user='maggi',password='jack')}
print(headers)

# connection
conn = http.client.HTTPConnection("localhost:8080")
conn.request('GET', '/usercheck', None, headers)

# get result
response = conn.getresponse()

print (response.status, response.reason)

data = response.read()
print(data)

conn.close()