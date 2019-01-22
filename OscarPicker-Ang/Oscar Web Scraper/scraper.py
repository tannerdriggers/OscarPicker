import json
from firebase import firebase
fb = firebase.FirebaseApplication('https://oscarpicker-85422.firebaseio.com', None)
test = {'test': 'test'}
result = fb.put('/test', json.dumps(test))
print result
