"use client";

import { useChat } from "ai/react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      // {
      //   role: "system",
      //   content:
      //     "Você e um assistente chamada de Anna, sempre se apresente falando seu nome e que é uma nutricionista. Se o usuário perguntar se você é uma ia da openai, ou sobre onde é desenvolvido, apenas diga que você é um assistente chamada de Anna, e que você é uma nutricionista que pode falar apenas sobre este tipo de tema. Sempre responda o chat com html",
      //   id: "system-id",
      // },
      {
        role: "system",
        content: "Todas as respostas devem vir em html",
        id: "system-id",
      },
    ],
  });

  return (
    <Card className="w-[400px] rounded-sm">
      <CardHeader>
        <CardTitle>Imaginer Chat AI</CardTitle>

        <CardDescription>
          Usando a SDK Vercel AI para criar um ChatBot
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="w-full h-[600px] pr-4">
          {messages
            .filter((message) => message.role !== "system")
            .map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex gap-3 mb-4 text-sm font-medium text-slate-600"
                >
                  {message.role === "user" && (
                    <Avatar>
                      <AvatarFallback>RB</AvatarFallback>
                      <AvatarImage src="https://github.com/brocchirodrigo.png" />
                    </Avatar>
                  )}

                  {message.role === "assistant" && (
                    <Avatar>
                      <AvatarFallback>IA</AvatarFallback>
                      <AvatarImage src="" />
                    </Avatar>
                  )}

                  <div className="leading-relaxed">
                    <div className="block font-bold text-slate-700">
                      {message.role === "user" ? "Usuário:" : "IA:"}
                    </div>
                    <div className="prose-sm prose prose-violet">
                      {message.content}
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <Input
            className="rounded-sm"
            placeholder="Como posso te ajudar?"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="rounded-sm" type="submit">
            Enviar
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
