import fetchMock from 'fetch-mock';

fetchMock.mock('/api/people/hot', function () {
  return {
    status: 200,
    data: [
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
        meg: 'My name is Jack , I will go to Bristol in September.',
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
        meg: 'I need a fellow traveler, feel free to contact me.',
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
        meg: 'My name is Jack , I will go to Bristol in September.',
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
        meg: 'I need a fellow traveler, feel free to contact me.',
        isOnline: false,
        makePublic: true,
      },
    ]
  }
}, {
  delay: 1000,
})

fetchMock.mock('/api/commons/nations', function () {
  return {
    status: 200,
    data: [
      {
        label: 'UK', value: '10000', children: [
          { label: 'Bristol', value: '10001' },
          { label: 'London', value: '10002' }
        ]
      },
      {
        label: 'CN', value: '00000', children: [
          { label: 'Beijing', value: '00001' },
          { label: 'Shanghai', value: '00002' }
        ]
      }
    ]
  }
}, {
  delay: 1000,
})