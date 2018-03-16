function checkErrors (errors) {
  return new Promise((resolve, reject) => {
    for (let v in errors) {
      if (errors[v].message !== false) {
        reject(errors)
        break
      }
    }
    resolve(true)
  })
}

function checkBlank (input) {
  if (input) {
    const valid = input.length > 0
    if (valid) {
      return false
    }
  }
  return 'Cannot be blank'
}

function checkBusinessName (input) {
  const regex = new RegExp(/^.{1,60}$/)
  const valid = regex.test(input)
  if (valid) {
    return false
  }
  return 'No longer than 60 characters'
}

function checkEmail (input) {
  const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
  const valid = regex.test(input)
  if (valid) {
    return false
  }
  return 'Enter a valid email address'
}

function checkAccountNumber (input) {
  const regex = new RegExp(/^[0-9]{6}$|^[0-9]{8}$/)
  const valid = regex.test(input)
  if (valid) {
    return false
  }
  return 'Enter a valid account number'
}

function checkSortCode (input) {
  const regex = new RegExp(/(\d{2}-? ?){2}\d{2}/)
  const valid = regex.test(input)
  if (valid) {
    return false
  }
  return 'Enter a valid sort code'
}







module.exports = {checkErrors, checkBlank, checkAccountNumber, checkBusinessName, checkSortCode, checkEmail}
