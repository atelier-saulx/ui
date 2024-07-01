const esbuild = require('esbuild')

esbuild
    .build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        outfile: './dist/index.js',
        minify: true,
        sourcemap: true,
        target: 'ESNext',
        define: {
            'process.env.NODE_ENV': '"production"',
        },
        loader: {
            '.js': 'jsx',
            '.ts': 'ts',
            '.tsx': 'tsx',
        },
    })
    .catch(() => process.exit(1))
