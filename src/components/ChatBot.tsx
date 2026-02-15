import { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaTimes, FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { data } from '../data';

interface Message {
  text: string;
  isBot: boolean;
  links?: Array<{ label: string; url: string }>;
}

const quickReplies = [
  '📧 Email',
  '📞 Phone',
  '📍 Location',
  '🔗 GitHub',
  '💼 LinkedIn',
  '📄 Resume',
  '👋 About Soham',
  '🛠️ Tech Stack',
];

function getBotResponse(input: string): Message {
  const lower = input.toLowerCase();

  if (lower.includes('email') || lower.includes('mail') || lower.includes('📧')) {
    return {
      text: `📧 You can reach me at:`,
      isBot: true,
      links: [{ label: data.personal.email, url: `mailto:${data.personal.email}` }],
    };
  }
  if (lower.includes('phone') || lower.includes('call') || lower.includes('📞') || lower.includes('number')) {
    return {
      text: `📞 My phone number is: ${data.personal.phone}\nFeel free to call or WhatsApp!`,
      isBot: true,
      links: [{ label: `Call ${data.personal.phone}`, url: `tel:${data.personal.phone.replace(/\s/g, '')}` }],
    };
  }
  if (lower.includes('location') || lower.includes('where') || lower.includes('📍') || lower.includes('city')) {
    return { text: `📍 I'm based in ${data.personal.location}, India. Currently open to remote and on-site opportunities!`, isBot: true };
  }
  if (lower.includes('github') || lower.includes('🔗') || lower.includes('code') || lower.includes('repo')) {
    return {
      text: `💻 Check out my GitHub for all my projects and code:`,
      isBot: true,
      links: [{ label: 'GitHub Profile', url: data.personal.github }],
    };
  }
  if (lower.includes('linkedin') || lower.includes('💼') || lower.includes('connect')) {
    return {
      text: `💼 Let's connect on LinkedIn! I'm always open to networking:`,
      isBot: true,
      links: [{ label: 'LinkedIn Profile', url: data.personal.linkedin }],
    };
  }
  if (lower.includes('resume') || lower.includes('cv') || lower.includes('📄')) {
    return {
      text: `📄 Here's my latest resume. Feel free to download!`,
      isBot: true,
      links: [{ label: 'Download Resume', url: data.personal.resume }],
    };
  }
  if (lower.includes('about') || lower.includes('👋') || lower.includes('who') || lower.includes('yourself')) {
    return {
      text: `👋 Hi! I'm ${data.personal.name}, a ${data.personal.tagline}.\n\n🎓 ${data.personal.degree}\n📍 ${data.personal.location}\n🚀 Currently interning at SitaraHub as a Backend Developer\n\nI love building AI/ML solutions and full-stack applications!`,
      isBot: true,
    };
  }
  if (lower.includes('tech') || lower.includes('stack') || lower.includes('🛠') || lower.includes('skills')) {
    const languages = data.skills.languages.map(s => s.name).join(', ');
    const frameworks = data.skills.frameworks.map(s => s.name).join(', ');
    return {
      text: `🛠️ My Tech Stack:\n\n💻 Languages: ${languages}\n🔧 Frameworks: ${frameworks}\n🤖 AI/ML: Scikit-learn, TensorFlow, Pandas\n🛠 Tools: Git, Docker, AWS, MongoDB`,
      isBot: true,
    };
  }
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('sup')) {
    return {
      text: `Hey there! 👋 Welcome to my portfolio! I'm Soham's AI assistant. How can I help you today?\n\nYou can ask me about:\n• Contact details (email, phone)\n• Social profiles (GitHub, LinkedIn)\n• My tech stack & skills\n• Or just say hi! 😊`,
      isBot: true,
    };
  }
  if (lower.includes('project') || lower.includes('work')) {
    return {
      text: `🚀 I've built ${data.facts.projects} projects! Here are some highlights:\n\n🔬 Covert Database Detection - AI/ML with 90% accuracy\n📚 Library Management System - Full Stack with Django\n🤖 CDP Chatbot - NLP-powered support bot\n📊 Data Analytics Dashboard - React + Chart.js\n\nScroll to the Projects section or check my GitHub!`,
      isBot: true,
      links: [{ label: 'View GitHub', url: data.personal.github }],
    };
  }
  if (lower.includes('hire') || lower.includes('freelance') || lower.includes('available') || lower.includes('job')) {
    return {
      text: `✅ Yes! I'm currently available for:\n\n• Full-time positions\n• Internships\n• Freelance projects\n\nBest way to reach me: ${data.personal.email}\n\nLet's build something awesome together! 🚀`,
      isBot: true,
      links: [{ label: `Email Me`, url: `mailto:${data.personal.email}` }],
    };
  }

  return {
    text: `I'm not sure about that, but I can help you with:\n\n📧 Email & contact info\n📞 Phone number\n🔗 GitHub & LinkedIn\n📄 Resume download\n👋 About Soham\n🛠️ Tech stack\n\nJust click one of the quick buttons below or ask me anything!`,
    isBot: true,
  };
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: `Hey! 👋 I'm Soham's AI assistant. Ask me anything about his contact info, skills, or projects!\n\nTry clicking one of the options below ⬇️`,
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { text: text.trim(), isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
        {!isOpen && <span className="chat-badge">💬</span>}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <img
                src={data.personal.image}
                alt="Soham"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=S+S&size=80&background=020617&color=00d4ff&bold=true`;
                }}
              />
              <span className="online-dot" />
            </div>
            <div className="chatbot-header-info">
              <h4>Soham's Assistant</h4>
              <span>Online • Ask me anything</span>
            </div>
            <div className="chatbot-header-links">
              <a href={`mailto:${data.personal.email}`} title="Email"><FaEnvelope /></a>
              <a href={`tel:${data.personal.phone.replace(/\s/g, '')}`} title="Call"><FaPhone /></a>
              <a href={data.personal.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
              <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>

          <div className="chatbot-location-bar">
            <FaMapMarkerAlt /> {data.personal.location}, India
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
                <div className="chat-bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                  {msg.links && (
                    <div className="chat-links">
                      {msg.links.map((link, k) => (
                        <a key={k} href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message bot">
                <div className="chat-bubble typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-replies">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                className="quick-reply-btn"
                onClick={() => sendMessage(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              autoComplete="off"
            />
            <button type="submit" disabled={!input.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
