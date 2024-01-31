const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controlles/tracks')
const { validateCreate } = require('../validators/users')

router.get('/', checkAuth, getItems)

router.get('/:id', checkOrigin, getItem)

//TODO: Donde recibimos data
router.post('/', checkOrigin, validateCreate, createItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem)


module.exports = router