"use client";
import { useState, useRef } from "react"
import { Filter } from "@/app/objectComponents/filter";

export function FilterFactory() {
    const arr = [...Array(5).keys()];
    const [appliedFilters, setAppliedFilters] = useState<Array<number>>([]);
    return <div id="filterBuild"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
            const data = JSON.parse(e.dataTransfer.getData("filter"));
        }}>
        {
            (arr.length == 0) ?
                (() => { return <p>drag a catagory over to start...</p> })() :
                [...Array(5).keys()].map((dummy: number, i: number) => {
                    return <Filter key={i} />
                })
        }
    </div>;
}