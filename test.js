var config = require('./testconfig.js')
var proj = require('./')
var Client = proj.Client
var Server = proj.Server

var server = new Server(config).start()
var client1 = new Client(config).connect()
var client2 = new Client(config).connect()

var plc = {
  "name": "XRI 1",
  "type": "Full SCADA",
  "typeid": 2,
  "id": "192.168.17.20",
  "network": {
    "bridge": "192.168.17.21",
    "ip": "192.168.17.20",
    "netmask": "255.0.0.0",
    "name": "0000-20d1",
    "subscriber": 3
  },
  "timestamp": 1398189035393
}

client2.db.liveStream({old:false}).on('data',console.log)
client1.db.plcs.put(plc.id,plc,function(){
  client2.db.plcs.byIP.get('192.168.17.20',console.log)
  //client2.db.plcs.byName.get('XRI 1',console.log)
})
//client1.db.plcs.del(plc.id)
  //console.log(arguments)
//})
//client2.db.plcs.byName.createReadStream().on('data',console.log)
//client2.db.plcs.createReadStream().on('data',console.log)

//client1.close()
//client2.close()
//server.close()
