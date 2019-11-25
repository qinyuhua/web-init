import React, { Component } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class TabController extends Component {
  render() {
    const { panes, propsData, dropdown, activeKey } = this.props;

    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
          // className={`${styles.tabBar} ant-page${activeKey.split('/').join('-')}`}
          tabBarGutter={4}
          tabBarExtraContent={dropdown}
        >
          {panes
            ? panes.map(pane => (
                <TabPane tab={pane.title} key={pane.path} closable={pane.isCurrnet}>
                  <pane.component
                    addTabs={this.addTabs}
                    removeTabs={this.remove}
                    tabsData={pane.tabsData}
                    {...propsData}
                  />
                </TabPane>
              ))
            : null}
        </Tabs>
      </div>
    );
  }
}

export default TabController;
