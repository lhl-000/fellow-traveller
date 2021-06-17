// const cities = [{label: 'Bristol', value: '00001'},
//                 {label: 'London', value: '00002'}];
// const citiesLoading = false;
// const nations=[{label: 'UK', value: '001'},
//               {label: 'CN', value: '002'}];
// const nationsLoading = false;

const district = [
        
    {label: 'UK', value: '10000', children: [
        {label: 'Bristol', value: '10001'},
        {label: 'London', value: '10002'}
    ]},
    {label: 'CN', value: '00000' ,children: [
        {label: 'Beijing', value: '00001'},
        {label: 'Shanghai', value: '00002'}
    ]}

];

const districtLoading = false;

// const groups = [
// {
//     title: "To bristol in September",
//     info: ["Bristol", "September", "UK"],
//     mumbers: 1000
// },
// {
//     title: "To bristol in July",
//     info: ["London", "July", "UK"],
//     mumbers: 780
// }];

export {district, districtLoading};