import { ReactElement } from "react";


interface MenuProps {
    setShowCreation: (value: boolean) => void;
    MenuLayout: (...args: any[]) => ReactElement;
    args: object;
}
/**
 * Creates a basic popup menu
 * - use `document.getElementById("__box")` for box style
 * @param setShowCreation - setter for a boolean useState next hook
 * @param MenuLayout - the component for the internal menu layout
 * @param args - the parameters for the `MenuLayout` component
 */
export function Menu({ setShowCreation, MenuLayout, args }: MenuProps) { 
    return <div style={{ background: "rgba(155,155,155,0.4)", width: "100vw", height: "100vh", position: "fixed" }}>
        <div style={{ position: "absolute", 
                      insetInlineStart: "25%", 
                      insetBlockStart: "25%", 
                      minHeight: "100px", 
                      padding: "15px", 
                      background: "var(--background2)",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection:"column",
                      flexWrap: "wrap"}}
             id="__box"> 
            <div> {/*edit style with document.getElementById("__box")*/}
                <button onClick={() => setShowCreation(false)} className="text-red-500 pr-2">x</button>
            </div>
            <MenuLayout {...args}/>
        </div>
    </div>;
}
