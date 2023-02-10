import { Card, Carousel, Image, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetching from '../../../../hooks/useFetching';
import { getTop8Cocktails } from '../../http';
import { APICocktail } from '../../interface';
import './CarouselCocktails.css';

export const CarouselCocktails = () => {
  const navigate = useNavigate();

  const [topCocktailsList, setTopCocktailsList] = useState<APICocktail[]>([]);

  const [fetchTop8Cocktails] = useFetching({
    fetch: async () => getTop8Cocktails(),
    afterFetch: (top8cocktails: APICocktail[]) => {
      setTopCocktailsList(top8cocktails);
    },
  });

  useEffect(() => {
    fetchTop8Cocktails();
  }, []); // eslint-disable-line

  return (
    <Carousel dots={{ className: 'dots' }} className='cocktail-carousel'>
      {topCocktailsList.map(({ id, name, image, liked, disliked }) => (
        <Card
          key={name}
          onClick={() => navigate(`/cocktails/${id}`)}
          hoverable
          className='custom-card'
          cover={
            <Image
              onClick={(e) => e.stopPropagation()}
              src={image}
              width={300}
              height={300}
            />
          }
        >
          <Meta
            description={
              <div>
                <Tooltip title={name} style={{ marginBottom: '20px' }}>
                  <div className='description'>{name}</div>
                </Tooltip>
                <div
                  className='like-box'
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div className='likes'>Likes: {liked}</div>
                  <div className='dislikes'>Dislikes: {disliked}</div>
                </div>
              </div>
            }
          />
        </Card>
      ))}
    </Carousel>
  );
};
