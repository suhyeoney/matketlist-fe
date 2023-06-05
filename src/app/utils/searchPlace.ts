import MainService from '../services/main.service';

const SearchPlace = ({ query }: { query: string }) => {

  const params = {
    query: query,
    display: 10,
    start: 1,
    sort: 'random'
  };

  MainService.getLocalSearch(params);


};

export default SearchPlace;