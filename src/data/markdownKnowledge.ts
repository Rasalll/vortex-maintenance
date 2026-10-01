type ConversationMessage = {
  role: 'user' | 'model';
  content: string;
};

type KnowledgeSection = {
  file: string;
  title: string;
  content: string;
};

const markdownSources = import.meta.glob('/MarkDowns/VORTEX_KNOWLEDGE/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const EXCLUDED_FILE = /00-VORTEX-CHATBOT-PRD\.md$/i;

function parseMarkdown(file: string, markdown: string): KnowledgeSection[] {
  const lines = markdown.split(/\r?\n/);
  const sections: KnowledgeSection[] = [];
  let documentTitle = file.split('/').pop()?.replace(/\.md$/i, '') ?? file;
  let parentHeading = '';
  let currentHeading = '';
  let body: string[] = [];

  const flush = () => {
    const content = body.join('\n').trim();
    if (!content && !currentHeading) return;
    const title = [documentTitle, parentHeading, currentHeading]
      .filter(Boolean)
      .join(' — ');
    sections.push({ file, title, content: `${title}\n${content}`.trim() });
    body = [];
  };

  for (const line of lines) {
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (!heading) {
      body.push(line);
      continue;
    }

    const level = heading[1].length;
    const text = heading[2].trim();
    if (level === 1) {
      flush();
      documentTitle = text;
      parentHeading = '';
      currentHeading = '';
    } else if (level === 2) {
      flush();
      parentHeading = text;
      currentHeading = '';
    } else {
      flush();
      currentHeading = text;
    }
  }

  flush();
  return sections;
}

const KNOWLEDGE_SECTIONS = Object.entries(markdownSources)
  .filter(([file]) => !EXCLUDED_FILE.test(file))
  .flatMap(([file, markdown]) => parseMarkdown(file, markdown));

const TOPIC_HINTS = [
  {
    id: 'company',
    files: ['01-VORTEX-COMPANY-OVERVIEW.md'],
    aliases: [
      'what does vortex do', 'what is vortex', 'about vortex', 'vortex company',
      'vortex enthaanu cheyyunnath', 'vortex enthanu cheyyunnath', 'vortex enthaanu',
      'vortex entha', 'enthaanu vortex', 'vortex entha cheyyunne',
      'വോർടെക്സ് എന്താണ് ചെയ്യുന്നത്', 'വോർടെക്സ് എന്താണ്', 'വോർട്ടെക്സ് എന്താണ്',
      'വോർടെക്സ് എന്ത് ചെയ്യുന്നു', 'കമ്പനി എന്താണ്', 'കമ്പനിയെക്കുറിച്ച്',
    ],
    terms: ['company overview', 'company description', 'broader company description', 'technology company'],
  },
  {
    id: 'services',
    files: ['02-VORTEX-MAIN-SERVICES.md'],
    aliases: [
      'what services does vortex provide', 'what services does vortex offer',
      'what services does vortex have', 'what are vortex services', 'vortex services',
      'list services', 'main services', 'services does vortex provide',
      'vortex enthokke services', 'enthokke services', 'service undo',
      'services aanu provide cheyyunnath', 'what are the services', 'what services',
      'which services', 'all services', 'services provide', 'services offer',
      'വോർടെക്സിന്റെ സേവനങ്ങൾ എന്തൊക്കെയാണ്', 'വോർടെക്സിന്റെ സേവനങ്ങൾ',
      'എന്തൊക്കെ സേവനങ്ങൾ', 'എന്തെല്ലാം സേവനങ്ങൾ', 'സേവനങ്ങൾ എന്തൊക്കെയാണ്',
      'എന്ത് സേവനങ്ങൾ നൽകുന്നു',
      'main services', 'main service', 'പ്രധാന സേവനങ്ങൾ',
    ],
    terms: ['services', 'verticals', 'provide', 'offer'],
  },
  {
    id: 'it-solutions',
    files: ['02-VORTEX-MAIN-SERVICES.md'],
    aliases: [
      'ai integrated it solutions', 'it solutions', 'custom software',
      'it solutions enthaanu', 'it solutions enthanu', 'ഐടി സൊല്യൂഷൻസ്',
      'ഐടി പരിഹാരങ്ങൾ', 'വെബ് സൊല്യൂഷൻസ്',
    ],
    terms: ['ai integrated it solutions', 'custom software architectures', 'ai-driven workflows', 'web mobile app delivery', 'optimized cloud devops'],
  },
  {
    id: 'automation',
    files: ['02-VORTEX-MAIN-SERVICES.md'],
    aliases: [
      'automation products', 'automation services', 'business process automation',
      'ai software development', 'ai integration', 'digital marketing and ai seo',
      'workflow automation', 'automation undo', 'automation products undo',
      'ഓട്ടോമേഷൻ', 'ഓട്ടോമേഷൻ സേവനങ്ങൾ', 'ഓട്ടോമേഷൻ പ്രോഡക്റ്റ്സ്',
    ],
    terms: ['ai integrated automation products', 'automation services', 'business process automation', 'ai software development', 'enterprise task automations', 'intelligent document extractors', 'workflow automation', 'operational efficiency dashboards'],
  },
  {
    id: 'products',
    files: ['02-VORTEX-MAIN-SERVICES.md'],
    aliases: [
      'what products can we build', 'what products can you build', 'what kind of products',
      'which products', 'products we build', 'products can build', 'enthokke products',
      'products ningal build cheyyan kazhiyum', 'ningal enthokke products build cheyyum',
      'enthu products aanu build cheyyuka', 'crm', 'lms', 'cms', 'erp', 'hrms',
      'helpdesk', 'workflow automation', 'എന്തൊക്കെ പ്രോഡക്റ്റുകൾ',
      'പ്രോഡക്റ്റുകൾ എന്തൊക്കെയാണ്', 'ഏതൊക്കെ ഉൽപ്പന്നങ്ങൾ',
    ],
    terms: ['products we build', 'crm', 'lms', 'cms', 'erp', 'hrms', 'helpdesk', 'workflow automation'],
  },
  {
    id: 'locations',
    files: ['05-VORTEX-LOCATIONS-CONTACT.md'],
    aliases: [
      'where is vortex', 'vortex location', 'manjeri office', 'where is manjeri office',
      'vortex evide', 'manjeri office evideya', 'vortex evide aanu', 'location evide',
      'വോർടെക്സ് എവിടെയാണ്', 'വോർടെക്സ് എവിടെയാണ് ഉള്ളത്', 'മഞ്ചേരി ഓഫീസ് എവിടെയാണ്',
      'മഞ്ചേരി എവിടെയാണ്', 'സ്ഥലം എവിടെയാണ്',
    ],
    terms: ['locations', 'manjeri', 'infopark', 'kochi', 'calicut', 'contact information'],
  },
  {
    id: 'institute',
    files: ['04-VORTEX-INSTITUTE.md', '02-VORTEX-MAIN-SERVICES.md'],
    aliases: [
      'technology institute', 'vortex institute', 'institute courses', 'courses',
      'കോഴ്സുകൾ', 'കോഴ്സ്', 'ഇൻസ്റ്റിറ്റ്യൂട്ട്', 'പഠന പരിപാടികൾ',
    ],
    terms: ['institute', 'learning programs', 'courses', 'curriculum', 'students'],
  },
  {
    id: 'learning-features',
    files: ['03-VORTEX-LEARNING-FEATURES.md'],
    aliases: [
      'why vortex', 'why choose vortex', 'learning features', 'why study at vortex',
      'എന്തുകൊണ്ട് vortex', 'വോർടെക്സിൽ പഠിക്കുന്നത്',
    ],
    terms: ['learning features', 'expert mentors', 'real world projects', 'practical learning'],
  },
] as const;

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'about', 'at', 'can', 'do', 'does', 'for', 'from',
  'how', 'i', 'in', 'is', 'it', 'me', 'of', 'on', 'or', 'the', 'to', 'what',
  'where', 'which', 'who', 'with', 'you', 'your', 'vortex', 'please',
  'enthaanu', 'enthanu', 'entha', 'aano', 'undo', 'anu', 'aanu', 'oru',
  'എന്താണ്', 'എന്തൊക്കെയാണ്', 'എന്തൊക്കെ', 'എവിടെയാണ്', 'ആണ്', 'ഉണ്ട്', 'ഒരു',
]);

