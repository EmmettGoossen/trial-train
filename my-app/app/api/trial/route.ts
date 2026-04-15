import { trialsBase } from "@/data/contactTrialDB";
import { report } from "process";

export async function POST(request: Request) {
    const body = await request.json();
    let res = 'Success. ' + body.type + "d " + "trial: " + body.name;;

    switch(body.type){
        case "create":
            trialsBase.createTrial(body.name);
            break;
        case "delete":
            trialsBase.deleteTrial(body.name);
            break;
        default:
            return Response.json({ message: 'Err: unknown action request', data: body }, { status: 501 });
    }

    //respond "success"
    return Response.json({ message: res, data: body }, { status: 201 });
}