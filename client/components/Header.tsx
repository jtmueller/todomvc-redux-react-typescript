/// <reference path='../../typings/react/react.d.ts'/>
/// <reference path='../../typings/material-ui/material-ui.d.ts'/>

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  FontIcon,
  Styles
} from 'material-ui';

class Header extends React.Component<any, any> {
  render() {
    return (
      <Card style={{marginBottom:20}}>
        <CardHeader
          title="Todos"
          subtitle="Todonts strictly prohibited"
          avatar={
            <Avatar
              icon={<FontIcon className="material-icons">assignment_turned_in</FontIcon>}
              color={Styles.Colors.teal800}/>
          } />
      </Card>
    );
  }
}

export default Header;
