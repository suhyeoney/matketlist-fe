'use client'

interface ReviewType {
  id: number,
  author: string,
  content: string,
};

interface ReviewCardsProps {
  data: ReviewType[],
};

const ReviewCards: React.FC<ReviewCardsProps> = ({ data }) => {
  return (
    <></>
  );
}; 

export default ReviewCards;