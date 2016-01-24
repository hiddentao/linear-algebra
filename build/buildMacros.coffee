fs = require('fs')
path = require('path')

algebraOpTempl = fs.readFileSync(path.join(__dirname, '../src/templates/algebra.js')).toString()
mathOpTempl = fs.readFileSync(path.join(__dirname, '../src/templates/math.js')).toString()
summaryOpTempl = fs.readFileSync(path.join(__dirname, '../src/templates/summary.js')).toString()

algebraOp = (name, expr) ->
  algebraOpTempl
    .replace(/NAME/g, name)
    .replace(/'EXPR'/g, expr)



mathOp = (name, expr, param) ->
  mathOpTempl
    .replace(/NAME/g, name)
    .replace(/PARAM/g, param)
    .replace(/'EXPR'/g, expr)

eleMathOp = (name, expr, exprVar1, exprVar2, param) ->
  mathOpTempl
    .replace(/NAME/g, name)
    .replace(/PARAM/g, param)
    .replace(/'EXPR'/g, expr + ", " + exprVar1 + ", " + exprVar2)


summaryOp = (name, cond, expr, param) ->
  summaryOpTempl
    .replace(/NAME/g, name)
    .replace(/PARAM/g, param)
    .replace(/'COND'/g, cond)
    .replace(/'EXPR'/g, expr)

module.exports = (fullStr, macroComps) ->
  tokens = macroComps.split(',').map (s) -> s.trim()

  switch tokens[0]
    when 'ALGEBRA_OP'
      return algebraOp(tokens[1], tokens[2])
    when 'MATH_OP'
      return mathOp(tokens[1], tokens[2], tokens[3])
    when 'ELE_MATH_OP'
      return eleMathOp(tokens[1], tokens[2], tokens[3], tokens[4], tokens[5])
    when 'SUMMARY_OP'
      return summaryOp(tokens[1], tokens[2], tokens[3])
    else
      throw new Error('Unrecognized PRAGMA macro')


