module.exports = class Module
  # json of the module.json definition file
  json: null

  constructor: ()->

  # Load everything associated with this module
  load: (@opts = {})->

  # Unload everything associated with this module
  unload: ()->

  #
