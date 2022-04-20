module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-color': 'var(--primary-color)',
                'primary-hover-color': 'var(--primary-hover-color)',
                'header-color': 'var(--header-color)',
                'header-text-color': 'var(--header-text-color)',
                'header-button-color': 'var(--header-button-color)',
                'header-button-hover': 'var(--header-button-hover)',
                'text-color': 'var(--text-color)',
                'bg-color': 'var(--bg-color)',
                'modal-bg-color': 'var(--modal-bg-color)',
                'input-bg': 'var(--input-bg)',
                'input-text-color': 'var(--input-text-color)',
                'bg-card': 'var(--bg-card)',
            },
            backgroundImage: {
                wave: "url('/assets/wave.svg')",
                building: "url('/assets/building.svg')",
                hotel: "url('/assets/bg-search.jpg')",
            },
        },
    },
    plugins: [],
}
