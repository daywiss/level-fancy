//connects to digimondb
var defaults = require('./config')
var net = require('net')
var multilevel = require('multilevel')

function Client(config){
  this.config = config
  if(this.config == null) this.config = defaults
  this.manifest = require(this.config.manifest)
  this.db = null
  this.dbcon = null
}
Client.prototype.close = function(){
  this.status = 'close'
  this.dbcon.end()
}
Client.prototype.connect = function(){
  var config = this.config
  var manifest = this.manifest
  var self = this
  function _connect(){
    self.status = 'open'
    self.db = multilevel.client(manifest,config.options)
    self.dbcon = net.connect(config.port,function(con){
      console.log('Connected to server on', config.port)
    })
    .on('error',function(err){
      console.log(err)
      if(this.status === 'open'){
        setTimeout(_connect,1000)
      }
    })
    self.dbcon.pipe(self.db.createRpcStream()).pipe(self.dbcon)
  }
  _connect()
  return self
}

module.exports = Client
