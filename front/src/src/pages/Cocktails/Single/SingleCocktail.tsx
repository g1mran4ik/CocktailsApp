import { Card, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PairTags } from '../../../components/PairTags/PairTags';
import { Spinner } from '../../../components/Spinner/Spinner';
import { _transformRandomDrink } from '../../../constants/heplers';
import useFetching from '../../../hooks/useFetching';
import CocktailsWrapper from '../CocktailsWrapper/CocktailsWrapper';
import { getCocktailById } from '../http';
import { DjangoAPICocktail, DjangoAPICocktailPOST, NormalizeAPICocktail, OuterAPICocktail } from '../interface';
import './SingleCocktail.css';

export default function SingleCocktail() {
  const [
    { name, image, category, alcoholic, instruction, ingredients },
    setCocktail,
  ] = useState<DjangoAPICocktail>({} as DjangoAPICocktail);

  const { id } = useParams();

  const [fetchCocktailById, loading] = useFetching({
    fetch: async () => await getCocktailById(id!),
    afterFetch: (data: DjangoAPICocktail) => {
      setCocktail(data);
    },
  });

  useEffect(() => {
    fetchCocktailById();
  }, [id]); //eslint-disable-line

  return (
    <CocktailsWrapper>
      <div className='singlecocktail'>
        <Card
          loading={loading}
          hoverable
          cover={
            loading ? <Spinner /> : <Image src={image} width={400} height={400} />
          }
        >
          <Meta
            title={name}
            description={
              <div className="description-container">
                <div className='description'>
                  <div>{category}</div>
                  <div>{alcoholic}</div>
                </div>
                <div className='instruction'>{instruction}</div>
                <div className='ingredients'>
                  <PairTags ingredients={ingredients}/>
                </div>
              </div>
            }
          />
        </Card>
      </div>
    </CocktailsWrapper>
  );
}
