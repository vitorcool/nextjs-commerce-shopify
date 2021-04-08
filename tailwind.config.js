

module.exports = {
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: ['outline-none'],
      },
    },
  },
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        primary: 'var(--primary)',
        'primary-2': 'var(--primary-2)',
        secondary: 'var(--secondary)',
        'secondary-2': 'var(--secondary-2)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accents-0': 'var(--accents-0)',
        'accents-1': 'var(--accents-1)',
        'accents-2': 'var(--accents-2)',
        'accents-3': 'var(--accents-3)',
        'accents-4': 'var(--accents-4)',
        'accents-5': 'var(--accents-5)',
        'accents-6': 'var(--accents-6)',
        'accents-7': 'var(--accents-7)',
        'accents-8': 'var(--accents-8)',
        'accents-9': 'var(--accents-9)',
        'violet-0': 'var(--violet)',
        'violet-light': 'var(--violet-light)',
        'pink-0': 'var(--pink)',
        'cyan-0': 'var(--cyan)',
        'blue-0': 'var(--blue)',
        'red-0': 'var(--red)',
        'green-0': 'var(--green)',
        'x-1': 'var(--x-1)',
        'x-2': 'var(--x-2)',
        'x-3': 'var(--x-3)',
        'x-4': 'var(--x-4)',
        'x-5': 'var(--x-5)',
        'x-6': 'var(--x-6)',
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accents-2)',
        magical:
          'var(--magical-shadow)',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        80: '0.8',
        100: '1',
        120: '1.2',
      },
    },
  },
}
