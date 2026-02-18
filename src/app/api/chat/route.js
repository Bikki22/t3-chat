import { convertToModelMessages, streamText, tool } from "ai";
import db from "@/lib/db";
import { MessageRole } from "@prisma/client";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// initialize openRouter provider
const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

function convertStoreMessageToUI(msg) {
  try {
    const parts = JSON.parse(msg.content);
    const validParts = parts.filter((part) => part.type === "text");

    if (validParts.length === 0) return null;

    return {
      id: msg.id,
      role: msg.messageRole.toLowerCase(),
      parts: [{ type: "text", text: msg.content }],
      createdAt: msg.createdAt,
    };
  } catch (error) {}
}

export async function POST(req) {
  try {
    const { chatId, messages: newMessages, model } = await req.json();

    const previousMessages = chatId
      ? await db.message.findMany({
          where: {
            chatId,
          },
          orderBy: {
            createdAt: "asc",
          },
        })
      : [];

    const uiMessages = previousMessages
      .map(convertStoreMessageToUI)
      .filter((msg) => msg !== null);

    const normalizedNewMessages = Array.isArray(newMessages)
      ? newMessages
      : [newMessages];

    const allUIMessages = [...uiMessages, ...normalizedNewMessages];

    let modelMessages;
    try {
      modelMessages = convertToModelMessages(allUIMessages);
    } catch (conversionError) {
      modelMessages = allUIMessages
        .map((msg) => ({
          role: msg.role,
          content: msg.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("\n"),
        }))
        .filter((m) => m.content);
    }

    const results = streamText({
      model: provider.chat(model),
      messages: modelMessages,
      system: CHAT_SYSTEM_PROMPT,
    });
  } catch (error) {}
}
