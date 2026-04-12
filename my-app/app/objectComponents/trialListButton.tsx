'use client';
import { useRouter } from "next/navigation";

interface trialProp {
    trial: any
}

export function TrialListButton({ trial }: trialProp) {
    const router = useRouter();
    const params = new URLSearchParams();

    return <button className="trial"
        onClick={() => {
            params.set("name", trial.name);
            router.push(`/Trialpage?${params.toString()}`);
        }}>{trial.name}</button>;
}