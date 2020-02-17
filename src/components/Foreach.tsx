import React from 'react';

interface ForeachPropsInterface {
  items: any[];
  children: any;
}

export class Foreach extends React.Component<ForeachPropsInterface, any> {
  render() {
    const { children, items } = this.props;

    return items.map((item, index) => children(item, index));
  }
}
