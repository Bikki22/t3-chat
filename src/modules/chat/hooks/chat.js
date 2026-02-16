import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createChatWithMessage, deleteChat } from "../actions";
import { router } from "next";
import { toast } from "sonner";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: (values) => createChatWithMessage(values),
    onSuccess: (res) => {
      if (res.success && res.data) {
        //  add opmistic ui
        const chat = res.data;

        queryClient.invalidateQueries(["chats"]);

        router.push(`/chat/${res.data.id}?auto`);
      }
    },
    onError: (error) => {
      console.error("create chat error:", error);
      toast.error(error.message);
    },
  });
};

export const useDeleteChat = (chatId) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
    },

    onError: (error) => {
      console.error("Failed to delete chat", error);
      toast.error(error.message);
    },
  });
};
