import { CreateTrial } from "./objectComponents/createTrialButton";
import { TrialListButton } from "./objectComponents/trialListButton";
import { trialsBase } from "@/data/contactTrialDB";

export default function Home() {
  return <>
    <div className="headerBar"></div>
    <div id="container">
      <div id="sideBar">
        <CreateTrial />
        <CreateTrial />
        <CreateTrial />
        {/*<updateData/>*/}{/*add/update db rows attributes, possible change to api*/}
        {/*<updateCatagories/>*/}{/*add/update db rows in catagories, possible change to api*/}
      </div>
      <div id="trialView"> {/*lists all trials in db*/}
        {trialsBase.getTrials().map((trial: any, i: number) => {
          return <TrialListButton trial={trial} key={i} />
        })}
      </div>
    </div>
  </>;
}