function normalize(value: string): string {
  return value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function matchesAlias(query: string, alias: string): boolean {
  return ` ${normalize(query)} `.includes(` ${normalize(alias)} `);
}

function matchedTopics(query: string) {
  return TOPIC_HINTS.filter((topic) => topic.aliases.some((alias) => matchesAlias(query, alias)));
}

function isFollowUp(query: string): boolean {
  const normalized = normalize(query);
  const tokens = tokenize(query);
  return [
    'tell me more', 'more about it', 'more details', 'explain more', 'explain further',
    'elaborate', 'what about that', 'what about it', 'how about that',
    'athine kurichu', 'athinte kurichu', 'kurachu koodi', 'kurach koodi', 'kurachukoodi', 'kooduthal parayamo',
    'അതിനെക്കുറിച്ച്', 'അതിനെ കുറിച്ച്', 'അതിന്റെ കുറിച്ച്', 'കുറച്ചുകൂടി പറയാമോ',
    'കൂടുതൽ പറയാമോ', 'കുറച്ചുകൂടി വിശദീകരിക്കാമോ', 'അതിനെപ്പറ്റി കൂടുതൽ',
  ].some((phrase) => normalized.includes(normalize(phrase))) || (
    tokens.length <= 2 && /\b(it|that|this|those|them|more|why|how)\b/u.test(normalized)
  );
}

function getSearchQuery(query: string, history: ConversationMessage[]): string {
  if (!isFollowUp(query)) return query;

  const previousQuestion = [...history]
    .reverse()
    .find((message) => message.role === 'user' && !isFollowUp(message.content));
  return previousQuestion ? `${previousQuestion.content} ${query}` : query;
}

function scoreSection(section: KnowledgeSection, tokens: string[], topics: ReturnType<typeof matchedTopics>): number {
  const searchable = normalize(section.content);
  let score = 0;

  for (const token of tokens) {
    if (searchable.includes(token)) score += section.title.toLocaleLowerCase().includes(token) ? 4 : 1;
  }

  for (const topic of topics) {
    const filename = section.file.split('/').pop() ?? '';
    if ((topic.files as readonly string[]).includes(filename)) score += 2;
    if (topic.terms.some((term) => normalize(section.title).includes(normalize(term)))) score += 7;
    else if (topic.terms.some((term) => searchable.includes(normalize(term)))) score += 3;
  }

  return score;
}

/** Retrieve relevant sections from the Markdown knowledge base for a chatbot question. */
export function retrieveRelevantKnowledge(query: string, history: ConversationMessage[] = []): string {
  const searchQuery = getSearchQuery(query, history);
  const topics = matchedTopics(searchQuery);
  const broadServicesQuestion = topics.some((topic) => topic.id === 'services');
  const productQuestion = topics.some((topic) => topic.id === 'products');

  if (broadServicesQuestion) {
    const servicesFile = Object.entries(markdownSources)
      .find(([file]) => file.endsWith('02-VORTEX-MAIN-SERVICES.md'));
    if (servicesFile) {
      const markdown = servicesFile[1];
      const topLevelServiceSections = markdown.split(/(?=^##\s)/m);
      const conciseServiceSections = topLevelServiceSections.slice(1, 7)
        .map((section) => section.split(/^###\s/m)[0].trim());
      return [topLevelServiceSections[0], ...conciseServiceSections]
        .join('\n\n')
        .trim();
    }
  }

  const queryTokens = tokenize(searchQuery);
  const ranked = KNOWLEDGE_SECTIONS
    .map((section) => ({ section, score: scoreSection(section, queryTokens, topics) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  if (productQuestion) {
    const productSections = ranked.filter(({ section }) => /products we build/i.test(section.title));
    if (productSections.length) return productSections.map(({ section }) => section.content).join('\n\n---\n\n');
  }

  const minimumScore = ranked.length ? Math.max(1, ranked[0].score - 2) : 0;
  const selected: KnowledgeSection[] = [];
  let totalLength = 0;
  for (const { section, score } of ranked) {
    if (score < minimumScore) break;
    if (selected.some((item) => item.content === section.content)) continue;
    if (selected.length >= 4 || totalLength + section.content.length > 5000) break;
    selected.push(section);
    totalLength += section.content.length;
  }

  return selected.map((section) => section.content).join('\n\n---\n\n');
}
