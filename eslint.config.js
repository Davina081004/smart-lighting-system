export default [
    {
        files: ["*.js", "tests/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module"
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "semi": ["error", "always"]
        }
    }
];
