const Acadamy = require('../schemas/acadamy')

const getAcadamy = async() => {
  try {
    const result = await Acadamy.find({},{
      label: 1,
      key: 1
    })
    return result || []
  } catch (e) {
    console.error(e)
    return false
  }
}

const addAcadamy = async(obj) => {
  try{
    const result = await Acadamy.create(obj)
    return result._id
  } catch (e) {
    console.error(e)
    return false
  }
}

const deleteAcadamy = async(key) => {
  try{
    const result = await Acadamy.findOneAndRemove({key: key}, (err,res) => {
      if(err) {
        console.error(err)
        return false
      } else {
        return res
      }
    })
  } catch (e) {
    console.error(e)
    return false
  }
}

module.exports = {
  getAcadamy,
  addAcadamy,
  deleteAcadamy
}