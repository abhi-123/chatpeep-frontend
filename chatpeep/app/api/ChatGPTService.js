// import axios from 'axios';

// const apiUrl = process.env.EXPO_PUBLIC_OPENAI_KEY;
// //console.log(apiUrl)
// const instance = axios.create({
//   baseURL: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${apiUrl}`
//   }
// });

// export const generateResponse = async (message) => {
//   try {
//     console.log(instance);
//     const response = await instance.post('', {
//       prompt: message,
//       max_tokens: 60
//     });
//     console.log(response.data.choices);
//     return response.data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//     return '';
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
//console.log(process.env.EXPO_PUBLIC_GEMINI_KEY);
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyDPk36v-ZH5ypbsswQ8w15md2P7cBCwO_o');

export const generateResponse = async (message) => {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = message;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
 
}