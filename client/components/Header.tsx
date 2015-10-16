/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/material-ui/material-ui.d.ts'/>

import * as React from 'react';
import Card = require('material-ui/lib/card/card');
import CardHeader = require('material-ui/lib/card/card-header');
import CardActions = require('material-ui/lib/card/card-actions');
import Avatar = require('material-ui/lib/avatar');
import FontIcon = require('material-ui/lib/font-icon');
import Colors = require('material-ui/lib/styles/colors');

class Header extends React.Component<any, any> {
  render() {
    return (
      <Card>
        <CardHeader
          title="Todos"
          subtitle="Todonts strictly prohibited"
          avatar={
            <Avatar>
              <FontIcon className="material-icons" color={Colors.teal800}>assignment_turned_in</FontIcon>
            </Avatar>
          } />
      </Card>
    );
  }
}

export default Header;
