
import { Card, Image, Input, Pagination, Radio, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import useFetching from '../../../hooks/useFetching';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../../../constants/debounce';
import CocktailsWrapper from '../CocktailsWrapper/CocktailsWrapper';
import { getAllCocktails, getUserCocktails } from '../http';
import { UserAPICocktail } from '../interface';
import './FavouriteCocktails.css';

const { Search } = Input;

export default function FavouriteCocktails() {
  const navigate = useNavigate();

  const [cocktails, setCocktails] = useState<UserAPICocktail[]>([]);

  const [fetchAllCocktails] = useFetching({
    fetch: async () => getUserCocktails(),
    afterFetch: (cocktails: UserAPICocktail[]) => {
      setCocktails(cocktails);
      setFilteredCocktails(cocktails);
    },
  });

  const [filteredCocktails, setFilteredCocktails] = useState<UserAPICocktail[]>([]);

  
  const [searchValue, setSearchValue] = useState('');

  const onSearch = debounce(setSearchValue, 600);

  useEffect(() => {
    setFilteredCocktails(
      cocktails.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]); // eslint-disable-line

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
      <div className='site-card-wrapper'>
        {paginateData(
          filteredCocktails.map(({ id, name, image}) => (
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
