'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "./Menu/menu";

export function CreateTrial() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="sideBarOption" onClick={() => setShowCreation(true)}>Create Trial</button>
        {showCreation && <Menu setShowCreation={setShowCreation} MenuLayout={MenuLayout} args={{setShowCreation}}/>}
    </>;

}

interface MenuProps {
    setShowCreation: (value: boolean) => void;

}
function MenuLayout({ setShowCreation }: MenuProps) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState("");
    const params = new URLSearchParams();
    
    return <>
    <input id="__input"
            type="text"
            placeholder="Enter New Trial Name..."
            className="text-black"
            onChange={(e) => {
        let text = document.getElementById("__input");
        if(text){
            text.style.color = "black";
        }
        let hidden = document.getElementById("__hidden");
        if(hidden){
            hidden.style.display = "none";
        }
        setInputValue(e.target.value);
    }}></input>
    <p id="__hidden" style={{display: "none", color: "rgb(150, 30, 30)", fontSize:'10px'}}>Trial already exists or is blank</p>
        <button style={{ paddingLeft:"175px", paddingTop:"15px" }}
            onClick={() => {
                checkValid(inputValue).then((isDup: any) => {
                    if(isDup){
                        let text = document.getElementById("__input");
                        if(text){
                            text.style.color = "rgb(150, 30, 30)";
                        }
                        let hidden  = document.getElementById("__hidden");
                        if(hidden){
                            hidden.style.display = "inline";
                        }
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
    </>
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

async function checkValid(name: string) {
    if(name == ""){
       return false; 
    }
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
