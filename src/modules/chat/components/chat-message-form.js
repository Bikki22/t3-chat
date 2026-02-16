"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIModels } from "@/modules/ai-agent/hook/ai-agent";
import { Spinner } from "@/components/ui/spinner";
import { ModelSelector } from "./model-selector";
import { useCreateChat } from "../hooks/chat";
import { toast } from "sonner";

const ChatMessageForm = ({ initialMessage, onMessageChange }) => {
  const [message, setMessage] = useState("");
  const { data: models, isPending } = useAIModels();

  const [selectedModel, setSelectedModel] = useState(models?.models[0]?.id);

  const { mutateAsync, isPending: isChatPending } = useCreateChat();

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
      onMessageChange?.("");
    }
  }, [initialMessage, onMessageChange]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await mutateAsync({ content: message, model: selectedModel });
      toast.success("Message sent successfully");
      console.log("Message sent");
    } catch (error) {
      console.log("Error sending messages", error);
      toast.error("Failed to send message");
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <form onSubmit={handleSubmit}>
        <div className="relative rounded-2xl border-border shadow-sm transition-all">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="type your message here..."
            className={
              "min-h-[300px] min-h-[100px] resize-none border-0 bg-transparent px-4 py-3 text-base focus-visible:ring-0 focus-visible:ring-offset-0 "
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <div className="flex items-center justify-between gap-2 px-3 py-2 border-t">
            {/* Model selector */}
            <div className="flex items-center gap-1">
              {isPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <ModelSelector
                    models={models?.models}
                    selectedModelId={selectedModel}
                    onModelSelect={setSelectedModel}
                    className="ml-1"
                  />
                </>
              )}
            </div>
            <Button
              className={"h-8 w-8 p-0 rounded-full"}
              type="submit"
              disabled={!message.trim() || isChatPending}
              size="sm"
              variant={message.trim() ? "default" : "ghost"}
            >
              {isChatPending ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send Messages</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageForm;
