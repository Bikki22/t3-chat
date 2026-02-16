"use client";

import Modal from "@/components/ui/modal";
import { useDeleteChat } from "../../hooks/chat";
import { toast } from "sonner";

const DeleteChatModal = ({ isModalOpen, setIsModalOpen, chatId }) => {
  const { mutateAsync, isPending } = useDeleteChat(chatId);

  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast.success("Chat deleted successfully");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
      console.error("Failed to delete chat", error);
    }
  };

  return (
    <Modal
      title="Delete Chat"
      description="Are you sure you want to delete this chat? This action cannot be undone."
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleDelete}
      submitText={isPending ? "Deleting..." : "Delete"}
      submitVariant="destructive"
    >
      <p className="text-sm text-zinc-500">
        Once deleted, all request and data in the chats will be permanently
        removed
      </p>
    </Modal>
  );
};

export default DeleteChatModal;
