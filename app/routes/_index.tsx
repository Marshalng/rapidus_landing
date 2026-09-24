const APP_TITLE = "Rapidus";

export function meta() {
  return [
    { title: APP_TITLE },
    {
      name: "description",
      content:
        "Exchange, invest, spend, and manage multiple currencies from one app.",
    },
  ];
}

function RapidusMark() {
  return (
    <span className="rapidus-mark" aria-hidden="true">
      <span className="rapidus-mark__wing rapidus-mark__wing--top" />
      <span className="rapidus-mark__wing rapidus-mark__wing--bottom" />
      <span className="rapidus-mark__spark" />
    </span>
  );
}

function RapidusLogo() {
  return (
    <img
      className="rapidus-logo-image"
      src="https://cdn.builder.io/api/v1/image/assets%2F53ff79212f8d4a1d97ff868a53c29353%2Fa8e0eb3980ca4aa59e46d121aa3dbf38?format=webp&width=800&height=1200"
      alt="Rapidus"
    />
  );
}

function ArrowCircle() {
  return (
    <span className="arrow-circle" aria-hidden="true">
      →
    </span>
  );
}

function LaptopPreview() {
  return (
    <div className="laptop-wrap" aria-hidden="true">
      <img
        className="hero-device-image hero-laptop-image"
        src="https://cdn.builder.io/api/v1/image/assets%2F53ff79212f8d4a1d97ff868a53c29353%2Fa313f3d228d84a28b7c08b69ff384a34?format=webp&width=800&height=1200"
        alt=""
      />
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="phone-wrap" aria-hidden="true">
      <img
        className="hero-device-image hero-phone-image"
        src="https://cdn.builder.io/api/v1/image/assets%2F53ff79212f8d4a1d97ff868a53c29353%2F1193139fbfdb47509320c8e38f986d50?format=webp&width=800&height=1200"
        alt=""
      />
    </div>
  );
}
function PhonePreviewMobile() {
  return (
    <div className="phone-wrap phone-wrap--mobile" aria-hidden="true">
      <img
        className="hero-device-image hero-phone-image"
        src="iPhone.png?format=webp&width=800&height=1200"
        alt=""
      />
    </div>
  );
}

function VirtualCard() {
  return (
    <div className="virtual-card virtual-card--desktop" aria-hidden="true">
      <div className="card-head">
        <span>
          <RapidusMark /> Rapidus
        </span>
        <em>• Active</em>
      </div>
      <strong>$124.00</strong>
      <span className="card-number">**** **** **** 7239</span>
      <span className="card-label">VIRTUAL CARD</span>
      <span className="chip">▦</span>
      <span className="mastercard">
        <i />
        <i />
      </span>
    </div>
  );
}

const featureCards = [
  {
    icon: "▣",
    title: "Multi currency wallets",
    description:
      "Hold, send and receive multiple currencies from one secure place without opening separate bank accounts.",
    visual: "wallets",
  },
  {
    icon: "⇄",
    title: "Real-Time Currency Exchange",
    description:
      "Convert money instantly at live market rates with full visibility before you confirm any trade.",
    visual: "exchange",
  },
  {
    icon: "♜",
    title: "Secure transfers",
    description:
      "Send money locally and internationally with fast settlement, strong encryption, and real time tracking.",
    visual: "transfers",
  },
  {
    icon: "▤",
    title: "Virtual Cards",
    description:
      "Create and manage virtual cards for online payments with spending limits and instant freeze controls.",
    visual: "cards",
  },
  {
    icon: "↗",
    title: "Investment Tools",
    description:
      "Buy stocks, mutual funds, and treasury bills directly from the app using your preferred currency.",
    visual: "investments",
  },
  {
    icon: "↝",
    title: "Smart Routing",
    description:
      "Set a primary wallet for your card and automatic backup wallets so payments go through even when one balance runs low.",
    visual: "routing",
  },
] as const;

