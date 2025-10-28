import Pocketbase from "pocketbase";
const pb = new Pocketbase('http://127.0.0.1:8090');

//get the list of every work (id and title)
export async function getWorkList() {
    let workList = await pb.collection("WorkList").getFullList();
    return workList;
}

export async function getWork(id) {
    let work = await pb.collection("Work").getOne(id);
    work.ImageJSON = work.Image.map((d, index) => ({
        ImageURL : pb.files.getURL(work, work.Image[index]),
        ImageDesc : work.Desc[index]
    }))
    return work;
}