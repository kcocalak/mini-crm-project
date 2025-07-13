import React from 'react';
import type { User } from '../../../constants/types/User';
import { CardActions, CardContainer, CardContent, CardHeader, InfoRow, Label, UserName, Value } from './Card.styles';
import Button from '../Button';
import Badge from '../Badge';

interface CardProps {
    user: User;
    onViewClick: (user: User) => void;
}

const Card: React.FC<CardProps> = ({ user, onViewClick }) => {
  return (
    <CardContainer>
      <CardHeader>
        <UserName>{user.name}</UserName>
        <Badge active={user.active}>
          {user.active ? 'Active' : 'Inactive'}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <InfoRow>
          <Label>Email:</Label>
          <Value>{user.email}</Value>
        </InfoRow>
        
        <InfoRow>
          <Label>Role:</Label>
          <Value>{user.role}</Value>
        </InfoRow>
        
        <InfoRow>
          <Label>Created:</Label>
          <Value>{new Date(user.createDate).toLocaleDateString()}</Value>
        </InfoRow>
      </CardContent>
      
      <CardActions>
        <Button variant='outline' onClick={() => onViewClick(user)}>
          View Details
        </Button>
      </CardActions>
    </CardContainer>
  );
};

export default Card; 