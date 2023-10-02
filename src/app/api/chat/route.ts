import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

interface MessageProps {
  messages: Array<ChatCompletionRequestMessage>;
}

export async function POST(req: Request) {
  const { messages }: MessageProps = await req.json();

  // console.log(messages);

  const response = await openai.createChatCompletion({
    model: "gpt-4", // "gpt-3.5-turbo", "gpt-3.5-turbo-16k", "gpt-4"
    stream: true,
    messages,
  });

  console.log("mensagens: ", messages);
  // console.log("Última mensagens: ", messages[messages.length - 1].content);

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      console.log("resposta: ", completion);
    },
  });

  return new StreamingTextResponse(stream);
}
