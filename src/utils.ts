export async function AsyncAction<T>(loaddingCallback:(e:boolean)=>void, asyncAction: ()=>Promise<T>){
    loaddingCallback(true);
    await asyncAction();
    loaddingCallback(false);
}