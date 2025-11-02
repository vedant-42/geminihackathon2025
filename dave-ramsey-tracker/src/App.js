import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Footer from "./components/Footer";

const BABY_STEPS = [
  {
    id: 1,
    title: "Save $1,000 for your starter emergency fund",
    description:
      "Build a small emergency fund to cover minor emergencies and break the cycle of debt.",
    target: 1000,
    type: "savings",
  },
  {
    id: 2,
    title: "Pay off all debt (except the house) using the debt snowball",
    description:
      "List debts smallest to largest, pay minimums on all, attack the smallest with intensity.",
    target: null,
    type: "debt",
  },
  {
    id: 3,
    title: "Save 3–6 months of expenses in a fully funded emergency fund",
    description:
      "Build a full emergency fund to protect against major life events.",
    target: null,
    type: "savings",
  },
  {
    id: 4,
    title: "Invest 15% of your household income in retirement",
    description:
      "Start investing for retirement once you have your foundation in place.",
    target: 15,
    type: "investment",
  },
  {
    id: 5,
    title: "Save for your children's college fund",
    description:
      "Help your children avoid student loans by saving for their education.",
    target: null,
    type: "savings",
  },
  {
    id: 6,
    title: "Pay off your home early",
    description:
      "Become completely debt-free by paying off your mortgage early.",
    target: null,
    type: "debt",
  },
  {
    id: 7,
    title: "Build wealth and give",
    description: "Live like no one else so you can give like no one else.",
    target: null,
    type: "wealth",
  },
];

