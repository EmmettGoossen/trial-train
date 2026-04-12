import { trialsBase } from "@/data/contactTrialDB";

export async function POST(request: Request) {
    const body = await request.json();

    trialsBase.createTrial(body.name);

    //respond "success"
    return Response.json({ message: 'Success', data: body }, { status: 200 });
}