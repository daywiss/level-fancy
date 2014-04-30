var assert = require('assert')
var fancy = require('..')
var client1 = new fancy.Client()
var client2 = new fancy.Client()

var db1 = client1.connect().db
var db2 = client2.connect().db

var val = {some:'json'}

db1.put('key',val)
db2.get('key',function(err,data){
  assert.deepEqual(val,data,'Values should equal each other')
  //console.log(data)
  db1.close()
  db2.close()
})

