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
import Editor from "./Editor";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        role: "system",
        content:
          "Neste chat, produziremos apenas termos para uso em sites, aplicativos, plataformas e softwares. Sempre retorne somente o conteúdo solicitado e em HTML. Retorne todo o conteúdo dentro da tag <article></article>.",
        id: "system-id",
      },
    ],
    headers: {
      Accept: "text/html",
    },
  });
  console.log(messages);
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
              const content = message.content;

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
                    <div className="font-bold text-slate-700">
                      {message.role === "user" ? "Usuário:" : "IA:"}
                    </div>

                    <Editor updateContent={content} />
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
