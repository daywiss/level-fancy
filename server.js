var defaults = require('./config')
var multilevel = require('multilevel');
var net = require('net');
var level = require('level');
var sub = require('level-sublevel')
var sec = require('level-sec')
var createManifest = require('level-manifest')
var LiveStream = require('level-live-stream')


function Server(config){
  this.config = config
  if(this.config == null) this.config = defaults
  this.db = null
}

Server.prototype.close = function(){
  this.netServer.close()
}

Server.prototype.start = function(){
  var config = this.config
  var self = this
  
  db = sub(level(config.database,config.options));
  db.methods = db.methods || {}
  LiveStream.install(db)

  //create sublevels from config file
  for(var i in config.sublevels){
    var sl = config.sublevels[i]
    sublevel = db.sublevel(sl.name)
    //add livestream for each sublevel
    LiveStream.install(sublevel)
    //adding level-sec secondary indexes
    var tmpsec
    for(var i in sl.indices){
      var index = sl.indices[i]
      tmpsec=sec(sublevel).by(index.name,index.keys)
      sublevel = tmpsec.db
    }
    db[sl.name]=sublevel
    db.methods[sl.name]= {
      type:'object'
      ,methods:createManifest(db[sl.name]).methods
    }
  }

  multilevel.writeManifest(db,config.manifest)

  console.log(config.name, 'listening on', config.port,'with manifest',config.manifest)
  var server = net.createServer(function (con) {
    console.log('Client connected from', con.remoteAddress)
    con.setTimeout(config.timeout)
    con.on('error',function(err){
      console.log('connection error',err)
    }.bind(con))
    .on('timeout',function(){
      console.log('timed out')
      this.destroy()
    }.bind(con))
    .on('close',function(){
      console.log('ended connection')
      this.destroy()
    })
    var ml = multilevel.server(db)
      .on('error',function(err){
        console.log('db error',err)
      })
    con.pipe(ml).pipe(con);
  })

  //server.setMaxListeners(0)
  server.listen(config.port)
  server.on('error',function(err){
    console.log('server error',err)
  })
  self.db = db
  self.netServer = server 
  return self
}


module.exports = Server

process.argv.forEach(function(val,index,array){
  if(val == 'start' || val == '--start'){
    var server = new Server(defaults)
    server.start()
  }
})
