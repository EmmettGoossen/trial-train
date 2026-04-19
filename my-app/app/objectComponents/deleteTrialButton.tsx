'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "./Menu/menu";


export function DeleteTrial() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="deleteTrial" onClick={() => setShowCreation(true)}>Delete Trial</button>
        {showCreation && <Menu setShowCreation={setShowCreation} MenuLayout={MenuLayout} args={{setShowCreation}} />}
    </>;

}

interface MenuProps {
    setShowCreation: (value: boolean) => void;
}
function MenuLayout({ setShowCreation }: MenuProps) {
    const router = useRouter();
    const params = new URLSearchParams(document.location.search);

    return <>
            <p>Warning! this is irreversible...</p>
            <button style={{ paddingLeft:"175px", paddingTop:"15px" }}
                onClick={() => {
                    let name = String(params.get("name"));
                    updateDB(name);
                    setShowCreation(false);
                    router.push('/');
                }}>
                I'm sure!
            </button>
        </>;
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