import { Tag } from "antd";
import { CocktailIngredient } from "../../pages/Cocktails/interface";

interface PairTagsProps {
  ingredients: CocktailIngredient[];
}

export const PairTags = ({ ingredients }: PairTagsProps) => (
  <>
    {ingredients?.map(({ measure, ingredient: { name } }) => (
      <div key={name}>
        <Tag color="rgb(22, 119, 255)">{measure}</Tag>
        {name && <Tag color="blue">{name}</Tag>}
      </div>
    ))}
  </>
);
