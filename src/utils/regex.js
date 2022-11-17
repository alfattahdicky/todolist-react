const upperCaseAndRemoveSpecialCharacter = (string = "") => {
  return string.replace(/[^\w\s]/gi, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
} 

export default upperCaseAndRemoveSpecialCharacter;