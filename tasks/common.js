import gutils from 'gulp-util'
import path from 'path'

export const isProduction = !!gutils.env.production

export const noop = gutils.noop

export function onError(error) {
  gutils.log(error.message)
  this.emit('end')
}

export const root = (...to) => path.resolve(process.cwd(), ...to)
