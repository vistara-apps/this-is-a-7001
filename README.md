# BioCraft AI 🚀

**Craft Your Perfect LinkedIn Bio with AI**

BioCraft AI is an intelligent web application that helps professionals create compelling, optimized LinkedIn bios using advanced AI technology. Get multiple bio variations, keyword optimization, and professional insights to boost your LinkedIn presence.

![BioCraft AI Screenshot](https://via.placeholder.com/800x400/1e40af/ffffff?text=BioCraft+AI+Dashboard)

## ✨ Features

### 🤖 AI-Powered Bio Generation
- Generate 3 unique LinkedIn bio variations
- Customizable tone and style options
- Industry-specific optimization
- Professional, creative, and enthusiastic tones

### 🔍 Keyword Optimization (Premium)
- AI-powered keyword analysis
- Industry-relevant suggestions
- Improved LinkedIn discoverability
- SEO-optimized content

### 💎 Subscription Tiers
- **Free Tier**: 3 bio generations per day
- **Premium Tier**: Unlimited generations + keyword optimization
- **One-time Options**: Single bio optimization ($25) or keyword analysis ($5)

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark theme with gradient backgrounds
- Smooth animations and transitions
- Accessible and user-friendly interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (optional - works with demo data)
- Stripe account for payments (optional - demo mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/biocraft-ai.git
   cd biocraft-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your API keys:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Architecture

### Frontend Stack
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### AI Integration
- **OpenAI GPT-4** - Bio generation and keyword analysis
- **Custom prompts** - Optimized for LinkedIn content
- **Fallback system** - Demo data when API unavailable

### Payment Processing
- **Stripe** - Secure payment processing
- **Subscription management** - Recurring billing
- **Webhook handling** - Real-time updates

### State Management
- **React Context** - Global state management
- **useReducer** - Complex state logic
- **localStorage** - Data persistence

## 📁 Project Structure

```
biocraft-ai/
├── src/
│   ├── components/          # React components
│   │   ├── AppShell.jsx    # Main layout
│   │   ├── BioInputForm.jsx # User input form
│   │   ├── BioResults.jsx   # Generated bios display
│   │   ├── UpgradeModal.jsx # Subscription modal
│   │   └── SelectDropdown.jsx # Custom dropdown
│   ├── contexts/           # React contexts
│   │   └── AppContext.jsx  # Global app state
│   ├── services/           # External services
│   │   ├── openai.js      # OpenAI integration
│   │   └── stripe.js      # Stripe integration
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── docs/                  # Documentation
│   └── API.md            # API documentation
├── public/               # Static assets
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🎯 Usage

### Basic Bio Generation

1. **Enter your details**
   - Job title and industry
   - Experience level
   - Key skills
   - Career goals

2. **Choose your tone**
   - Professional
   - Creative
   - Enthusiastic
   - Authoritative
   - Friendly

3. **Generate bios**
   - Get 3 unique variations
   - Copy your favorite
   - Use on LinkedIn

### Premium Features

1. **Keyword Optimization**
   - Select a generated bio
   - Get AI-powered keyword suggestions
   - Improve discoverability

2. **Unlimited Generation**
   - No daily limits
   - Experiment with different approaches
   - Perfect your bio

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for bio generation | No* |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | No* |

*App works in demo mode without these keys

### Tailwind Configuration

The app uses a custom Tailwind configuration with:
- Custom color palette
- Design system tokens
- Responsive breakpoints
- Animation utilities

### API Configuration

OpenAI settings in `src/services/openai.js`:
- Model: `google/gemini-2.0-flash-001`
- Temperature: `0.7`
- Max tokens: `500`

## 🚀 Deployment

### Docker Deployment

1. **Build the image**
   ```bash
   docker build -t biocraft-ai .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 biocraft-ai
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## 📊 Analytics & Monitoring

### Usage Tracking
- Bio generation counts
- User subscription status
- Daily usage limits
- Feature usage analytics

### Error Monitoring
- API error tracking
- User error reporting
- Performance monitoring
- Uptime tracking

## 🔒 Security

### Data Protection
- No sensitive data stored locally
- Secure API communication
- PCI DSS compliant payments
- GDPR compliant data handling

### API Security
- Rate limiting
- Input validation
- Error handling
- Secure headers

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

### E2E Tests
```bash
npm run test:e2e
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Style

- ESLint configuration
- Prettier formatting
- Conventional commits
- Component documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/API.md)
- [User Guide](docs/USER_GUIDE.md)
- [FAQ](docs/FAQ.md)

### Contact
- Email: support@biocraft-ai.com
- GitHub Issues: [Report a bug](https://github.com/vistara-apps/biocraft-ai/issues)
- Discord: [Join our community](https://discord.gg/biocraft-ai)

## 🗺️ Roadmap

### Q1 2024
- [ ] Multi-language support
- [ ] LinkedIn integration
- [ ] Bio templates library
- [ ] Advanced analytics

### Q2 2024
- [ ] Team collaboration features
- [ ] API for developers
- [ ] Mobile app
- [ ] Industry-specific templates

### Q3 2024
- [ ] AI-powered profile optimization
- [ ] Social media integration
- [ ] Advanced personalization
- [ ] Enterprise features

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT-4 API
- [Stripe](https://stripe.com) for payment processing
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for icons
- [Vite](https://vitejs.dev) for build tooling

---

**Made with ❤️ by the BioCraft AI team**

[Website](https://biocraft-ai.com) • [Documentation](https://docs.biocraft-ai.com) • [Twitter](https://twitter.com/biocraftai)
