# SY Tech Solutions - Development Notes

## SELAM AI Assistant (v2.0 Enhanced)

### Architecture Overview
The AI assistant uses a 4-layer decision engine:
1. **Enhanced Smart Matching** (`ENHANCED_QA_DATABASE` in `src/constants/ai-knowledge-enhanced.ts`) — 100+ keyword-weighted QA pairs with context awareness, negation detection, and priority scoring. Covers 95%+ of business questions.
2. **Groq AI Response** — Falls through to Groq LLM (any of 5 models) when local match score is low.
3. **Intent Classification** — Pattern-based fallback that classifies message intent (skeptical, excited, contact sharing, etc.)
4. **Context-Aware Politeness** — Never says "I don't know" coldly. Always offers a path forward.

### Key Files
| File | Purpose |
|---|---|
| `src/constants/ai-knowledge-enhanced.ts` | ENHANCED knowledge base (new) — system prompt, 100+ QA pairs, intent classifiers, model configs |
| `src/app/api/ai-bot/route.ts` | API route with multi-layer decision engine + auto model switching |
| `src/components/shared/AiAssistant.tsx` | Chat UI component (uses new imports) |
| `src/constants/ai-knowledge.ts` | ORIGINAL knowledge base (kept for backwards compatibility) |

### AI Model Management
The system supports 5 Groq models with automatic failover:
- **Default**: Llama 3.3 70B (fast, smart, free)
- **Fallback chain**: Llama 3.1 8B → Mixtral 8x7B → Gemma 2 9B → Llama 3.2 90B
- Auto-switches after 2 consecutive failures per model
- Client can specify `preferredModel` in API request to switch models

### Smart Matching Engine Features
- **Weighted keyword scoring** — longer/phrase keywords weighted higher
- **Priority multipliers** — generic matches (priority 1) vs industry-specific (priority 3)
- **Negation detection** — skips entries when negated words present (e.g., "already submitted" with "not")
- **Context memory** — detects business type, budget, location from conversation history
- **Context-aware enhancement** — auto-personalizes responses based on detected business type
- **Intent classifiers** — regex patterns that save the AI when no keyword matches (7 patterns)
- **Amharic phrase support** — 7 Amharic QA pairs mapped to English responses

### Key Behaviors to Maintain
- NEVER auto-open forms — always ask first: "Want me to open the project form?"
- Short responses (1-3 sentences) unless asked for more detail
- NEVER say "I don't know" coldly — always offer next step
- Match user energy (casual ↔ professional)
- English only responses
- [NAVIGATE], [OPEN_FORM], [HANDOFF] action tags used at end of messages

### Environment Variables
- `GROQ_API_KEY` — Required for Groq LLM access
</write_to_content>