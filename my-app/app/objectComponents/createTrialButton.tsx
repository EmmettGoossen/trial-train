'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";


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
                onClick={() => { //add duplicate & empty name test
                    checkDuplicate(inputValue).then((isDup: any) => {
                        if(inputValue == "" || isDup){
                            return;
                        }
                        updateDB(inputValue);
                        setShowCreation(false);
                        params.set("name", inputValue);
                        router.push(`/Trialpage?${params.toString()}`);
                    });
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
    body: JSON.stringify({name: name, type:"create"}),
  });
  if (!response.ok) {
    const errorText = await response.text(); 
    console.error(errorText);
    return;
  }

  const result = await response.json();
  return result;
}

async function checkDuplicate(name: string) {
    const response = await fetch(`/api/trial/${name}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) {
    const errorText = await response.text(); 
    console.error(errorText);
    return;
  }

  const result = await response.json();
  let arr = result.data;
  for(let inx = 0; inx < arr.length; inx++){
    if(arr[inx].name == name){
        return true;
    }
  }
  return false;
}
