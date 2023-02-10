import { DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";
import { Button, Card, Image, Space, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Spinner/Spinner";
import { _transformRandomDrink } from "../../constants/heplers";
import useFetching from "../../hooks/useFetching";
import useLoggedIn from "../../hooks/useLoggedIn";
import CocktailsWrapper from "../Cocktails/CocktailsWrapper/CocktailsWrapper";
import {
  getRandomCocktails,
  postDislike,
  postLike,
  postLikeData,
} from "../Cocktails/http";
import {
  DjangoAPICocktail,
  DjangoAPICocktailPOST,
  OuterAPICocktail,
} from "../Cocktails/interface";
import "./Main.css";

const { Meta } = Card;

export default function Main() {
  const navigate = useNavigate();
  const { loggedIn } = useLoggedIn();

  const [{ id, name, image, category, alcoholic }, setCocktail] =
    useState<DjangoAPICocktail>({} as DjangoAPICocktail);

  const [fetchRandomCocktail, loading] = useFetching({
    fetch: async () => getRandomCocktails(),
    afterFetch: (drinks: OuterAPICocktail) => {
      const transformedDrink = _transformRandomDrink(drinks);
      fetchDataPOST(transformedDrink);
    },
  });

  const [fetchDataPOST, loadingCocktailPOST, errorCocktailPOST] = useFetching({
    fetch: async (data: DjangoAPICocktailPOST) => await postLikeData(data),
    afterFetch: (data: DjangoAPICocktail) => setCocktail(data),
  });

  const [fetchLikePOST] = useFetching({
    fetch: async (data: { cocktail_id: number }) => await postLike(data),
    afterFetch: (data) => fetchRandomCocktail(),
  });

  const [fetchDislikePOST] = useFetching({
    fetch: async (data: { cocktail_id: number }) => await postDislike(data),
    afterFetch: (data) => fetchRandomCocktail(),
  });

  useEffect(() => {
    fetchRandomCocktail();
  }, []); // eslint-disable-line

  useEffect(() => {
    errorCocktailPOST && fetchRandomCocktail();
  }, [errorCocktailPOST]);

  return (
    <CocktailsWrapper>
      <div className="main-page-random-cocktail-block">
        <div className="text-button-rating-block">
          <div className="generate-cocktail-text">
            <h1>
              Here you can generate an idea to get one of this drinks for your
              weekend!
            </h1>
            <br />
          </div>
          <Button
            className="generate-button"
            onClick={fetchRandomCocktail}
            // style={{ marginLeft: 200, width: 150, height: 50 }}
          >
            <div className="inner">Generate again</div>
          </Button>
          <div className="like-phrase">Do you like this?</div>
          <br />
          <div className="rating-block">
            <Tooltip title={!loggedIn ? "You must log in to rate" : ""}>
              <Space>
                <Button
                  type="default"
                  disabled={!loggedIn}
                  icon={<LikeTwoTone />}
                  onClick={() => {
                    fetchLikePOST({ cocktail_id: parseInt(id) });
                  }}
                />
                <Button
                  type="default"
                  disabled={!loggedIn}
                  icon={<DislikeTwoTone />}
                  onClick={() => {
                    fetchDislikePOST({ cocktail_id: parseInt(id) });
                  }}
                />
              </Space>
            </Tooltip>
          </div>
        </div>
        <div className="randomcocktail">
          <Card
            loading={loading || loadingCocktailPOST}
            onClick={() => navigate(`/cocktails/${id}`)}
            hoverable
            style={{ width: 400 }}
            cover={
              loading || loadingCocktailPOST ? (
                <Spinner />
              ) : (
                <Image
                  onClick={(e) => e.stopPropagation()}
                  src={image}
                  width={400}
                  height={400}
                />
              )
            }
          >
            <Meta
              title={name}
              description={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{category}</div>
                  <div>{alcoholic}</div>
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </CocktailsWrapper>
  );
}
