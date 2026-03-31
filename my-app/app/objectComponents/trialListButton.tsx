'use client';
import { useRouter } from "next/navigation";

export function TrialListButton() {
    const router = useRouter();
    const params = new URLSearchParams();

    return <button className="trial"
        onClick={() => {
            params.set("name", "test");
            router.push(`/Trialpage?${params.toString()}`);
        }}>Test</button>;
}