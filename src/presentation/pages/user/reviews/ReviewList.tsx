import React, { useEffect, useState } from 'react';
import { List, Card, Rate } from 'antd';
import axiosInstance from '@/config/axios';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/user/reviews/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }} // Adjust grid for responsive layout
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item key={review._id}>
              <Card
                title={`${review.userId.profile.firstName} ${review.userId.profile.lastName}`} // You can replace this with a username if available
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <Rate disabled value={review.rating} />
                <p>{review.message}</p>
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ReviewList;
