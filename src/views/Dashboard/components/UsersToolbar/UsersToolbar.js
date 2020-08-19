import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SearchInput from './SearchInput';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  title: {
    fontWeight: 700
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if(userId) {
        axios.get('http://localhost:8080/reward?id=' + userId)
            .then(res => setUserData(res.data))
    }
  }, [userId])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user (Sample ids = '1', '2', '3', '4', '5')"
          onChange={event => setUserId(event.target.value)}
        />
      </Grid>
      <Grid
        item
        lg={6}
        sm={6}
        xl={6}
        xs={12}
      >
        <Card
            {...rest}
            className={clsx(classes.root, className)}
          >
            <CardContent className={classes.content}>
              <PerfectScrollbar>
                <div className={classes.inner}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Reward</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {userData && userData.reward && userData.reward.map(reward => (
                        <TableRow
                            className={classes.tableRow}
                            hover
                        >
                            <TableCell>{reward.month}</TableCell>
                            <TableCell>{reward.reward}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                  </div>
                </PerfectScrollbar>
              </CardContent>
            </Card>
          </Grid>
          <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >
              <Card
                  {...rest}
                  className={clsx(classes.root, className)}
                >
                  <CardContent className={classes.content}>
                    <PerfectScrollbar>
                      <div className={classes.inner}>
                      <Typography variant="h5">
                        Id: {userData && userData.customer.id}
                      </Typography>
                      <Typography variant="h5">
                        First Name: {userData && userData.customer.firstName}
                      </Typography>
                      <Typography variant="h5">
                        Last Name: {userData && userData.customer.lastName}
                      </Typography>
                      <Typography variant="h5">
                        Age: {userData && userData.customer.age}
                      </Typography>
                       <Typography variant="h5">
                        Sex: {userData && userData.customer.sex}
                      </Typography>
                        </div>
                      </PerfectScrollbar>
                    </CardContent>
                  </Card>
                </Grid>
          <Grid
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
            <Card
                  {...rest}
                  className={clsx(classes.root, className)}
                >
                  <CardContent className={classes.content}>
                    <PerfectScrollbar>
                      <div className={classes.inner}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Date</TableCell>
                              <TableCell>Item</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                          {userData && userData.transaction && userData.transaction.map(transaction => (
                              <TableRow
                                  className={classes.tableRow}
                                  hover
                              >
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>{transaction.item}</TableCell>
                              <TableCell>{transaction.price}</TableCell>
                              </TableRow>
                          ))}
                          </TableBody>
                        </Table>
                        </div>
                      </PerfectScrollbar>
                    </CardContent>
                  </Card>
                </Grid>
        </Grid>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
