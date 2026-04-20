'use client';
import { useState } from "react";
import { Menu } from "./Menu/menu";


export function CreateCat() {
    const [showCreation, setShowCreation] = useState(false);
    return <>
        <button className="sideBarOption" onClick={() => setShowCreation(true)}>Create Catagory</button>
        {showCreation && <Menu setShowCreation={setShowCreation} MenuLayout={MenuLayout} args={{setShowCreation}}/>}
    </>;

}

interface MenuProps {
    setShowCreation: (value: boolean) => void;

}
function MenuLayout({ setShowCreation }: MenuProps) {
    const [inputName, setInputName] = useState(""); //name hook
    const [inputType, setInputType] = useState(0); //type hook
    const [optionsList, setOptions] = useState<any>([]); //options list hook

    
    return <>
    {/*Name input*/}
    <input id="__input"
            type="text"
            placeholder="Enter New Catagory Name..."
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
        setInputName(e.target.value);
    }}></input>

    {/*Type input*/}
    <select name="data type" 
            defaultValue="1"
            onChange={(e) => {
        let opt = document.getElementById("__options");

        setInputType(Number(e.target.value));

        if(Number(e.target.value) == 1){
            if(opt){
                setOptions([]);
                opt.style.display ="none";
            }
            return;
        }
        
        if(opt){
            opt.style.display ="inline";
        }
    }}>
        <option value="1">quantitative</option>
        <option value="2">qualitative</option>
    </select>

    {/*options editor*/}
    <div id="__options" style={{display:"none"}}>
        <label htmlFor="addOption" >Add Options</label>
        <div style={{display: "flex", flexDirection:"row", height:"25px", width:"130%"}}>
            <input id="__newOpVal" name="addOption" style={{width:"65%"}} placeholder="Enter Value..."></input>
            <button style={{width:"15%"}} onClick={() =>{
                let val = document.getElementById("__newOpVal") as HTMLInputElement;

                if(val){
                    setOptions([...optionsList, val.value]);
                }
            }}>Add</button>
        </div>
        <ul style={{overflowY:"scroll", maxHeight:"75px"}}>
            {optionsList.map((name: string, inx: number) => {
                return <div key={inx} style={{display: "flex", flexDirection:"row"}}>
                            <li style={{marginRight:"auto"}}>{name}</li>
                            <button onClick={(e) => {
                                setOptions(optionsList.toSpliced(Number(inx), 1));}} className="text-red-500 pr-2">x</button>
                       </div>
            })}
        </ul>
    </div>

    {/*sumbit*/}
    <p id="__hidden" style={{display: "none", color: "rgb(150, 30, 30)", fontSize:'10px'}}>Catagory already exists or is blank</p>
        <button style={{ marginLeft:"175px", marginTop:"15px" }}
            onClick={() => {
                /*checkValid(inputName).then((isDup: any) => {
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
                    //updateDB(inputName);
                    setShowCreation(false);
                });*/
            }}>
            Create Catagory
        </button>
    </>
}

async function updateDB(name: string, type: number, options: any[]) {
  const response = await fetch('/api/catagory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: name, type: type, options: options}),
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
    const response = await fetch(`/api/catagory/${name}`, {
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

