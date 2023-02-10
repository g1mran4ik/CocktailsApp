import { Card, Image, Input, Pagination, Radio, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import useFetching from '../../../hooks/useFetching';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../../../constants/debounce';
import CocktailsWrapper from '../CocktailsWrapper/CocktailsWrapper';
import { getAllCocktails } from '../http';
import { APICocktail } from '../interface';
import './AllCocktails.css';

const { Search } = Input;

export default function AllCocktails() {
  const navigate = useNavigate();

  const [cocktails, setCocktails] = useState<APICocktail[]>([]);

  const [fetchAllCocktails] = useFetching({
    fetch: async () => getAllCocktails(),
    afterFetch: (cocktails: APICocktail[]) => {
      setCocktails(cocktails);
      setFilteredCocktails(cocktails);
    },
  });

  const [filteredCocktails, setFilteredCocktails] = useState<APICocktail[]>([]);

  const [filter, setFilter] = useState('all');

  const changeFilter = (value: string) => {
    setFilter(value);
  };

  const filterPost = (filter: string) => {
    const currentCocktails = [...cocktails];
    switch (filter) {
      case 'liked':
        return currentCocktails.sort(
          (a, b) => b.liked - a.liked || a.disliked - b.disliked
        );
      case 'disliked':
        return currentCocktails.sort(
          (a, b) => b.disliked - a.disliked || a.liked - b.liked
        );
      default:
        return cocktails;
    }
  };

  const [searchValue, setSearchValue] = useState('');

  const onSearch = debounce(setSearchValue, 600);

  useEffect(() => {
    setFilteredCocktails(
      filterPost(filter).filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, filter]); // eslint-disable-line

  useEffect(() => {
    fetchAllCocktails();
  }, []); // eslint-disable-line


  useEffect(() => {
    setTotal(filteredCocktails.length);
  }, [filteredCocktails]); // eslint-disable-line

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(15);
  const [prevPageSize, setPrevPageSize] = useState(15);

  const paginateData = (data: any[]) =>
    data.slice(
      0 + (currentPage - 1) * prevPageSize,
      currentPageSize + (currentPage - 1) * currentPageSize
    );

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Liked', value: 'liked' },
    { label: 'Disliked', value: 'disliked' },
  ];

  return (
    <CocktailsWrapper>
      <div className='search-and-pagination-panel'>
        <Search
          placeholder='input search text'
          allowClear
          size='middle'
          style={{
            display: 'block',
            width: '20%',
          }}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Pagination
          total={total}
          showTotal={(total) => `Total ${total} items`}
          defaultPageSize={15}
          defaultCurrent={1}
          current={currentPage}
          onChange={(currentPage, pageSize) => {
            setCurrentPage(currentPage);
            setPrevPageSize(currentPageSize);
            setCurrentPageSize(pageSize);
          }}
          pageSizeOptions={[15, 30, 60, 90]}
          style={{ marginBottom: 10 }}
        />
      </div>
      <Radio.Group
        options={options}
        onChange={(e) => changeFilter(e.target.value)}
        value={filter}
        optionType='button'
      />
      <div className='site-card-wrapper'>
        {paginateData(
          filteredCocktails.map(({ id, name, image, liked, disliked }) => (
            <Card
              key={name}
              onClick={() => navigate(`/cocktails/${id}`)}
              hoverable
              className='custom-card'
              style={{ width: 140, margin: '5px' }}
              cover={
                <Image
                  onClick={(e) => e.stopPropagation()}
                  src={image}
                  width={140}
                  height={140}
                />
              }
            >
              <Meta
                description={
                  <div>
                    <Tooltip title={name} style={{ marginBottom: '20px' }}>
                      <div className='short-description'>{name}</div>
                    </Tooltip>
                    <div
                      className='like-box'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11.5px',
                      }}
                    >
                      <div className='likes'>Likes: {liked}</div>
                      <div className='dislikes'>Dislikes: {disliked}</div>
                    </div>
                  </div>
                }
              />
            </Card>
          ))
        )}
      </div>
    </CocktailsWrapper>
  );
}
