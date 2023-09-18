const { promises } = require('fs')
const { join } = require('path')
const { copyFile, readdir, readFile, writeFile } = promises
const cwd = process.cwd()

const _fixAliasPaths = async (path, replace) => {
  try {
    const content = (await readFile(path)).toString()
    if (/ from '~/.test(content)) {
      const transformed = content.replace(/ from '~/g, ` from '${replace}`)
      await writeFile(path, transformed)
    }
  } catch (e) {
    if (e.code === 'EISDIR') {
      fixAliasPaths(path, replace === '.' ? '..' : `../${replace}`)
    } else {
      console.error(e)
    }
  }
}

const fixAliasPaths = async (path, replace) => {
  const files = await readdir(path)
  for (const file of files) {
    _fixAliasPaths(join(path, file), replace)
  }
}

const copyCssToDist = async (
  srcPath = join(cwd, 'src'),
  destPath = join(cwd, 'dist')
) => {
  const files = await readdir(srcPath)
  return Promise.all(
    files.map((file) => {
      if (!/\./.test(file)) {
        return copyCssToDist(join(srcPath, file), join(destPath, file))
      }
      if (/\.css$/.test(file)) {
        return copyFile(join(srcPath, file), join(destPath, file))
      }
      return null
    })
  )
}

fixAliasPaths('dist', '.')
copyCssToDist()
