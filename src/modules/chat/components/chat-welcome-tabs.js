import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, GraduationCap, Newspaper, Sparkles } from "lucide-react";
import React, { useState } from "react";

const CHAT_TAB_MESSAGE = [
  {
    tabName: "Create",
    icon: <Sparkles className="h-4 w-4" />,
    messages: [
      "Write a short story about robot discovering emotions",
      "Help me outline a sci-fi novel set in a post-apocalyptic world",
      "Create a character profile for a complex villain with symapthetic motives",
      "Give me 5 creative writing prompts for a sci-fi novel",
    ],
  },
  {
    tabName: "Explore",
    icon: <Newspaper className="h-4 w-4" />,
    messages: [
      "Good Books for fans of Rick Rubin",
      "Countries Ranked by number of corgis",
      "Most Successfull companies in the world",
      "How much does claude cost?",
    ],
  },
  {
    tabName: "Code",
    icon: <Code className="h-4 w-4" />,
    messages: [
      "Write a code to invert a binary search tree in python",
      "What is the difference between Promise.all and Promise.allSettled?",
      "Explain React's useEffect cleanup function",
      "Best Practice for error handling in async/await",
    ],
  },
  {
    tabName: "Learn",
    icon: <GraduationCap className="h-4 w-4" />,
    messages: [
      "Beginner's guide to Typescript",
      "Explain  the CAP theorem in distributed systems",
      "Why is AI so expensive?",
      "Are Black holes real?",
    ],
  },
];

const ChatWelcomeTabs = ({ userName, onMessageSelect }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-semibold">
          How can I help you{" "}
          {userName.slice(0, userName.indexOf(" ")) || userName}?
        </h1>

        <div className="flex flex-wrap gap-2 w-full">
          {CHAT_TAB_MESSAGE.map((tab, index) => (
            <Button
              key={index}
              variant={activeTab === index ? "default" : "secondary"}
              onClick={() => setActiveTab(index)}
              className="w-[110px] justify-start"
            >
              {tab.icon}
              <span className="ml-2">{tab.tabName}</span>
            </Button>
          ))}
        </div>

        <div className="space-y-3 w-full min-h-[240px]">
          {CHAT_TAB_MESSAGE[activeTab].messages.map((message, index) => (
            <div className="" key={index}>
              <button
                onClick={() => onMessageSelect(message)}
                className="w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors duration-300 ease-in-out py-2"
              >
                {message}
              </button>
              {index < CHAT_TAB_MESSAGE[activeTab].messages.length - 1 && (
                <Separator />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWelcomeTabs;
