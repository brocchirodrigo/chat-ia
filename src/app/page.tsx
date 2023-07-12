import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <main className="flex items-center justify-center ">
      <div className="flex items-center justify-center w-full min-h-screen bg-slate-50">
        <Chat />
      </div>
    </main>
  );
}
