import fetchMock from 'fetch-mock';
import { meg } from './search';

fetchMock.mock('api/match/lists', function(url ,req) {
    return  {
        status: 200,
        data: meg
        }
}, {
    delay: 500,
  })