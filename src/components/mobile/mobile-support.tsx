
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, LoaderCircle, Send, Mic, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chatbotSupport } from "@/ai/flows/chatbot-support";
import { cn } from "@/lib/utils";
import WellMindLogo from "../well-mind-logo";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function MobileSupport() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>, messageText?: string) => {
    e.preventDefault();
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
    <div className="relative flex flex-col h-[calc(100vh-8rem)]">
      {messages.length === 0 && !isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <WellMindLogo className="h-16 w-16" />
            <h2 className="mt-6 text-2xl font-semibold">Your safe space to talk.</h2>
            <p className="mt-2 text-muted-foreground">I'm here to listen, whenever you're ready.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-2 w-full max-w-sm">
                <Button variant="outline" className="w-full" onClick={(e) => handleSendMessage(e, "I'm feeling anxious")}>I'm feeling anxious</Button>
                <Button variant="outline" className="w-full" onClick={(e) => handleSendMessage(e, "I need to vent")}>I need to vent</Button>
                <Button variant="outline" className="w-full" onClick={(e) => handleSendMessage(e, "Suggest a mindfulness exercise")}>Suggest an exercise</Button>
            </div>
        </div>
      ) : (
        <ScrollArea className="flex-1 my-4 pr-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start gap-3",
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
                      : "bg-card border"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
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
      )}
       <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2 bg-background p-2 rounded-full border shadow-lg">
            <Button variant="ghost" size="icon" type="button" className="flex-shrink-0">
                <Camera className="h-5 w-5" />
            </Button>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none"
            />
            <Button variant="ghost" size="icon" type="button" className="flex-shrink-0">
                <Mic className="h-5 w-5" />
            </Button>
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="flex-shrink-0 rounded-full">
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
            </Button>
        </form>
       </div>
    </div>
  );
}
