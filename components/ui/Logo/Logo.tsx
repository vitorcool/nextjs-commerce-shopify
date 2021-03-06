const Logo = ({ className = '', ...props }) => (
/*   <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="100%" height="100%" rx="16" fill="var(--secondary)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="var(--primary)"
    />
  </svg>

 */
<svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="url(#pattern0)"/>
  <defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use href="#image0" transform="translate(0.022153) scale(0.00513814 0.00892857)"/>
  </pattern>
  <image id="image0" data-name="TEO_Group_RGB_preto2.png" width="186" height="112" href="data:image/png;base64,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"/>
  </defs>
</svg>

)

export default Logo
