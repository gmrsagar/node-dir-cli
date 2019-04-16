#!/usr/bin/env node
'use strict'
const path = require('path')
const fs = require('fs')
let sys = {}

const dirTree = (filename) => {
	let obj = {}
	let child = ''
	let stats = fs.statSync(filename)
	if (stats.isDirectory()) {
		obj = {type: 'dir', name: path.basename(filename)}
		fs.readdirSync(filename).forEach(file => {
			child = dirTree(filename + '/' + file)
		})

		obj.children = []
		obj['children'].push(child)
	} else {
		obj = {type: 'file', name: path.basename(filename)}
	}
	return obj
}

const getDir = (dirname) => {
	sys.type = 'dir'
	sys.name = path.basename(dirname)
	sys.children = []
	fs.readdirSync(dirname).filter(file => {return file !== '.git'}).forEach(file => {
		let obj = dirTree(file)
		sys['children'].push(obj)
	})
	return sys
}
// console.log(sys)
console.log(JSON.stringify(getDir(process.cwd())))