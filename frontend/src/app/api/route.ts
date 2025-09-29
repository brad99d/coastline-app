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
    } catch (error: unknown) {
        return NextResponse.json(
            {
                error: (error instanceof Error) ? error.message : "Something went wrong"
            },
            {
                status: 500
            }
        );
    }
}