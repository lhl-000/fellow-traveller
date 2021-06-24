import fetchMock from 'fetch-mock';

const meg = [
    {
        id: 1,
        name: "Jack",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'Bristol',
        startTime: "2021-9-1",
        endTime: '2021-9-22',
        profilePicture: '',
        vehicle: 'Train',
        number: 'G1024',
        selfIntroduction: 'My name is Jack , I will go to Bristol in September.',
        isOnline: true,
        makePublic: true,
    },
    {
        id: 2,
        name: "Alice",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'London',
        startTime: "2021-7-15",
        endTime: '2021-8-20',
        profilePicture: '',
        vehicle: 'Flight',
        number: 'AK123',
        selfIntroduction: 'I need a fellow traveler, feel free to contact me.',
        isOnline: false,
        makePublic: true,
    },
    {
        id: 3,
        name: "Jack",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'Bristol',
        startTime: "2021-9-1",
        endTime: '2021-9-22',
        profilePicture: '',
        vehicle: 'Train',
        number: 'G1024',
        selfIntroduction: 'My name is Jack , I will go to Bristol in September.',
        isOnline: true,
        makePublic: true,
    },
    {
        id: 4,
        name: "Alice",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'London',
        startTime: "2021-7-15",
        endTime: '2021-8-20',
        profilePicture: '',
        vehicle: 'Flight',
        number: 'AK123',
        selfIntroduction: 'I need a fellow traveler, feel free to contact me.',
        isOnline: false,
        makePublic: true,
    },
    {
        id: 5,
        name: "Jack",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'Bristol',
        startTime: "2021-9-1",
        endTime: '2021-9-22',
        profilePicture: '',
        vehicle: 'Train',
        number: 'G1024',
        selfIntroduction: 'My name is Jack , I will go to Bristol in September.',
        isOnline: true,
        makePublic: true,
    },
    {
        id: 6,
        name: "Alice",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'London',
        startTime: "2021-7-15",
        endTime: '2021-8-20',
        profilePicture: '',
        vehicle: 'Flight',
        number: 'AK123',
        selfIntroduction: 'I need a fellow traveler, feel free to contact me.',
        isOnline: false,
        makePublic: true,
    },
    {
        id: 7,
        name: "Jack",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'Bristol',
        startTime: "2021-9-1",
        endTime: '2021-9-22',
        profilePicture: '',
        vehicle: 'Train',
        number: 'G1024',
        selfIntroduction: 'My name is Jack , I will go to Bristol in September.',
        isOnline: true,
        makePublic: true,
    },
    {
        id: 8,
        name: "Alice",
        startNation: 'CN',
        startCity: 'ShangHai',
        destinationNation: 'UK',
        destinationCity: 'London',
        startTime: "2021-7-15",
        endTime: '2021-8-20',
        profilePicture: '',
        vehicle: 'Flight',
        number: 'AK123',
        selfIntroduction: 'I need a fellow traveler, feel free to contact me.',
        isOnline: false,
        makePublic: true,
    },
  ]

fetchMock.mock('/api/people/search', function (url, req) {
    return {
        status:200,
        data: meg
    }
  }, {
    delay: 1000,
  })