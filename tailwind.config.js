/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./client/src/**/*.{js,jsx,ts,tsx,html}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#334156',
                },
            },
        },
    },
    plugins: [],
};
