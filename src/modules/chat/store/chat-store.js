import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  chats: [],
  activeChatId: null,
  messages: [],

  setActiveChatId: (chatId) => set({ activeChatId: chatId }),
  setChats: (chats) => set({ chats }),
  setMessages: (messages) => set({ messages }),

  // ➕ Add new chat on create

  addChat: (chat) => set({ chats: [chat, ...get().chats] }),

  // ➕ Append a new message

  addMessage: (message) => set({ messages: [...get().messages, message] }),

  // Clear Message when switching chats

  clearMessage: () => set({ messages: [] }),
}));
