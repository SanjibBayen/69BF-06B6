"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chatbotSupport } from "@/ai/flows/chatbot-support";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const quickReplies = [
    "I feel stressed",
    "I feel fine",
    "A little stressed",
    "Very low"
]

const suggestedActions = [
    "Start Breathing Exercise",
    "Try a 10-min Meditation",
    "Connect with Counselor"
]

export default function MobileSupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "I noticed your heart rate is high, are you okay?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent, messageText?: string) => {
    if(e) e.preventDefault();
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await chatbotSupport({ message: textToSend });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot failed:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
       <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Your AI Wellness Companion💡</h1>
      </div>
      <ScrollArea className="flex-1 my-4 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-2",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot size={18} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs rounded-lg px-4 py-2 md:max-w-md",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot size={18} />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-xs rounded-lg px-4 py-2 bg-muted">
                <LoaderCircle className="animate-spin h-5 w-5" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
       <div className="flex flex-wrap gap-2 mb-4">
            {quickReplies.map(reply => (
                <Button key={reply} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, reply)}>{reply}</Button>
            ))}
      </div>
       <div className="space-y-2">
          {suggestedActions.map(action => (
                <Button key={action} variant="outline" className="w-full justify-start gap-2">
                    {action}
                </Button>
            ))}
       </div>
    </div>
  );
}
