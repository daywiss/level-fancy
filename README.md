# level-fancy
Custom level db database configuration with server and client. Uses [multi-level](https://github.com/juliangruber/multilevel) 
for multiple tcp client connections, [sublevel](https://github.com/juliangruber/multilevel) for key organization, 
[level-live-stream](ihttps://github.com/dominictarr/level-live-stream) for pub/sub functionality,
[level-sec](https://github.com/juliangruber/level-sec/blob/master/test/sec.js) for secondary indexes,
and [memdown](https://github.com/rvagg/memdown) for optional in memory data storage. 

## Usage 
Start a server with default settings

```
node server --start
```

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



