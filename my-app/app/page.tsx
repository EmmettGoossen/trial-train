import { CreateCat } from "./objectComponents/createCatagoryButton";
import { CreateTrial } from "./objectComponents/createTrialButton";
import { TrialListButton } from "./objectComponents/trialListButton";
import { trialsBase } from "@/data/contactTrialDB";

export default function Home() {
  return <>
    <div className="headerBar">
      <div style={{fontSize:"12px", gridColumnStart:10, gridColumnEnd:11, marginLeft:"auto"}}>
        <a target="_blank" href="https://icons8.com/icon/101799/graph">Graph</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
    </div>
    <div id="container">
      <div id="sideBar">
        <CreateTrial />
        <CreateTrial />
        <CreateCat />
        {/*<updateData/>*/}{/*add/update db rows attributes*/}
      </div>
      <div id="trialView"> {/*lists all trials in db*/}
        {trialsBase.getTrials().map((trial: any, i: number) => {
          return <TrialListButton trial={trial} key={i} />
        })}
      </div>
    </div>
  </>;
}
