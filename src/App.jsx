import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

const customHeroImage = "";

const products = [
  {
    name: "Spanish Latte",
    description: "Silky milk, double espresso, caramel finish.",
    price: "$3.40",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80",
    tag: "Best Seller",
  },
  {
    name: "CEO Latte",
    description: "Strong, smooth body with a nutty aroma.",
    price: "$3.60",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
    tag: "Signature",
  },
  {
    name: "Matcha Latte",
    description: "Creamy matcha with balanced sweetness.",
    price: "$3.80",
    image:
      "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=700&q=80",
    tag: "Trending",
  },
  {
    name: "Yuzu Cold Brew",
    description: "Citrus-forward cold brew for hot afternoons.",
    price: "$4.10",
    image:
      "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?auto=format&fit=crop&w=700&q=80",
    tag: "New",
  },
];

const benefits = [
  "Order-ahead and skip queue",
  "Member-only pricing and rewards",
  "Nationwide delivery coverage",
];

const testimonials = [
  {
    quote:
      "Great consistency and quality. The app makes reordering super fast during office hours.",
    author: "Aina, KL",
  },
  {
    quote:
      "The Spanish Latte and pastries are my weekly go-to. Delivery is surprisingly quick.",
    author: "Jason, PJ",
  },
  {
    quote:
      "Clean UI, nice rewards program, and drinks that taste premium without premium pricing.",
    author: "Nadia, Johor",
  },
];

const initialConversations = [
  {
    id: "guest-1",
    customerName: "Guest visitor",
    status: "open",
    messages: [
      {
        role: "assistant",
        text: "Hi! 👋 I can help with menu picks, promotions, and app rewards.",
      },
    ],
  },
];

const initialSettings = {
  assistantName: "ZUS Assistant",
  welcomeMessage:
    "Thanks! Our support team usually replies in a few minutes. For now, check the Promotions and FAQ sections below.",
  autoReplyEnabled: true,
};

const toUIConversation = (record) => ({
  id: record.id,
  customerName: record.customer_name,
  status: record.status,
  messages: Array.isArray(record.messages) ? record.messages : [],
});

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-body">
        <span className="badge">{product.tag}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="price">{product.price}</span>
      </div>
    </article>
  );
}

function ChatDialog({ conversation, onUserMessage, settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const quickReplies = [
    "What's today's promo?",
    "Best coffee for beginners?",
    "How do rewards work?",
  ];

  const sendMessage = (text) => {
    if (!text.trim()) {
      return;
    }

    onUserMessage(conversation.id, text.trim());
    setDraft("");
  };

  return (
    <div className="chat-widget" aria-live="polite">
      {isOpen && (
        <section
          id="chat-panel"
          className="chat-panel"
          aria-label="Coffee assistant chat dialog"
        >
          <header>
            <h3>{settings.assistantName}</h3>
            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chat-messages">
            {conversation.messages.map((message, index) => (
              <p key={`${message.role}-${index}`} className={`msg ${message.role}`}>
                {message.text}
              </p>
            ))}
          </div>

          <div className="chat-quick-replies">
            {quickReplies.map((reply) => (
              <button key={reply} type="button" onClick={() => sendMessage(reply)}>
                {reply}
              </button>
            ))}
          </div>

          <form
            className="chat-compose"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(draft);
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
            />
            <button type="submit">Send</button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
      >
        {isOpen ? "Close chat" : "Chat with us"}
      </button>
    </div>
  );
}

function AdminDashboard({
  conversation,
  onAdminReply,
  onStatusChange,
  settings,
  onSaveSettings,
  isBackendConnected,
}) {
  const [adminReply, setAdminReply] = useState("");
  const [draftSettings, setDraftSettings] = useState(settings);

  useEffect(() => {
    setDraftSettings(settings);
  }, [settings]);

  return (
    <section id="admin" className="container admin-dashboard">
      <div className="section-head">
        <h2>Admin Chat Dashboard</h2>
        <p>Manage conversation replies and widget settings.</p>
      </div>

      <p className={`sync-status ${isBackendConnected ? "ok" : "offline"}`}>
        {isBackendConnected
          ? "Supabase connected • data is persisted in your project"
          : "Supabase offline/misconfigured • using in-memory fallback"}
      </p>

      <div className="admin-grid">
        <article className="admin-card">
          <h3>Active Conversation</h3>
          <p>
            <strong>Customer:</strong> {conversation.customerName}
          </p>
          <label htmlFor="status-select">
            <strong>Status:</strong>
          </label>
          <select
            id="status-select"
            value={conversation.status}
            onChange={(event) => onStatusChange(conversation.id, event.target.value)}
          >
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>

          <div className="admin-messages">
            {conversation.messages.map((message, index) => (
              <p key={`admin-${index}`} className={`msg ${message.role}`}>
                {message.text}
              </p>
            ))}
          </div>

          <form
            className="admin-reply-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!adminReply.trim()) {
                return;
              }
              onAdminReply(conversation.id, adminReply.trim());
              setAdminReply("");
            }}
          >
            <input
              type="text"
              value={adminReply}
              onChange={(event) => setAdminReply(event.target.value)}
              placeholder="Reply as admin..."
              aria-label="Reply as admin"
            />
            <button type="submit" className="btn btn-dark">
              Send reply
            </button>
          </form>
        </article>

        <article className="admin-card">
          <h3>Chat Settings</h3>

          <label htmlFor="assistant-name">Assistant Name</label>
          <input
            id="assistant-name"
            type="text"
            value={draftSettings.assistantName}
            onChange={(event) =>
              setDraftSettings((prev) => ({
                ...prev,
                assistantName: event.target.value,
              }))
            }
          />

          <label htmlFor="welcome-message">Welcome Message</label>
          <textarea
            id="welcome-message"
            rows="3"
            value={draftSettings.welcomeMessage}
            onChange={(event) =>
              setDraftSettings((prev) => ({
                ...prev,
                welcomeMessage: event.target.value,
              }))
            }
          />

          <label className="admin-toggle" htmlFor="auto-reply">
            <input
              id="auto-reply"
              type="checkbox"
              checked={draftSettings.autoReplyEnabled}
              onChange={(event) =>
                setDraftSettings((prev) => ({
                  ...prev,
                  autoReplyEnabled: event.target.checked,
                }))
              }
            />
            Enable automatic assistant response
          </label>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() => onSaveSettings(draftSettings)}
          >
            Save settings
          </button>
        </article>
      </div>
    </section>
  );
}

