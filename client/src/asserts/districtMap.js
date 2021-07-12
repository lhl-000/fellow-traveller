import { district } from "./district";
export const districtMap = new Map();
district.forEach(item => {
    districtMap.set(item.value,item.label)
    item.children.forEach(item => {
        districtMap.set(item.value,item.label)
    })
})
