import { fetchFromApi } from "@/lib/fetchFromApi";

export async function GET(request: Request) {
    return fetchFromApi(request, "temperature/");
}