function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [chatSettings, setChatSettings] = useState(initialSettings);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const currentConversation = conversations[0];

  useEffect(() => {
    let cancelled = false;

    const loadFromSupabase = async () => {
      try {
        const { data: conversationData, error: conversationError } = await supabase
          .from("conversations")
          .select("id, customer_name, status, messages")
          .order("id", { ascending: true });

        if (conversationError) {
          throw conversationError;
        }

        if (!cancelled && Array.isArray(conversationData) && conversationData.length > 0) {
          setConversations(conversationData.map(toUIConversation));
        }

        const { data: settingsData, error: settingsError } = await supabase
          .from("chat_settings")
          .select("assistant_name, welcome_message, auto_reply_enabled")
          .eq("id", 1)
          .single();

        if (settingsError && settingsError.code !== "PGRST116") {
          throw settingsError;
        }

        if (!cancelled && settingsData) {
          setChatSettings({
            assistantName: settingsData.assistant_name || initialSettings.assistantName,
            welcomeMessage: settingsData.welcome_message || initialSettings.welcomeMessage,
            autoReplyEnabled:
              settingsData.auto_reply_enabled ?? initialSettings.autoReplyEnabled,
          });
        }

        if (!cancelled) {
          setIsBackendConnected(true);
        }
      } catch {
        if (!cancelled) {
          setIsBackendConnected(false);
        }
      }
    };

    loadFromSupabase();

    return () => {
      cancelled = true;
    };
  }, []);

  const persistConversationMessages = async (conversationId, messages) => {
    const { error } = await supabase
      .from("conversations")
      .update({ messages })
      .eq("id", conversationId);

    if (error) {
      throw error;
    }
  };

  const addMessage = async (conversationId, message) => {
    let nextMessages = [];

    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        nextMessages = [...conversation.messages, message];
        return {
          ...conversation,
          messages: nextMessages,
        };
      }),
    );

    try {
      await persistConversationMessages(conversationId, nextMessages);
      setIsBackendConnected(true);
    } catch {
      setIsBackendConnected(false);
    }
  };

  const handleUserMessage = async (conversationId, text) => {
    await addMessage(conversationId, { role: "user", text });

    if (chatSettings.autoReplyEnabled) {
      await addMessage(conversationId, {
        role: "assistant",
        text: chatSettings.welcomeMessage,
      });
    }
  };

  const handleAdminReply = async (conversationId, text) => {
    await addMessage(conversationId, { role: "assistant", text });
  };

  const handleStatusChange = async (conversationId, status) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, status } : conversation,
      ),
    );

    try {
      const { error } = await supabase
        .from("conversations")
        .update({ status })
        .eq("id", conversationId);

      if (error) {
        throw error;
      }

      setIsBackendConnected(true);
    } catch {
      setIsBackendConnected(false);
    }
  };

  const handleSettingsSave = async (nextSettings) => {
    setChatSettings(nextSettings);

    try {
      const { error } = await supabase.from("chat_settings").upsert({
        id: 1,
        assistant_name: nextSettings.assistantName,
        welcome_message: nextSettings.welcomeMessage,
        auto_reply_enabled: nextSettings.autoReplyEnabled,
      });

      if (error) {
        throw error;
      }

      setIsBackendConnected(true);
    } catch {
      setIsBackendConnected(false);
    }
  };

  const heroImage =
    customHeroImage ||
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80";

  return (
    <>
      <header className="site-header" aria-label="Top Navigation">
        <div className="container nav-wrap">
          <a className="logo" href="#top" aria-label="ZUS Coffee home">
            ZUS COFFEE
          </a>
          <nav>
            <a href="#menu">Menu</a>
            <a href="#promo">Promotions</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
            <a href="#admin">Admin</a>
          </nav>
          <a className="btn btn-dark" href="#menu">
            Order now
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">A Necessity, Not a Luxury</p>
              <h1>Specialty Coffee Crafted for Daily Life.</h1>
              <p className="sub">
                Premium drinks, smart pricing, and seamless ordering in one modern
                coffee experience inspired by ZUS Coffee.
              </p>
              <ul className="benefit-list">
                {benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <div className="hero-cta">
                <a className="btn btn-light" href="#app">Download App</a>
                <a className="btn btn-outline" href="#menu">View Menu</a>
              </div>
            </div>

            <div className="hero-card">
              <img src={heroImage} alt="Signature iced coffee" />
              <div className="floating-pill">From $2.90 • Freshly Brewed</div>
            </div>
          </div>
        </section>

        <section className="stats container" aria-label="Key metrics">
          <article>
            <h2>400+</h2>
            <p>Stores across Southeast Asia</p>
          </article>
          <article>
            <h2>1M+</h2>
            <p>Monthly app users</p>
          </article>
          <article>
            <h2>4.8★</h2>
            <p>Average app rating</p>
          </article>
        </section>

        <section id="promo" className="promo">
          <div className="container">
            <div className="section-head">
              <h2>Weekly Promotions</h2>
              <p>Fresh campaigns that keep your coffee routine exciting.</p>
            </div>
            <div className="cards">
              <article className="card">
                <h3>Buy 1 Free 1 Tuesday</h3>
                <p>Selected handcrafted drinks every Tuesday, all day long.</p>
              </article>
              <article className="card">
                <h3>Breakfast Combo</h3>
                <p>Any coffee + pastry bundle from 7am to 11am.</p>
              </article>
              <article className="card">
                <h3>Delivery Perks</h3>
                <p>Free delivery above $12 with in-app payment.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="menu" className="menu container">
          <div className="menu-header">
            <h2>Best Sellers</h2>
            <p>
              Edit products in <code>src/App.jsx</code> → <code>products</code> array.
            </p>
          </div>

          <div className="menu-grid">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>

        <section id="reviews" className="reviews container">
          <div className="section-head">
            <h2>What Customers Say</h2>
            <p>Trusted by coffee lovers for quality and convenience.</p>
          </div>
          <div className="review-grid">
            {testimonials.map((item) => (
              <blockquote key={item.author}>
                <p>“{item.quote}”</p>
                <cite>{item.author}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="app" className="app-band">
          <div className="container app-wrap">
            <div>
              <h2>Get Rewarded with Every Cup</h2>
              <p>
                Earn points, unlock member pricing, and get personalized offers with
                every order.
              </p>
            </div>
            <a className="btn btn-dark" href="#">Get the App</a>
          </div>
        </section>

        <section id="faq" className="container faq">
          <h2>Quick Customization Guide</h2>
          <details open>
            <summary>How do I set my own hero image?</summary>
            <p>
              Place your file in <code>assets/</code>, then set
              <code> customHeroImage </code> in <code>src/App.jsx</code>.
            </p>
          </details>
          <details>
            <summary>How do I add products?</summary>
            <p>
              Add objects in the <code>products</code> array with
              <code> name</code>, <code>description</code>, <code>price</code>, and
              <code> image</code>.
            </p>
          </details>
        </section>

        <AdminDashboard
          conversation={currentConversation}
          onAdminReply={handleAdminReply}
          onStatusChange={handleStatusChange}
          settings={chatSettings}
          onSaveSettings={handleSettingsSave}
          isBackendConnected={isBackendConnected}
        />
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© 2026 ZUS-style concept page. Built for educational cloning practice.</p>
          <div>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>

      <ChatDialog
        conversation={currentConversation}
        onUserMessage={handleUserMessage}
        settings={chatSettings}
      />
    </>
  );
}

export default App;
