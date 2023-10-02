"use client";

import { useChat } from "ai/react";
import crypto from "crypto";
import Editor from "./Editor";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        role: "system",
        content: "Todas as respostas devem ser retornadas em uma <div></div>",
        id: crypto.randomBytes(20).toString("hex"),
      },
      // {
      //   role: "assistant",
      //   content: "Olá, me chamo Anna, com quem estou falando?",
      //   id: "system-id",
      // },
    ],
    headers: {
      Accept: "text/html",
    },
  });
  console.log(messages);
  return (
    <Card className="w-[400px] rounded-sm">
      <CardHeader>
        <CardTitle>Test Chat AI</CardTitle>

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
