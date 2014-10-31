## 0.0.4

Features:

 * Add reconnect configuration

Bugfixes:

 * Was attempting to reconnect when status was open instead of not open
 * Reconnect was referencing this instead of self causing check to never
   pass

Documentation:

 * Added this changelog
