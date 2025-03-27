import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://jsonplaceholder.typicode.com/photos?_page=1";
  const response = await fetch(url);
  const teams: { id: number, title: string, thumbnailUrl: string }[] = await response.json();
  return NextResponse.json(teams.map((team) => ({
    slug: `${team.id}`,
    name: team.title.split(" ")[0],
    icon: team.thumbnailUrl,
    createdAt: new Date().toISOString(),
  })));
}
