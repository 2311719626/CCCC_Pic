module.exports = [
    {
        files: ['src/**/*.js','src/**/*.model.js'],
        ignores: ['**/*.config.js'],
        rules: {
            "semi": ["error","never"],
            "no-await-in-loop": ["error"],
            "no-dupe-keys": ["error"],
            "no-duplicate-case": ["error"],
            "curly": ["warn","always"],
            "eqeqeq": ["warn"],
            "no-floating-decimal": ["error"],
            "no-undef": ["error"],
            "no-unused-vars": ["warn"],
            "prefer-const": ["warn","always"],
            "no-var": ["error","always"],
            "camelcase": ["warn"],
            "indent": ["error",4],
            "comma-dangle": ["warn","never"],
            "no-duplicate-imports": ["error"],

        }
    }
]