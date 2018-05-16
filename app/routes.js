const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})





// Errors
const {checkErrors, checkBlank, checkAccountNumber, checkBusinessName, checkSortCode, checkEmail} = require('./errorfunctions')

router.post('/errors/check-errors', (req, res) => {
  const errors = {
    'business-name': {
      label: 'Organisation name',
      message: checkBlank(req.body['business-name']) || checkBusinessName(req.body['business-name'])
    },
    'email': {
      label: 'Email address',
      message: checkBlank(req.body['email']) || checkEmail(req.body['email'])
    },
    'account-number': {
      label: 'Account number',
      message: checkBlank(req.body['account-number']) || checkAccountNumber(req.body['account-number'])
    },
    'sort-code': {
      label: 'Sort code',
      message: checkBlank(req.body['sort-code']) || checkSortCode(req.body['sort-code'])
    }
  }

  checkErrors(errors)
  .then(() => {
    res.redirect('/errors/output')
  })
  .catch(errors => {
    res.render('errors/index', {errors})
  })
})





// Data
const data = require('./assets/data.json')

router.get('/data/', function (req, res) {
  res.locals.users = data
  res.render('data/index')
})

const fs = require('fs')

router.post('/data', (req, res) => {
  const newItem = Object.assign({
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone
  })
  data.push(newItem)
  fs.writeFile('app/assets/data.json', JSON.stringify(data,null,2), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
  res.redirect('/data/confirmation-page')
})





module.exports = router
