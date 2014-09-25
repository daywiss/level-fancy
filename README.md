# level-fancy
A client for connecting to a [level-fancy-server](https://github.com/daywiss/level-fancy-server). 

## Status
Work in progress. 

## Usage 

### Connect a client with default settings

	var Client = require('level-fancy').Client
	var client = new Client()
	var db = client.connect().db

### Connect with custom settings

	var client = new Client(config)
	

### Querying

Put a value

	db.put('key',{some:'json'})

Get a value 

	db.get('key',function(err,value){
	  console.log(value)
	})


Use sublevel 'posts'

	db.posts.put('key',{some:'json'})
	
	db.posts.get('key',function(err,value){
	  console.log(value)
	})


### Subscribe to live data as it is published.

	db.createLiveStream().on('data',console.log)

