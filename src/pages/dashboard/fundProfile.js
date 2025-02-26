/* eslint-disable import/named */
import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _fundAbout, _fundFeeds,} from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {
  Profile,
  ProfileCover,
} from '../../sections/@dashboard/fund';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function FundProfilev() {
  const { themeStretch } = useSettings();
  

  const [currentTab, setCurrentTab] = useState('profile');
  

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };


  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={_fundAbout} posts={_fundFeeds} />,
    },
  

  ];

  return (
    <Page title="User: Profile">
      <Container sx={{ marginTop: 14 }} maxWidth={themeStretch ? false : 'lg'}>
      
      
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={_fundAbout} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

