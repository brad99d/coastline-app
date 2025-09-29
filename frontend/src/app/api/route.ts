// @/app/api/route.ts

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(`${process.env.API_URL}`, {
            headers: { "Accept": "application/json" }
        });
        const data = await response.json();
        console.log("Response", data);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}