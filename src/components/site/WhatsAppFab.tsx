import { MessageCircle } from "lucide-react";
import { presetLink } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={presetLink("general")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-espresso p-4 text-ivory shadow-[0_18px_40px_-18px_rgba(43,30,24,0.9)] transition-transform duration-300 hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
