import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useChangeQuery from '../../../../../shared/hooks/useChangeQuery';
import Select from '../../../components/Select';
import Search from '../../../components/Search';
import { setComics } from '../../../actions/comics';
import { setComicPagination } from '../../../actions/comicPagination';
import { getClientDocuments } from '../../../../../services/api/clientDocument';

import { getLanguage } from './lang';

const categories = [
  'All',
  'Comedy',
  'Action',
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'Sports',
  'Slice of Life'
];
const filters = ['Popular Now', 'Most Viewed', 'Most Liked', 'Oldest', 'Newest'];
const pageSize = 2;

const Filters = () => {
  const dispatch = useDispatch();
  const project = useSelector(store => store.project);
  const pagination = useSelector(store => store.comicPagination);
  const language = getLanguage(useSelector(store => store.language));
  const [category, setCategory] = useState(categories[0]);
  const [sortBy, setSortBy] = useState(filters[0]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const pageNumber = pagination?.pageNumber || 1;
    if (!project) return;
    const categoryFilter = category === 'All' ? {} : { category };
    getClientDocuments('comic', project, pageSize, pageNumber, categoryFilter).then(({ data: comics }) => {
      dispatch(setComics(comics));
    });
    getClientDocuments('comic', project, pageSize, pageNumber, categoryFilter, '', [], true).then(
      ({ data }) => {
        dispatch(setComicPagination({ count: data.count, pageSize, maxPages: 2, pageNumber }));
      }
    );
  }, [project, category, sortBy, search, pagination?.pageNumber]);

  return (
    <>
      <div className="mobileSearchBar">
        <Search
          placeholder={language.searchByTags}
          style={{ flex: 5, margin: '26px 0 0 7px' }}
          onChange={newSearch => setSearch(newSearch)}
          updateAfter={500}
        />
      </div>
      <div className="filters">
        <Select
          title={language.categories}
          options={categories}
          selectedOption={category}
          onOptionChanged={newCategory => setCategory(newCategory)}
        />
        <Select
          title={language.filter}
          options={filters}
          selectedOption={sortBy}
          onOptionChanged={newSortBy => setSortBy(newSortBy)}
          style={{ marginLeft: 7 }}
        />
        <div className="searchBar">
          <Search
            placeholder={language.searchByTags}
            style={{ flex: 5, margin: '26px 0 0 7px' }}
            onChange={newSearch => setSearch(newSearch)}
            updateAfter={500}
          />
        </div>
      </div>
      <style jsx>
        {`
          .filters {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .searchBar {
            flex: 5;
          }
          .mobileSearchBar {
            display: none;
          }
          @media only screen and (max-width: 768px) {
            .searchBar {
              display: none;
            }
            .mobileSearchBar {
              display: block;
            }
          }
        `}
      </style>
    </>
  );
};

export default Filters;