function FeatureVisual({
  type,
}: {
  type: (typeof featureCards)[number]["visual"];
}) {
  if (type === "wallets") {
    return (
      <div className="feature-visual wallet-visual">
        {[
          ["🇺🇸", "USD", "United States Dollar", "42,320 USD"],
          ["🇪🇺", "EUR", "Euro", "2,200 EUR"],
          ["🇬🇧", "GBP", "Pound Sterling", "4,130 GBP"],
          ["🇳🇬", "NGN", "Naira", "208,150 NGN"],
        ].map(([flag, code, name, amount]) => (
          <div className="wallet-row" key={code}>
            <span className="wallet-currency">
              <b>{flag}</b>
              <span>
                <strong>{code}</strong>
                <small>{name}</small>
              </span>
            </span>
            <strong>{amount}</strong>
          </div>
        ))}
      </div>
    );
  }

  if (type === "exchange") {
    return (
      <div className="feature-visual exchange-visual">
        <div className="exchange-tabs">
          <b>Direct Exchange</b>
          <b>P2P Exchange</b>
        </div>
        <div className="exchange-panel">
          <div>
            <small>You send</small>
            <strong>0.00</strong>
            <span>🇪🇺 EUR⌄</span>
          </div>
          <i>⇅</i>
          <div>
            <small>You receive</small>
            <strong>0.00</strong>
            <span>🇺🇸 USD⌄</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "transfers") {
    return (
      <div className="feature-visual transfer-visual">
        <div className="transfer-card">
          <small>Bank Transfer</small>
          <div>
            <span>🇺🇸</span>
            <b>→</b>
            <span>🇳🇬</span>
          </div>
          <small>Amount</small>
          <strong>$3,200.00</strong>
        </div>
        <div className="route route-one" />
        <div className="route route-two" />
        <span className="map-pin pin-canada">🇨🇦</span>
        <span className="map-pin pin-china">🇨🇳</span>
        <span className="map-pin pin-bangladesh">🇧🇩</span>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="feature-visual cards-visual">
        <div className="feature-card-stack feature-card-stack--back" />
        <div className="feature-card-stack feature-card-stack--mid" />
        <div className="feature-card-stack feature-card-stack--front">
          <span>
            <RapidusMark /> Rapidus
          </span>
          <em>• Active</em>
          <b>VIRTUAL CARD</b>
          <i>▦</i>
          <strong>
            <u />
            <u />
          </strong>
        </div>
      </div>
    );
  }

  if (type === "investments") {
    return (
      <div className="feature-visual investment-visual">
        <div className="candles">
          {[
            "up",
            "down",
            "up",
            "up",
            "down",
            "down",
            "up",
            "up",
            "down",
            "up",
            "up",
          ].map((tone, index) => (
            <i className={tone} key={index} />
          ))}
        </div>
        <div className="investment-list">
          <span>
            ◉ AAPL <b>↗ 2.15%</b>
          </span>
          <span>
            ◉ MTN <b className="down">↘ 0.51%</b>
          </span>
          <span>
            ◉ ACCS <b>↗ 1.24%</b>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-visual routing-visual">
      <h4>Linked Wallets</h4>
      {["🇺🇸 USD", "🇬🇧 GBP", "🇪🇺 EUR", "🇳🇬 NGN", "🇬🇭 GHS"].map(
        (wallet, index) => (
          <div className="routing-row" key={wallet}>
            <span>☷</span>
            <b>
              {wallet}
              <small>{index === 0 ? "US Account" : "Account"}</small>
            </b>
            {index === 0 && <em>• Primary</em>}
          </div>
        ),
      )}
    </div>
  );
}

const howItWorksSteps = [
  [
    "Create Your Account",
    "Set up your profile in minutes with a simple sign up process and instant account access.",
  ],
  [
    "Verify your identity",
    "Complete quick identity checks to secure your account and unlock higher limits.",
  ],
  [
    "Create your wallets",
    "Open multi currency wallets to hold, manage, and organize your money in one place.",
  ],
  [
    "Trade or convert",
    "Exchange currencies directly or set your own rates through peer to peer trading.",
  ],
  [
    "Spend or withdraw",
    "Pay online with your card or move funds to your bank whenever you need.",
  ],
] as const;

function HowItWorksPhone() {
  return (
    <div className="how-phone" aria-hidden="true">
      <div className="how-phone-notch" />
      <div className="how-phone-screen">
        <div className="how-phone-header">
          <span>
            👨🏾‍💼 <b>Hi, James 👋</b>
            <small>@james001</small>
          </span>
          <i>♧　♧</i>
        </div>
        <div className="how-balance">
          <small>Total Balance</small>
          <strong>$47,412.65</strong>
          <span>🇺🇸 USD⌄</span>
          <div className="how-actions">
            <b>
              ＋<small>Fund</small>
            </b>
            <b>
              ↗<small>Send</small>
            </b>
            <b>
              ⇄<small>Exchange</small>
            </b>
            <b>
              ◌<small>Convert</small>
            </b>
          </div>
        </div>
        <div className="how-wallet">
          <span>▣ 01******26</span>
        </div>
        <div className="how-phone-title">
          <b>Investment Portfolio</b>
          <a>View all</a>
        </div>
        <div className="how-investments">
          <div>
            <b>🟡 MTNN</b>
            <strong>$1,565.42</strong>
            <small>↗ 0.2%</small>
          </div>
          <div>
            <b>🔴 GTCO</b>
            <strong>$1,565.42</strong>
            <small>↗ 0.2%</small>
          </div>
        </div>
        <div className="how-phone-title">
          <b>Recent Activity</b>
          <a>View all</a>
        </div>
        <div className="how-activity">
          <span>⌂</span>
          <b>
            Deposit <small>Completed</small>
          </b>
          <strong>$1,048.65</strong>
        </div>
        <div className="how-phone-nav">
          <b>
            ⌂<small>Home</small>
          </b>
          <b>
            ⇄<small>Exchange</small>
          </b>
          <b>
            ▣<small>Cards</small>
          </b>
          <b>
            ▤<small>Wallet</small>
          </b>
          <b>
            ↗<small>Invest</small>
          </b>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="how-section"
      aria-labelledby="how-title"
    >
      <div className="how-heading">
        <span className="how-kicker">How It Works</span>
        <h2 id="how-title">
          Simple Steps.
          <br />
          Full Control.
        </h2>
        <p>
          Start in minutes and manage your money with a clear, easy process
          <br className="desktop-break" /> from sign up to daily spending.
        </p>
      </div>
      <div className="how-content">
        <HowItWorksPhone />
        <div className="how-timeline">
          <div className="how-line" />
          {howItWorksSteps.map(([title, description], index) => (
            <article
              className={`how-step ${index === 0 ? "is-active" : ""}`}
              key={title}
            >
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <a className="button how-button" href="#get-started">
        Get Started Free <span className="currency-arrow">→</span>
      </a>
    </section>
  );
}

function DownloadSection() {
  return (
    <section
      id="get-started"
      className="download-section"
      aria-labelledby="download-title"
    >
      <div className="download-grid" aria-hidden="true" />
      <div className="download-glow download-glow--one" aria-hidden="true" />
      <div className="download-glow download-glow--two" aria-hidden="true" />
      <div className="download-copy">
        <h2 id="download-title">
          Start managing
          <br />
          your money today
        </h2>
        <p>
          Download the app and take full control of your spending, saving, and
          investing in minutes.
        </p>
        <div className="store-buttons">
          <a
            className="store-button"
            href="#app-store"
            aria-label="Download on the App Store"
          >
            <span className="store-icon store-icon--apple">●</span>
            <span>
              <small>Download on the</small>
              <b>App Store</b>
            </span>
          </a>
          <a
            className="store-button"
            href="#google-play"
            aria-label="Get it on Google Play"
          >
            <span className="store-icon store-icon--play">▶</span>
            <span>
              <small>GET IT ON</small>
              <b>Google Play</b>
            </span>
          </a>
        </div>
        <div className="download-qr">
          <span>Or scan the QR code below</span>
          <div className="qr-code" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="download-phone-wrap">
        <HowItWorksPhone />
      </div>
      <div className="download-fade" aria-hidden="true" />
    </section>
  );
}

function RapidusFooter() {
  const footerLinks = [
    ["Home", "#home"],
    ["Features", "#features"],
    ["Benefits", "#benefits"],
    ["FAQs", "#faq"],
  ];
  const socialLinks = [
    ["Instagram", "◎"],
    ["LinkedIn", "in"],
    ["X", "𝕏"],
    ["Facebook", "f"],
    ["YouTube", "▶"],
  ];

  return (
    <footer className="rapidus-footer">
      <div className="footer-container">
        <div className="footer-content">
          <a className="footer-logo" href="#home" aria-label="Rapidus home">
            <RapidusLogo />
          </a>
          <nav className="footer-links" aria-label="Footer navigation">
            {footerLinks.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <div className="footer-socials" aria-label="Social links">
            {socialLinks.map(([label, icon]) => (
              <a
                href={`#${label.toLowerCase()}`}
                aria-label={label}
                key={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-divider" />
          <div className="footer-bottom-content">
            <span>© 2026 Rapidus. All rights reserved.</span>
            <div>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FeatureSection() {
  return (
    <section
      id="benefits"
      className="feature-section"
      aria-labelledby="feature-section-title"
    >
      <div className="feature-intro">
        <span className="feature-kicker">Unique Features</span>
        <h2 id="feature-section-title">
          A smarter way to <span>manage your money</span>
        </h2>
        <p>
          Take full control of your finances from one platform built for speed,
          flexibility, and transparency. Set your own exchange rates, move money
          across borders, and grow your wealth without hidden costs or
          limitations.
        </p>
      </div>
      <div className="feature-grid">
        {featureCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <div className="feature-card-copy">
              <span className="feature-icon" aria-hidden="true">
                {card.icon}
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <FeatureVisual type={card.visual} />
          </article>
        ))}
      </div>
    </section>
  );
}

export default function HomeRoute() {
  return (
    <>
      <div className="rapidus-page">
        <div className="hero-grid" aria-hidden="true" />
        <header className="rapidus-nav">
          <a className="rapidus-logo" href="/" aria-label="Rapidus home">
            <RapidusLogo />
          </a>
          <nav className="rapidus-links" aria-label="Primary navigation">
            <a className="active" href="#home">
              Home
            </a>
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="rapidus-nav-actions">
            {/* <a className="signin" href="#signin">
              Sign in <span>♙</span>
            </a> */}
            <a className="button button-light" href="#get-started">
              Get Started <ArrowCircle />
            </a>
          </div>
        </header>

        <main id="home" className="hero-content">
          {/* <div className="trust-pill">
            <span className="trust-avatars">
              <i>J</i>
              <i>A</i>
              <i>K</i>
            </span>
            <span>Trusted by 1M+ Users</span>
          </div> */}
          <h1>
            Control your money.
            <br />
            Trade at your rate.
          </h1>
          <p>
            Exchange, invest, spend, and manage multiple
            <br className="desktop-break" /> currencies from one app.
          </p>
          <div className="hero-actions">
            <a className="button button-outline" href="#features">
              See how it works
            </a>
            <a className="button button-light" href="#get-started">
              Get Started <ArrowCircle />
            </a>
          </div>
          <div className="product-stage">
            <LaptopPreview />
            <PhonePreview />
            <PhonePreviewMobile />
            <VirtualCard />
          </div>
        </main>
      </div>

      <section
        id="features"
        className="currency-section"
        aria-labelledby="currency-section-title"
      >
        <div className="currency-pill currency-pill--us" aria-hidden="true">
          <span>🇺🇸</span>
        </div>
        <div className="currency-pill currency-pill--italy" aria-hidden="true">
          <span>🇮🇹</span>
        </div>
        <div className="currency-pill currency-pill--eu" aria-hidden="true">
          <span>🇪🇺</span>
        </div>
        <div className="currency-pill currency-pill--uk" aria-hidden="true">
          <span>🇬🇧</span>
        </div>
        <div className="currency-copy">
          <h2 id="currency-section-title">
            Your all in one solution for
            <br className="desktop-break" /> managing money and
            <br className="desktop-break" /> reaching your financial
            <br className="desktop-break" /> goals.
          </h2>
          <p>
            Hold multiple currencies, exchange at your preferred rates, send and
            receive funds fast, spend securely, and invest with clear, simple
            control.
          </p>
          <a className="button currency-button" href="#get-started">
            Get Started Free <span className="currency-arrow">→</span>
          </a>
        </div>
      </section>
      <FeatureSection />
      <HowItWorksSection />
      <DownloadSection />
      <RapidusFooter />
    </>
  );
}
