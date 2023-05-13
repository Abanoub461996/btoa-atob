/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
	theme: {
		colors: {
			primary: 'rgba(var(--color-primary), 1)',
			secondary: 'rgba(var(--color-secondary), 1)',
			...colors,
		},
		extend: {
			height: {
				85: '22.5rem',
				165: '45rem',
			},
		},
		fontFamily: {
			Manrope: ['Manrope', 'sans-serif'],
			LibreBaskerville: ['LibreBaskerville', 'sans-serif'],
		},
		screens: {
			sm: { min: '640px', max: '767px' },
			// => @media (min-width: 640px and max-width: 767px) { ... }

			md: { min: '768px', max: '1023px' },
			// => @media (min-width: 768px and max-width: 1023px) { ... }

			lg: { min: '1024px', max: '1279px' },
			// => @media (min-width: 1024px and max-width: 1279px) { ... }

			xl: { min: '1280px', max: '1535px' },
			// => @media (min-width: 1280px and max-width: 1535px) { ... }

			'2xl': { min: '1536px' },
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
};
