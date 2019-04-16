'use strict'
const path = require('path')
const fs = require('fs')
const sys = []
fs.readdirSync(__dirname).forEach(file => {
	sys.push(file)
})

console.log(sys)