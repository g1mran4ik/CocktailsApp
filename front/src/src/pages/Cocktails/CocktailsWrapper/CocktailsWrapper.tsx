import RightSidePanel from './RightSidePanel';
import './CocktailsWrapper.css';

export default function CocktailsWrapper({ children }: any) {
  return (
    <div className='page-box'>
      <div className='cards-and-pagination-box'>
        {children}
      </div>
      <RightSidePanel />
    </div>
  );
}
