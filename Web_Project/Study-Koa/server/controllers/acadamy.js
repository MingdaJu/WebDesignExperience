const Acadamy = require('../models/acadamy')

const getAcadamyList = async(ctx) => {
  // 获取学院列表
  /*
    this.$http.get('/api/acadamylist')
  */
  let acadamyList = await Acadamy.getAcadamy()
  ctx.body = {
    success: true,
    data: acadamyList
  }
}

const addAcadamy = async(ctx) => {
  // 添加学院
  /*
    this.$http.post('/api/acadamy',{
      label: xxxxx,
      key: xxxxx
    })
  */
  let {label,key} = ctx.request.body
  if(!(label&&key)){
    ctx.body = {
      success:false,
      msg:'添加失败'
    }
    return
  }
  let obj = {
    label: ctx.request.body.label,
    key: ctx.request.body.key
  }
  let result = await Acadamy.addAcadamy(obj)

  ctx.body = {
    success: result ? true : false,
    msg: '添加成功'
  }
}

const deleteAcadamy = async(ctx) => {
  // 删除学院
  /*
    this.$http.get('/api/deleteacadamy?key=xxxx')
  */
  let key = ctx.query.key
  if(!key) {
    ctx.body = {
      success:false,
      msg:'删除失败'
    }
    return
  }

  let result = await Acadamy.deleteAcadamy(key)

  ctx.body = {
    success: result ? true : false,
    msg: '删除成功'
  }
}

module.exports = {
  getAcadamyList,
  addAcadamy,
  deleteAcadamy
}