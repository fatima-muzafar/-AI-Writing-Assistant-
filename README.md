# WriteAI – AI-Powered Writing Assistant

> **Generate professional content instantly.** Write blogs, emails, captions, and creative copy with a clean, minimal AI workspace powered by state-of-the-art language models.

[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=flat-square)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19.2+-61DAFB?style=flat-square)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3+-06B6D4?style=flat-square)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green? style=flat-square)](#license)

---

## 🎯 Overview

WriteAI is a modern, responsive web application that brings AI-powered writing assistance to your workflow. Whether you're drafting blog posts, composing professional emails, or creating social media content, WriteAI streamlines the creative process with:

- **Full Conversation Threads** — Keep multi-turn chats organized in one place
- **Real-Time Streaming** — Watch AI responses build word-by-word for faster feedback
- **Smart History Management** — Search and retrieve past conversations with one click
- **Workspace Customization** — Configure AI models, themes, and preferences on the fly
- **Local-First Design** — All chat data stays on your device with browser storage

---

## ✨ Features

### Core Functionality
- 🤖 **AI Chat Interface** — Clean, distraction-free workspace for writing
- 💬 **Chat Threading** — Multiple follow-up questions grouped in one continuous conversation
- 📜 **Full History** — Persistent chat history with date, title, and message count
- ⚡ **Streaming Responses** — See AI output word-by-word for better engagement
- 🔄 **Continue or Restart** — Seamlessly continue past conversations or spawn new chats from existing prompts

### Workspace Controls
- 🎨 **Light/Dark Theme** — Toggle between light and dark modes instantly
- 🤖 **Model Selection** — Choose from DeepSeek, GPT-4o-mini, or Claude 3.5 Haiku
- 📊 **Streaming Toggle** — Enable/disable word-by-word output
- 👤 **Custom Name** — Personalize your workspace
- 🗑️ **Clear Workspace** — Reset all history and settings with one click

### Use Cases
- **Blog Drafting** — Generate structured outlines and full article drafts
- **Email Writing** — Craft professional emails tailored to your audience
- **Social Media** — Create catchy hooks and engaging captions for LinkedIn, X, and Instagram
- **General Writing** — Brainstorm ideas, fix grammar, rewrite content

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.x or later
- **npm** or **yarn** package manager
- **OpenRouter API Key** (get one free at [openrouter.ai](https://openrouter.ai))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fatima-muzafar/-AI-Writing-Assistant-.git
   cd writeai
   ```

2. **Install dependencies**    
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenRouter API key:
   ```env
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📂 Project Structure

```
src/
├── pages/
│   ├── Home.jsx              # Landing page with features & pricing
│   ├── Dashboard.jsx         # Main chat interface
│   ├── History.jsx           # Conversation history viewer
│   └── Settings.jsx          # Workspace configuration
├── features/
│   └── ai-writer/
│       ├── components/
│       │   ├── Hero.jsx      # Home section hero
│       │   ├── InputBox.jsx  # Chat input field
│       │   ├── OutputBox.jsx # Message display
│       │   └── ...
│       └── services/
│           └── aiService.js  # OpenRouter API integration
├── components/
│   ├── layout/
│   │   └── Sidebar.jsx       # Navigation & recent history
│   └── ui/
│       └── ...               # Reusable UI components
├── contexts/
│   └── SettingsContext.jsx   # Global settings state
├── App.jsx                   # Main router & provider
└── main.jsx                  # Entry point

public/                        # Static assets
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---|
| **Frontend** | React 19.2, Vite 8.0, TailwindCSS 4.3 |
| **Styling** | Tailwind CSS, Custom CSS animations |
| **State Management** | React Context API, Local Storage |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **3D (Optional)** | Spline, Framer Motion |
| **API** | OpenRouter (DeepSeek, GPT-4o-mini, Claude 3.5) |
| **Build Tool** | Vite with ESLint |

---

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_OPENROUTER_API_KEY=sk_live_your_key_here
```

### Settings (In-App)

All settings are stored locally in your browser:

- **Profile Name** — How you appear in the workspace
- **Preferred Model** — Default AI model for new chats (default: DeepSeek Chat)
- **Response Streaming** — Enable/disable word-by-word output (default: enabled)
- **Theme** — Light or dark mode (default: dark)

---

## 📖 Usage Guide

### Starting a Chat

1. Click **"Launch Workspace"** or navigate to `/dashboard`
2. Type your prompt in the input box
3. Press `Enter` or click the send button
4. Watch the AI response stream in real-time (if streaming is enabled)

### Managing History

- **View History** — Click "History" in the sidebar
- **Continue Conversation** — Click "Continue Chat" on any history card
- **New Chat from Thread** — Click to start fresh with the same initial prompt
- **Delete Entry** — Hover over a card and click the trash icon

### Changing Settings

1. Click **"Settings"** in the sidebar
2. Update your preferences:
   - Display name
   - Preferred AI model
   - Streaming toggle
   - Theme (light/dark)
3. Changes apply instantly across the app

---

## 🔌 API Integration

### OpenRouter Setup

1. Sign up at [openrouter.ai](https://openrouter.ai) (free tier available)
2. Navigate to **API Keys** and create a new key
3. Copy your API key to `.env.local`:
   ```env
   VITE_OPENROUTER_API_KEY=sk_live_...
   ```

### Supported Models

- **DeepSeek Chat (V3)** — Fast, creative, general-purpose [default]
- **GPT-4o-mini** — Efficient OpenAI model
- **Claude 3.5 Haiku** — Anthropic's compact model

Switch models anytime in Settings without restarting the app.

### Streaming Behavior

When **Response Streaming** is enabled:
- Tokens arrive and display one-by-one
- Chat feels more responsive and interactive
- Perfect for long-form content generation

When disabled:
- Waits for full response before displaying
- Slightly faster for short completions

---

## 🎨 Development

### Running Locally

```bash
# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build production bundle |
| `npm run preview` | Serve built bundle locally |
| `npm run lint` | Run ESLint checks |

### Hot Module Replacement (HMR)

The dev server supports HMR—changes to React components and styles reflect instantly without full page reloads.

---

## 💾 Data & Privacy

- **Local Storage** — All chat history and settings are stored in your browser's local storage
- **No Cloud Sync** — Your data never leaves your device (unless you explicitly export)
- **API Calls Only** — Only prompts are sent to OpenRouter for AI processing
- **Clear All** — Delete all data anytime from Settings → "Clear All Data"

---

## 🐛 Troubleshooting

### API Key Not Working
- Verify the key is correctly copied to `.env.local`
- Ensure the key hasn't expired in your OpenRouter dashboard
- Check your OpenRouter account has available credits

### Streaming Not Working
- Confirm "Response Streaming" is enabled in Settings
- Check browser console for API errors
- Ensure your model supports streaming (all supported models do)

### History Not Saving
- Check browser's Local Storage is enabled
- Clear browser cache if issues persist
- History is specific to the browser/device you're using

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 16.x or higher

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Sign in to [Vercel](https://vercel.com)
3. Import the repository
4. Add environment variable:
   ```
   VITE_OPENROUTER_API_KEY = sk_live_...
   ```
5. Deploy!

### Deploy to Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable in Netlify settings
5. Deploy!

### Self-Hosted

```bash
npm run build
# Upload 'dist' folder to your server
```

---

## 📈 Performance

- **Vite Bundling** — Fast cold start and HMR
- **Code Splitting** — Lazy-loaded routes for optimal loading
- **Streaming** — Progressive rendering for large responses
- **Memoization** — React.memo on heavy components

Typical metrics:
- **First Load** — <2s (with cache)
- **TTI** — <3s
- **LCP** — <2.5s

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it in personal or commercial projects. See the [LICENSE](LICENSE) file for details.

---

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [OpenRouter API](https://openrouter.ai/docs)
- [React Router](https://reactrouter.com)

---

## 📬 Support

Have questions or found a bug? 

- 📧 **Email**: support@writeai.example (replace with your email)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/writeai/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/writeai/discussions)

---

## 🎉 Acknowledgments

- **OpenRouter** — For providing seamless AI model access
- **React & Vite** — For a fast, modern development experience
- **TailwindCSS** — For utility-first styling
- **Lucide Icons** — For beautiful, simple icons

---

**Built with ❤️ by [Fatima Muzafar Ali]**  
*Last updated: January 2025*
