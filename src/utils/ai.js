import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
  baseURL: "https://api.groq.com/openai/v1",
});


export async function getAIResponse(query, systemPrompt) {
  const q1 = `
Design characters that seamlessly integrate with the provided preliminary storyline: 
Preliminary storyline: ${query}

The characters you design should adhere to the following format:
<characters>
<character_1>
<full_name>character_1's full name</full_name>
<character_introduction>character_1's introduction</character_introduction>
</character_1>
<character_2>
...
</character_2>
...
</characters>

Ensure strictly adherence to the above format and avoid generating superfluous content.`;

  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    { role: "user", content: q1 },
  ];

  const res = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });

  return res.choices[0].message.content;
}
