import fetchMock from 'fetch-mock';

fetchMock.mock('/api/people/detail', function () {
  return {
    status: 200,
    data: 
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
      }
    
    }
});

fetchMock.mock('/api/comments/lists', function () {
    return {
      status: 200,
      data: [
        {
            id: 1,
            avatar: 'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
            username: 'Jack',
            createTime: 1595238771000,
            info: 'repaly to me'
          },
          {
            id: 2,
            avatar: 'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',
            username: 'Sam',
            createTime: 1595238771000,
            info: 'Nice to see you'
          },
          {
            id: 3,
            avatar: 'http://img2.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
            username: 'Tim',
            createTime: 1595238771000,
            info: 'see you next week'
          },
          {
            id: 4,
            avatar: 'http://img1.mukewang.com/szimg/5a1f65a900015d1505400300-360-202.jpg',
            username: 'Alice',
            createTime: 1595238771000,
            info: 'very nice persion'
          },
      ]
    }
  })

  fetchMock.mock('/api/comments/add', function () {
    return {
      status: 200,
      data: 'OK'
    }
  });