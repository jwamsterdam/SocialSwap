import type { ActivityDefinition } from "@/lib/types";

export const activities: ActivityDefinition[] = [
  {
    id: "stretch-2",
    title: "Rek je uit",
    description: "Sta op en rek je lekker uit. Armen omhoog, rug recht.",
    emoji: "🙆",
    durationMinutes: 2,
    category: "movement",
    pointValue: 10,
  },
  {
    id: "breathing-2",
    title: "Adem in, adem uit",
    description: "Sluit je ogen en adem diep in door je neus, langzaam uit.",
    emoji: "🌬️",
    durationMinutes: 2,
    category: "breath",
    pointValue: 10,
  },
  {
    id: "water-2",
    title: "Drink een glas water",
    description: "Pak een glas water en drink het rustig op.",
    emoji: "💧",
    durationMinutes: 2,
    category: "sensory",
    pointValue: 10,
  },
  {
    id: "drawing-5",
    title: "Teken iets",
    description: "Pak pen en papier en teken wat je maar wilt. Geen regels.",
    emoji: "✏️",
    durationMinutes: 5,
    category: "creative",
    pointValue: 25,
  },
  {
    id: "walk-5",
    title: "Korte wandeling",
    description: "Stap naar buiten en loop een blokje om. Frisse lucht!",
    emoji: "🚶",
    durationMinutes: 5,
    category: "movement",
    pointValue: 30,
  },
  {
    id: "box-breathing-5",
    title: "Box breathing",
    description: "4 tellen in, 4 houden, 4 uit, 4 houden. Herhaal.",
    emoji: "📦",
    durationMinutes: 5,
    category: "breath",
    pointValue: 25,
  },
  {
    id: "text-friend-5",
    title: "App een vriend",
    description: "Stuur iemand een berichtje. Niet via social media.",
    emoji: "💬",
    durationMinutes: 5,
    category: "social",
    pointValue: 25,
  },
  {
    id: "journal-10",
    title: "Schrijf in je dagboek",
    description: "Schrijf drie dingen op die je vandaag hebt meegemaakt.",
    emoji: "📓",
    durationMinutes: 10,
    category: "creative",
    pointValue: 50,
  },
  {
    id: "outside-10",
    title: "Naar buiten",
    description: "Ga naar buiten en zit of loop. Laat je telefoon even thuis.",
    emoji: "🌳",
    durationMinutes: 10,
    category: "movement",
    pointValue: 50,
  },
  {
    id: "dance-10",
    title: "Dansen!",
    description: "Zet je favoriete nummer aan en dans alsof niemand kijkt.",
    emoji: "🕺",
    durationMinutes: 10,
    category: "movement",
    pointValue: 50,
  },
];

export function getActivityById(id: string): ActivityDefinition | undefined {
  return activities.find((a) => a.id === id);
}

export function getActivitiesByDuration(
  durationMinutes: number
): ActivityDefinition[] {
  return activities.filter((a) => a.durationMinutes === durationMinutes);
}