function App() {
  const [scrollLocked, setScrollLocked] = useState(true);
  const scrollPositionRef = useRef(0);

  const scrollToChat = () => {
    // Unlock scroll when user clicks the CTA button
    if (scrollLocked) {
      setScrollLocked(false);
      document.body.style.overflow = "";
    }

    const chatSection = document.querySelector(".chat-section");
    const navbar = document.querySelector(".navbar");
    if (chatSection && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const chatSectionTop =
        chatSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = chatSectionTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToWhy = () => {
    // Unlock scroll when user clicks the CTA button
    if (scrollLocked) {
      setScrollLocked(false);
      document.body.style.overflow = "";
    }

    const whySection = document.querySelector("#why-use");
    const navbar = document.querySelector(".navbar");
    if (whySection && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const whySectionTop =
        whySection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = whySectionTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (whySection) {
      whySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    // Unlock scroll when user clicks the navbar brand
    if (scrollLocked) {
      setScrollLocked(false);
      document.body.style.overflow = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBabySteps = () => {
    // Unlock scroll when user clicks the button
    if (scrollLocked) {
      setScrollLocked(false);
      document.body.style.overflow = "";
    }

    const stepsSection = document.querySelector(".steps-showcase");
    const navbar = document.querySelector(".navbar");
    if (stepsSection && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const stepsSectionTop =
        stepsSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = stepsSectionTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else if (stepsSection) {
      stepsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Lock scroll on mount and prevent browser scroll restoration
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    // Prevent browser from restoring scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Cleanup: restore scroll when component unmounts
      document.body.style.overflow = "";
    };
  }, []);

  // Monitor scroll position and reset if locked
  useEffect(() => {
    if (!scrollLocked) return;

    const handleScroll = () => {
      if (scrollLocked) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollLocked]);

  // Unlock scroll on user interaction
  useEffect(() => {
    if (!scrollLocked) return;

    const unlockScroll = () => {
      setScrollLocked(false);
      document.body.style.overflow = "";
    };

    // Detect user interaction events
    const events = [
      "scroll",
      "wheel",
      "touchmove",
      "keydown",
      "mousedown",
      "click",
      "touchstart",
    ];

    const handleInteraction = (e) => {
      // Allow programmatic scrolls (like CTA button)
      if (e.type === "click" && e.target.closest(".cta-button")) {
        unlockScroll();
        return;
      }

      // Check if this is actual user scrolling (not programmatic)
      if (e.type === "scroll") {
        const currentScroll =
          window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(currentScroll - scrollPositionRef.current) > 5) {
          unlockScroll();
        }
        scrollPositionRef.current = currentScroll;
      } else {
        unlockScroll();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleInteraction, { passive: true });
    });

    // Fallback: unlock after 5 seconds
    const timeout = setTimeout(() => {
      unlockScroll();
    }, 5000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
      clearTimeout(timeout);
    };
  }, [scrollLocked]);

  useEffect(() => {
    // Load Voiceflow script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function () {
      window.voiceflow.chat.load({
        verify: { projectID: "69079bd52c2c409d8b3b40d6" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        voice: {
          url: "https://runtime-api.voiceflow.com",
        },
        render: {
          mode: "embedded",
          target: document.getElementById("voiceflow-chat-container"),
        },
      });
    };
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <div
          className="navbar-brand"
          onClick={scrollToTop}
          style={{ cursor: "pointer" }}
        >
          Ramsey AI
        </div>
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={scrollToChat}>
            Talk to Ramsey
          </button>
          <button className="navbar-button" onClick={scrollToWhy}>
            Why use this
          </button>
          <button className="navbar-button" onClick={scrollToBabySteps}>
            Baby Steps
          </button>
        </div>
      </nav>
      <header className="hero-header">
        <div className="hero-content">
          <h1>Transform Your Financial Future</h1>
          <div className="hero-cta">
            <p className="hero-cta-text">
              In the past 20 years, average debt per household and cost of goods
              has <strong>more than doubled</strong>, while salaries have
              remained <strong>stagnant</strong>. <br></br> <br></br>
              Learn how to beat the odds today with Ramsey AI.
            </p>
            <button className="cta-button" onClick={scrollToChat}>
              Speak to Ramsey AI
            </button>
          </div>
          <div className="hero-video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/OO25TrVo_dU?si=as-wp3ntky_7MZn9"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </header>

      <section className="chat-section">
        <div
          id="voiceflow-chat-container"
          className="voiceflow-chat-container"
        ></div>
      </section>

      {/* "Why use this" section placed right under the chatbot */}
      <section id="why-use" className="why-section">
        <div className="why-container">
          <h2>Why use Ramsey AI?</h2>
          <p className="why-lead">
            Get quick, personalized guidance mapped to Dave Ramsey's Baby Steps
            — identify your current step, get next actions, and see how to
            progress.
          </p>
          <ul
            className="stats-list"
            aria-label="Key savings and debt statistics"
          >
            <li className="stat-item">
              <div className="stat-value">Savings</div>
              <div className="stat-text">
                28% of Americans have less than <strong>$1,000</strong> in
                savings, and <strong>34%</strong> have <strong>$0</strong> in
                savings <span className="stat-source">(bea.gov)</span>
              </div>
            </li>
            <li className="stat-item">
              <div className="stat-value">Budgeting</div>
              <div className="stat-text">
                While nearly <strong>80%</strong> of Americans budget regularly,
                less than <strong>25%</strong> stick to it.{" "}
                <span className="stat-source">(Ramseysolutions.com)</span>
              </div>
            </li>
            <li className="stat-item">
              <div className="stat-value">Household debt</div>
              <div className="stat-text">
                The average debt per household is <strong>$105,056</strong>, and
                the average debt per adult is <strong>$66,772</strong>{" "}
                <span className="stat-source">(newyorkfed.org)</span>
              </div>
            </li>
            <li className="stat-item">
              <div className="stat-value">Retirement</div>
              <div className="stat-text">
                Nearly half of households approaching retirement have no savings
                in an IRA or 401(k).{" "}
                <span className="stat-source">(ncoa.org)</span>
              </div>
            </li>
            <li className="stat-item">
              <div className="stat-value">College savings</div>
              <div className="stat-text">
                Only <strong>35%</strong> of families use a college savings fund
                (e.g., 529) to save an average of <strong>$6,844</strong> each.{" "}
                <span className="stat-source">(educationdata.org)</span>
              </div>
            </li>
            <li className="stat-item">
              <div className="stat-value">Mortgage debt</div>
              <div className="stat-text">
                Americans' total mortgage debt stands at approximately{" "}
                <strong>$12.94 trillion</strong>, about <strong>70%</strong> of
                U.S. household debt.{" "}
                <span className="stat-source">(fred.stlouisfed.org)</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <main className="steps-showcase">
        <div className="steps-container">
          <h2>The 7 Baby Steps to Financial Freedom</h2>
          <div className="steps-grid">
            {BABY_STEPS.map((step) => (
              <div key={step.id} className="step-card">
                <div className="step-number">{step.id}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
