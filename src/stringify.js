export default path => {
  return path.reduce((acc, next) => {
    return `${acc}${next['command']}${next['values'].join(' ')}`
  }, '')
}
