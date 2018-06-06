import parse from './parse'
import stringify from './stringify'
import scale from './scale'

const scalePath = (path, options) => {
  const parsed = parse(path)
  const scaled = scale(parsed, options)
  return stringify(scaled)
}

export { parse, stringify, scale, scalePath }
