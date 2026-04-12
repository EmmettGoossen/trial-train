'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trialsBase } from "../../data/contactTrialDB";


export function CreateTrial() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="sideBarOption" onClick={() => setShowCreation(true)}>Create Trial</button>
        {showCreation && <Menu setShowCreation={setShowCreation} />}
    </>;

}

interface MenuProps {
    setShowCreation: (value: boolean) => void;
}
export function Menu({ setShowCreation }: MenuProps) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const params = new URLSearchParams();
    return <div style={{ background: "rgba(155,155,155,0.4)", width: "100vw", height: "100vh", position: "fixed" }}>
        <div className="Menu">
            <div>
                <button onClick={() => setShowCreation(false)} className="text-red-500 pr-2">x</button>
            </div>
            <input
                type="text"
                placeholder="Enter New Trial Name..."
                className="text-black"
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}></input>
            <button style={{ position: 'relative', top: '25px' }}
                onClick={() => {
                    updateDB(inputValue);
                    setShowCreation(false);
                    params.set("name", inputValue);
                    router.push(`/Trialpage?${params.toString()}`);
                }}>
                Create Trial
            </button>
        </div>
    </div>;
}

async function updateDB(name: string) {
  const response = await fetch('/api/trial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: name}),
  });
  // Check if the response is actually OK (status 200-299)
  if (!response.ok) {
    const errorText = await response.text(); // Read as text to avoid JSON crash
    console.error("Server Error:", errorText);
    return;
  }

  const result = await response.json();
  return result;
}