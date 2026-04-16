import { trialsBase } from "@/data/contactTrialDB";


export async function GET(request: Request, { params }: any) {
    let {name} = await params;
    let arr = trialsBase.getTrials(String(name));

    return Response.json({ message: "success", data: arr }, { status: 201 });
}