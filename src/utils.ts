import { TravelTypeOption, travelTypesOptions } from "./components/forms/travelTypes";

export async function AsyncAction<T>(loaddingCallback:(e:boolean)=>void, asyncAction: ()=>Promise<T>){
    loaddingCallback(true);
    await asyncAction();
    loaddingCallback(false);
}

export function findLabelByValue(value: string): TravelTypeOption | null {
    const option = travelTypesOptions.find(option => option.value === value);
    return option ? option: null;
}


export const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};