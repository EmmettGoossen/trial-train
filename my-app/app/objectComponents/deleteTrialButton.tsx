'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";


export function DeleteTrial() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="deleteTrial" onClick={() => setShowCreation(true)}>Delete Trial</button>
        {showCreation && <Menu setShowCreation={setShowCreation} />}
    </>;

}

interface MenuProps {
    setShowCreation: (value: boolean) => void;
}
export function Menu({ setShowCreation }: MenuProps) {
    const router = useRouter();
    const params = new URLSearchParams(document.location.search);

    return <div style={{ background: "rgba(155,155,155,0.4)", width: "100vw", height: "100vh", position: "fixed" }}>
        <div style={{ position: "absolute", 
                      insetInlineStart: "25%", 
                      insetBlockStart: "25%", 
                      height: "100px", 
                      padding: "15px", 
                      background: "var(--background2)",
                      borderRadius: "5px" }}>
            <div>
                <button onClick={() => setShowCreation(false)} className="text-red-500 pr-2">x</button>
            </div>
            <p>Warning! this is irreversible...</p>
            <button style={{ position: 'relative', top: '5px', left: '70%' }}
                onClick={() => {
                    let name = String(params.get("name"));
                    updateDB(name);
                    setShowCreation(false);
                    router.push('/');
                }}>
                I'm sure!
            </button>
        </div>
    </div>;
}

async function updateDB(name: string) {
  const response = await fetch('/api/trial', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: name, type:"delete"}),
  });
  if (!response.ok) {
    const errorText = await response.text(); 
    console.error("Server Error:", errorText);
    return;
  }

  const result = await response.json();
  return result;
}