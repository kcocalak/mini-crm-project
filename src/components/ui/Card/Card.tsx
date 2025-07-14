import React from 'react';
import type { User } from '../../../constants/types/User';
import { CardActions, CardContainer, CardContent, CardHeader, InfoRow, Label, UserName, Value } from './Card.styles';
import Button from '../Button';
import Badge from '../Badge';
import { truncateText } from '../../../constants/helpers';
import Tooltip from '../Tooltip';

interface CardProps {
    user: User;
    onViewClick: (user: User) => void;
}

const NAME_LIMIT = 22;
const EMAIL_LIMIT = 25;

const Card: React.FC<CardProps> = ({ user, onViewClick }) => {
  const truncatedName = truncateText(user.name, NAME_LIMIT);
  const truncatedEmail = truncateText(user.email, EMAIL_LIMIT);

  return (
    <CardContainer>
      <CardHeader>
        {user.name.length > NAME_LIMIT ? (
          <Tooltip content={user.name} >
            <UserName>{truncatedName}</UserName>
          </Tooltip>
        ) : (
          <UserName>{user.name}</UserName>
        )}
        <Badge active={user.active}>
          {user.active ? 'Active' : 'Inactive'}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <InfoRow>
          <Label>Email:</Label>
          {user.email.length > EMAIL_LIMIT ? (
            <Tooltip content={user.email}>
              <Value>{truncatedEmail}</Value>
            </Tooltip>
          ) : (
            <Value>{user.email}</Value>
          )}
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