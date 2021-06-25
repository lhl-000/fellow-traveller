import fetchMock from 'fetch-mock';

fetchMock.mock('/api/user/detail', function () {
    return {
      status: 200,
      data: 
        {
          id: 1,
          name: "Jack",
          startNation: '00000',
          startCity: '00001',
          destinationNation: '10000',
          destinationCity: '10001',
          startTime: "2021-9-1",
          endTime: '2021-9-22',
          profilePicture: '',
          vehicle: '1',
          meg: 'My name is Jack , I will go to Bristol in September.',
          isOnline: true,
          makePublic: true,
        },
    }
  }, {
    delay: 1000,
  })

  fetchMock.mock('/api/user/edit', function(url, res) {
      console.log(res);
    return ({
        status: 200,
        data: 'OK'
    })
  })

  fetchMock.mock('api/user/login', function() {
    return ({
      status: 200,
      data:  {
        id: 0,
        username: 'admin'
      }
    })
  })

  fetchMock.mock('api/user/register', function(url, res) {
    console.log(url, res);
    return ({
      status: 200,
      data:  {
        id: 0,
        username: 'admin'
      }
    })
  }, {
    delay: 1000,
  })