export default function River() {
  return (
    <svg
      viewBox="0 0 800 200"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      {/* 河道遮罩 */}
      <defs>
        <mask id="riverMask">
          <path
            d="
              M 0 120
              C 150 90, 300 150, 450 120
              S 650 90, 800 120
              L 800 200
              L 0 200
              Z
            "
            fill="white"
          />
        </mask>

        {/* 水流漸層 */}
        <linearGradient id="waterGradient" x1="0%" y1="0%" x2="200%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>
      </defs>

      {/* 水面 */}
      <rect
        x="0"
        y="0"
        width="1600"
        height="200"
        fill="url(#waterGradient)"
        mask="url(#riverMask)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="-800 0"
          dur="6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
