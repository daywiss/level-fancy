//connects to digimondb
var defaults = require('./config')
var net = require('net')
var multilevel = require('multilevel')
var argv = require('minimist')(process.argv.slice(2))

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
    self.dbcon = net.connect(config,function(con){
      console.log('Connected to multilevel on', config.port)
      self.dbcon.pipe(self.db.createRpcStream()).pipe(self.dbcon)
    })
    self.dbcon.on('error',function(err){
      console.log(err)
      if(this.status === 'open' && config.hasOwnProperty('reconnectTimeout')){
        setTimeout(_connect, config.reconnectTimeout)
      }
    })
    self.dbcon.on('close', function () {
        console.log('Multilevel connection closed')
    })
  }
  _connect()
  return self
}

module.exports = Client

if(argv.start){
  var config = defaults
  if(typeof argv.start === 'string'){
    config = require(argv.start)
  }
  new Client(config).connect()
}
