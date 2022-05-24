export const validateEmail = (email: string) => {
  if (email.length == 0) return false
  var emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegx.test(email)
};

export const validatePassword = (password: string) => {
  if (password.length == 0) return false
  // var passwordRegex = /^[a-zA-Z0-9!@#$%^&*.,%]{8,16}$/;
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,%])[A-Za-z\d!@#$%^&*.,%]{8,}$/;
  return passwordRegex.test(password)
};

export const validateEmpty = (text: string) => {
  var valid = false
  for (let i = 0; i < text.length; i++) {
    if (text[i] == ' ') {
      valid = true
      console.log('sajfks', text[i])
    } else {
      valid = false
    }
  }
  if (valid) return false
  if (text.length == 0)
    return false
  else
    return true
};

export const validateNumber = (text: string) => {
  var numberRegex = /^[0-9]+$/
  if (text.length == 0) return false
  return numberRegex.test(text)
};

export const validateAlphabet = (text: string) => {
  var valid = false
  for (let i = 0; i < text.length; i++) {
    if (text[i] == ' ') {
      valid = true
      console.log('sajfks', text[i])
    } else {
      valid = false
    }
  }
  if (valid) return false
  var numberRegex = /^[a-zA-Z ]+$/
  if (text.length == 0) return false
  return numberRegex.test(text)
};