import React, {Component} from 'react';
import Tabs from './tab';
import TabPane from './TabPane';
import '../css/style.scss';
class TabIndex extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            activeIndex: 0
        };
    }

    handleChange(e) {
        this.setState({
            activeIndex: parseInt(e.target.value, 10)
        })
    }

    render() {
        return (
            <div>
                <div className="operator">
                    <span>切换Tab:
                    </span>
                    <select value={this.state.activeIndex} onChange={this.handleChange}>
                        <option value="0">Tab 1</option>
                        <option value="1">Tab 2</option>
                        <option value="2">Tab 3</option>
                    </select>
                </div>
                <Tabs defaultActiveIndex={this.state.activeIndex} className="tabs-bar">
                    <TabPane order="0" tab={'Tab 1'}> 第1个Tab 里的内容</TabPane>
                    <TabPane order="1" tab={'Tab 2'}> 第2个Tab 里的内容</TabPane>
                    <TabPane order="2" tab={'Tab 3'}> 第3个Tab 里的内容</TabPane>
                </Tabs>
            </div>
        )
    }
}
export default TabIndex;
