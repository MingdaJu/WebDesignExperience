const encodeHex = (str) => {
  try{
    const temp = new Buffer(str)
    return temp.toString('hex')
  } catch (e) {
    return false
  }
}

const decodeHex = (str) => {
  try{
    const temp = new Buffer(str, 'hex')
    return temp.toString('utf8')
  } catch (e) {
    return false
  }
}

const encodeBase64 = (str) => {
  try{
    const temp = new Buffer(str)
    return temp.toString('base64')
  } catch (e) {
    return false
  }
}

const decodeBase64 = (str) => {
  try{
    const temp = new Buffer(str, 'base64')
    return temp.toString()
  } catch (e) {
    return false
  }
}

const mulEncode = (str) => {
  try{
    return encodeHex(encodeBase64(str))
  } catch (e) {
    return false
  }
}

const mulDecode = (str) => {
  try{
    return decodeBase64(decodeHex(str))
  } catch (e) {
    return false
  }
}

module.exports = {
  encodeHex,
  decodeHex,
  encodeBase64,
  decodeBase64,
  mulEncode,
  mulDecode
}