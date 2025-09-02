/**
 * PostCSS configuration enabling Tailwind CSS and vendor prefixing.
 *
 * TailwindCSS is responsible for utility class generation while Autoprefixer
 * adds necessary vendor prefixes for broader browser support.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
