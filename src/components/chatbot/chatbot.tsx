"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
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

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! I'm your WellMind assistant. How are you feeling today?", sender: "bot" },
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await chatbotSupport({ message: input });
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
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full h-16 w-16 shadow-lg">
              <Bot className="h-8 w-8" />
              <span className="sr-only">Open Chat</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col w-full sm:w-[540px] sm:max-w-full">
            <SheetHeader>
              <SheetTitle>WellMind Assistant</SheetTitle>
              <SheetDescription>
                Your friendly support chatbot. I'm here to listen.
              </SheetDescription>
            </SheetHeader>
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
                         <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
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
                         <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                      </Avatar>
                      <div className="max-w-xs rounded-lg px-4 py-2 bg-muted">
                          <LoaderCircle className="animate-spin h-5 w-5" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <SheetFooter>
              <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
