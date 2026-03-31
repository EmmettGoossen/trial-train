import { TestButton } from "../test_button/testButton";
import { Catagory } from "../objectComponents/catagory";
import { FilterFactory } from "./Filter_Select/FilterMan";

export default function trialEditor() {
    return <>
        <div className="headerBar"> {/* create Catagory: creates new catagory object
                                      * search trials: search trial db by name
                                      * homepage: takes user to homepage
                                      * visualize data: graphs data by trial variables
                                    */}
            <TestButton />

        </div>
        <div id="body">
            <div id="catagorySelect"> {/*lists available catagories*/}
                {[...Array(5).keys()].map((dummy: number, i: number) => {
                    return <Catagory key={i} />
                })}
            </div>
            <FilterFactory /> {/*in-takes catagory, updates trial filters*/}
            <div id="righthand">
                <div id="graphVars"> {/*in-takes a catagory, updates trial variables to be graphed*/}
                    <TestButton />
                </div>
                <div id="dataList"> {/*displayed filtered data rows and accepted data*/}
                    <TestButton />
                </div>
            </div>
        </div>
    </>;
}