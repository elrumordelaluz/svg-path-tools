import test from 'ava'
import { scale, parse, stringify, scalePath } from './dist/svg-path-tools.cjs'

const d = 'M15 10A5 5 0 0 1 10 15A5 5 0 0 1 5 10A5 5 0 0 1 15 10z'
const d_scaled =
  'M7.5 5A2.5 2.5 0 0 1 5 7.5A2.5 2.5 0 0 1 2.5 5A2.5 2.5 0 0 1 7.5 5z'

test('Parse', async t => {
  const parsed = parse(d)
  t.true(Array.isArray(parsed))

  for (const { command, values } of parsed) {
    t.true(Array.isArray(values))
    t.true(typeof command === 'string')
  }
})

test('Stringify', async t => {
  const parsed = parse(d)
  const stringified = stringify(parsed)
  t.is(d, stringified)
  t.true(typeof stringified === 'string')
})

test('Scale', async t => {
  const parsed = parse(d)
  const scaled = scale(parsed, { scale: 0.5 })
  t.not(d, stringify(scaled))
  t.is(parsed[0].command, scaled[0].command)
  t.is(parsed[0].values[0], scaled[0].values[0] * 2)
  t.is(parsed[0].values[1], scaled[0].values[1] * 2)
})

test('Scale Path string', async t => {
  const scaled = scalePath(d, { scale: 0.5 })
  t.is(scaled, d_scaled)
  t.not(d, scaled)
})
