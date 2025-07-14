import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useUsers } from '../../contenxt/UserContext';
import Map from '../../components/ui/Map';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import styled from 'styled-components';
import type { User } from '../../constants/types/User';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px;
  background-color: #f8f9fa;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const BackButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UserName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  // flex: 1;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const MapCard = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
  margin: 0 0 16px 0;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #212529;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 24px;
  color: #6c757d;
  margin-bottom: 16px;
`;

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { users } = useUsers();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId && users.length > 0) {
      const foundUser = users.find(u => u.id === userId);
      setUser(foundUser || null);
    }
  }, [userId, users]);

  if (!user) {
    return (
      <PageContainer>
        <NotFoundContainer>
          <NotFoundTitle>User not found</NotFoundTitle>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Users
          </Button>
        </NotFoundContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>
        <BackButton variant="outline" onClick={() => navigate(-1)}>
          ← Back to Users
        </BackButton>
      </Header>

      <ContentContainer>
        <InfoCard>
          <CardTitle>User Information</CardTitle>
          <InfoRow>
            <InfoLabel>Name</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Role</InfoLabel>
            <InfoValue>{user.role}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>
              <Badge active={user.active}>
                {user.active ? 'Active' : 'Inactive'}
              </Badge>
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Creation Date</InfoLabel>
            <InfoValue>{new Date(user.createDate).toLocaleDateString()}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>
              {user.location.lat.toFixed(6)}, {user.location.lng.toFixed(6)}
            </InfoValue>
          </InfoRow>
        </InfoCard>

        <MapCard>
          <CardTitle>Location</CardTitle>
          <Map 
            lat={user.location.lat} 
            lng={user.location.lng} 
            userName={user.name}
          />
        </MapCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default UserDetail;
