import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateBioDrafts(userInput) {
  const { jobTitle, industry, experience, skills, goals, tone } = userInput;
  
  // Demo data if no API key
  if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'demo-key') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          `${tone === 'creative' ? '🚀 ' : ''}${jobTitle} passionate about ${industry} with ${experience} experience. Skilled in ${skills}. Currently ${goals}. Let's connect!`,
          `Experienced ${jobTitle} in ${industry} | ${skills} Expert | ${goals} | Open to new opportunities and networking`,
          `${tone === 'enthusiastic' ? 'Energetic ' : ''}${jobTitle} specializing in ${industry}. ${experience} track record. Core competencies: ${skills}. Mission: ${goals}`,
        ]);
      }, 2000);
    });
  }

  const prompt = `Create 3 different LinkedIn bio variations for a professional with the following details:

Job Title: ${jobTitle}
Industry: ${industry}
Experience: ${experience}
Skills: ${skills}
Career Goals: ${goals}
Desired Tone: ${tone}

Requirements:
- Each bio should be 150-200 characters
- Include relevant keywords for ${industry}
- Match the ${tone} tone
- Be engaging and professional
- Focus on value proposition

Return only the 3 bio variations, separated by "---"`;

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    return response.split('---').map(bio => bio.trim()).filter(bio => bio.length > 0);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate bio drafts. Please try again.');
  }
}

export async function generateKeywords(bioText, industry) {
  // Demo data if no API key
  if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'demo-key') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          'Leadership', 'Strategy', 'Innovation', 'Growth',
          'Digital Transformation', 'Team Building', 'Analytics',
          'Customer Success', 'Business Development', 'Optimization'
        ]);
      }, 1500);
    });
  }

  const prompt = `Analyze this LinkedIn bio and suggest 10 relevant keywords for ${industry} professionals:

"${bioText}"

Return only the keywords, separated by commas.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.5,
    });

    const response = completion.choices[0].message.content;
    return response.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate keywords. Please try again.');
  }
}