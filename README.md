# level-fancy
A client for connecting to a [level-fancy-server](https://github.com/daywiss/level-fancy-server). 

##Status
Work in progress. 

## Usage 

Connect a client with default settings

```js
var Client = require('level-fancy').Client
var client = new Client()
var db = client.connect().db
```

Put a value

```js
db.put('key',{some:'json'})

```
Get a value 

```js
db.get('key',function(err,value){
  console.log(value)
})

```

Use sublevel 'posts'

```js
db.posts.put('key',{some:'json'})

db.posts.get('key',function(err,value){
  console.log(value)
})

```

Subscribe to live data as it is published.

```js
  db.createLiveStream().on('data',console.log)
```

