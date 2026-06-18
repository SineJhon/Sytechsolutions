import { NextRequest, NextResponse } from 'next/server';
import {
  AI_SYSTEM_PROMPT,
  ENHANCED_QA_DATABASE,
  INTENT_CLASSIFIERS,
  AVAILABLE_MODELS,
  ModelConfig
} from '@/constants/ai-knowledge-enhanced';

// ─── Groq Client ───
let groqClient: any = null;

function getGroqClient() {
  if (!groqClient && process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your-groq-api-key-here') {
    // Dynamic import to avoid issues
    const Groq = require('groq-sdk');
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
}

// ─── Context Memory ───
// Remembers user context across conversation turns
interface ConversationContext {
  businessType?: string;
  userBudget?: string;
  userLocation?: string;
  mentionedServices: Set<string>;
  previousIntents: string[];
  hasShownForm: boolean;
}

function extractContext(messages: { role: string; content: string }[]): ConversationContext {
  const ctx: ConversationContext = {
    mentionedServices: new Set(),
    previousIntents: [],
    hasShownForm: false,
  };

  for (const msg of messages) {
    const lower = msg.content.toLowerCase();

    // Detect business type
    const businessPatterns = [
      /(?:i (?:have|own|run|manage|operate)\s+(?:a|an)\s+(\w+(?:\s+\w+)?\s*(?:restaurant|hotel|school|shop|store|clinic|hospital|cafe|agency|studio|firm|company|business)))/i,
      /(?:my\s+(\w+(?:\s+\w+)?\s*(?:restaurant|hotel|school|shop|store|clinic|hospital|cafe|agency|company|business)))/i,
    ];
    for (const pattern of businessPatterns) {
      const match = lower.match(pattern);
      if (match) {
        ctx.businessType = match[1]?.trim() || 'business';
        break;
      }
    }

    // Detect budget mentions
    const budgetMatch = lower.match(/(\d[\d,]*)\s*(?:etb|birr|\$|usd|dollar)/i);
    if (budgetMatch) {
      ctx.userBudget = budgetMatch[0];
    }

    // Detect location
    const locationPatterns = [
      /(?:i(?:'m| am)\s+(?:from|in|based\s+in)\s+(\w+(?:\s+\w+)?))/i,
      /(?:from\s+(?:the\s+)?(?:usa|uk|canada|australia|europe|ethiopia|arba\s+minch|addis))/i,
    ];
    for (const pattern of locationPatterns) {
      const match = lower.match(pattern);
      if (match) {
        ctx.userLocation = match[1] || match[0];
        break;
      }
    }

    if (msg.role === 'user') {
      // Track services mentioned
      const serviceKeywords = ['website', 'restaurant', 'ecommerce', 'erp', 'booking', 'crm', 'school', 'hospital', 'app'];
      for (const kw of serviceKeywords) {
        if (lower.includes(kw)) ctx.mentionedServices.add(kw);
      }
    }

    if (msg.content.includes('[OPEN_FORM]')) ctx.hasShownForm = true;
  }

  return ctx;
}

// ─── Enhanced Smart Matching Engine ───
// Uses weighted keyword scoring, negation detection, and context awareness
function findEnhancedMatch(msg: string, context: ConversationContext): { answer: string; action?: string; score: number } | null {
  const lower = msg.toLowerCase().trim();
  let best: { answer: string; action?: string; score: number } | null = null;

  for (const qa of ENHANCED_QA_DATABASE) {
    let score = 0;
    const priority = qa.priority || 1;

    // Skip if negated words are present
    if (qa.negateKeywords) {
      let negated = false;
      for (const neg of qa.negateKeywords) {
        if (lower.includes(neg.toLowerCase())) {
          negated = true;
          break;
        }
      }
      if (negated) continue;
    }

    // Score primary keywords
    for (const kw of qa.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.length * 2; // Primary keywords weighted more
      }
    }

    // Score secondary keywords if they exist
    if (qa.secondaryKeywords && qa.requiresAllSecondary) {
      let allMatch = true;
      for (const sk of qa.secondaryKeywords) {
        if (!lower.includes(sk.toLowerCase())) {
          allMatch = false;
          break;
        }
      }
      if (allMatch) score += 50; // Big boost for all secondary match
    } else if (qa.secondaryKeywords) {
      for (const sk of qa.secondaryKeywords) {
        if (lower.includes(sk.toLowerCase())) {
          score += sk.length;
        }
      }
    }

    // Apply priority multiplier
    score *= priority;

    // Bonus: Context awareness — boost if user's business type matches this QA
    if (context.businessType && qa.keywords.some(k => context.businessType?.toLowerCase().includes(k))) {
      score += 30;
    }

    // Full phrase matches get huge bonus
    for (const kw of qa.keywords) {
      if (kw.split(' ').length > 1 && lower.includes(kw)) {
        score += kw.length * 3; // Triple score for multi-word exact phrases
      }
    }

    if (score > 0 && (!best || score > best.score)) {
      best = { answer: qa.answer, action: qa.action, score };
    }
  }

  return best;
}

// ─── Intent Classifier Fallback ───
// When no keyword match found, classify by writing style to give contextual response
function findIntentMatch(msg: string): string | null {
  const lower = msg.trim();
  if (!lower) return null;

  for (const classifier of INTENT_CLASSIFIERS) {
    if (classifier.pattern.test(lower)) {
      return classifier.response(lower);
    }
  }

  return null;
}

// ─── Context-Aware Response Enhancer ───
function enhanceWithContext( answer: string, context: ConversationContext): string {
  // If we know their business type, personalize
  if (context.businessType && !answer.toLowerCase().includes(context.businessType.toLowerCase())) {
    const serviceMap: Record<string, string> = {
      restaurant: 'restaurant website',
      hotel: 'booking system',
      school: 'school management system',
      clinic: 'clinic management system',
      hospital: 'hospital management system',
      shop: 'e-commerce website',
      store: 'e-commerce website',
    };
    const relevantService = Object.entries(serviceMap).find(([key]) =>
      context.businessType?.toLowerCase().includes(key)
    );
    if (relevantService && !answer.includes('what kind of business') && !answer.includes('tell me about your')) {
      return `${answer} Also, since you mentioned you have a ${context.businessType}, our ${relevantService[1]} might be perfect for you!`;
    }
  }

  return answer;
}

// ─── Action Appender ───
function appendAction(answer: string, action?: string): string {
  if (!action) return answer;
  const [type, value] = action.split(':');
  if (type === 'NAVIGATE') return `${answer} [NAVIGATE:${value}]`;
  if (type === 'OPEN_FORM') return `${answer} [OPEN_FORM]`;
  if (type === 'HANDOFF') return `${answer} [HANDOFF:${value}]`;
  return answer;
}

// ─── AI Model Manager ───
let currentModelIndex = 0;
const MODEL_FAILURE_THRESHOLD = 2;
const modelFailureCounts: Record<string, number> = {};

function getCurrentModel(): ModelConfig {
  return AVAILABLE_MODELS[currentModelIndex] || AVAILABLE_MODELS[0];
}

function switchToNextModel(): ModelConfig {
  currentModelIndex = (currentModelIndex + 1) % AVAILABLE_MODELS.length;
  const newModel = getCurrentModel();
  console.log(`Switching AI model to: ${newModel.name} (${newModel.modelName})`);
  return newModel;
}

function recordModelFailure(modelId: string) {
  modelFailureCounts[modelId] = (modelFailureCounts[modelId] || 0) + 1;
  if (modelFailureCounts[modelId] >= MODEL_FAILURE_THRESHOLD) {
    switchToNextModel();
    modelFailureCounts[modelId] = 0;
  }
}

// ─── Groq AI with Model Switching ───
async function getGroqResponse(
  messages: { role: string; content: string }[],
  modelConfig?: ModelConfig
): Promise<string | null> {
  const client = getGroqClient();
  if (!client) return null;

  const model = modelConfig || getCurrentModel();

  try {
    const response = await client.chat.completions.create({
      model: model.modelName,
      messages: [
        { role: 'system', content: AI_SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      ],
      max_tokens: model.maxTokens,
      temperature: model.temperature,
    });

    const content = response.choices[0]?.message?.content ?? null;
    if (content) {
      // Success — reset failure count for this model
      modelFailureCounts[model.id] = 0;
    }
    return content;
  } catch (error) {
    console.error(`Groq API error (${model.modelName}):`, error);
    recordModelFailure(model.id);
    return null;
  }
}

// ─── Chain of Models Fallback ───
async function getGroqResponseWithFallback(
  messages: { role: string; content: string }[]
): Promise<string | null> {
  // Try each model in sequence until one works
  const startIndex = currentModelIndex;
  for (let i = 0; i < AVAILABLE_MODELS.length; i++) {
    const modelIndex = (startIndex + i) % AVAILABLE_MODELS.length;
    const model = AVAILABLE_MODELS[modelIndex];
    const result = await getGroqResponse(messages, model);
    if (result) {
      // Update current model to this working one
      currentModelIndex = modelIndex;
      return result;
    }
  }
  return null;
}

// ─── Multi-Layer Decision Engine ───
// The AI tries up to 4 strategies before ever giving up:
// 1. Exact smart matching (enhanced keyword database)
// 2. Groq AI response with model switching
// 3. Intent classification (pattern-based fallback)
// 4. Context-aware polite deflection (last resort)
function decideResponse(
  msg: string,
  messages: { role: string; content: string }[],
  aiReply: string | null
): { answer: string; action?: string } {
  const context = extractContext(messages);

  // LAYER 1: Enhanced local matching (covers 95%+ of business questions)
  const local = findEnhancedMatch(msg, context);
  if (local && local.score >= 3) {
    return {
      answer: enhanceWithContext(local.answer, context),
      action: local.action,
    };
  }

  // LAYER 2: AI response with smart action attachment
  if (aiReply) {
    const hasAction = aiReply.includes('[NAVIGATE:') || aiReply.includes('[OPEN_FORM]') || aiReply.includes('[HANDOFF:');
    if (!hasAction) {
      // If AI didn't include action, see if local match suggests one
      if (local?.action) {
        return { answer: appendAction(aiReply, local.action), action: local.action };
      }
    }
    return { answer: aiReply };
  }

  // LAYER 3: Intent-based matching (pattern fallback)
  if (local && local.score > 0) {
    return { answer: enhanceWithContext(local.answer, context), action: local.action };
  }

  const intentResponse = findIntentMatch(msg);
  if (intentResponse) {
    return { answer: intentResponse };
  }

  // LAYER 4: Context-aware polite response (never says "I don't know" coldly)
  // Use context to give a helpful default
  if (context.businessType) {
    return {
      answer: `That's an interesting question about your ${context.businessType}! I'd love to help. We build custom websites and systems for businesses like yours. Want to tell me more about what you're looking for?`,
    };
  }

  if (context.userLocation) {
    return {
      answer: `Great to connect with you from ${context.userLocation}! We work with clients globally. Let me know what you're looking to build — a website, e-commerce store, or business system?`,
    };
  }

  // Final graceful fallback — never cold "I don't know"
  return {
    answer: "That's an interesting question! I want to make sure you get the best answer. Could you tell me a bit more about what you're looking for? Whether it's a website, an online store, or a business system — I'm here to help!"
  };
}

// ─── API Route ───
export async function POST(req: NextRequest) {
  try {
    const { messages, preferredModel } = await req.json();
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').at(-1)?.content ?? '';

    if (!lastUserMessage) {
      return NextResponse.json({
        reply: "Hey there! I'm SY Tech Solutions Live Assistance. I can walk you through our services, pricing, portfolio — or help you kick off a new project. What's on your mind?",
      });
    }

    // Set preferred model if specified
    if (preferredModel) {
      const modelIndex = AVAILABLE_MODELS.findIndex(m => m.id === preferredModel);
      if (modelIndex >= 0) {
        currentModelIndex = modelIndex;
      }
    }

    // Try Groq AI (with automatic model switching on failure)
    const aiReply = await getGroqResponseWithFallback(messages);

    // Use multi-layer decision engine
    const { answer, action } = decideResponse(lastUserMessage, messages, aiReply);

    // Final processing
    const processedAnswer = appendAction(answer, action);

    return NextResponse.json({ reply: processedAnswer });
  } catch (error) {
    console.error('AI Bot error:', error);
    return NextResponse.json(
      {
        reply:
          'Sorry, something went wrong on my end. Please try again or reach us directly on Telegram @SineJhon. They usually respond within 24 hours!',
      },
      { status: 500 }
    );
   }
}
