import { ApiResponse } from "@/types/apiTypes";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchPRs(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE}/api/prs`);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

export async function clearCache(): Promise<void> {
    const response = await fetch(`${API_BASE}/api/cache`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to clear cache: ${response.status}`);
    }
}