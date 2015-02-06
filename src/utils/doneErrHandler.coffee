logger = require './logger'

module.exports = (done, successMessage) ->
  (err) ->
    return logger.error err if err
    logger.success successMessage if successMessage
    logger.success 'Done!' unless successMessage
    done()