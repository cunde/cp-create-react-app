import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import TabNav from './TabNav';
import TabContent from './TabContent';
// TODO: 由于当前环境不支持Decorator 所以们先修改一下引入方式；
// NOTE: npm https://www.npmjs.com/package/react-immutable-render-mixin
// NOTE: git https://github.com/jurassix/react-immutable-render-mixin#usage-as-decorator
import {immutableRenderDecorator} from 'react-immutable-render-mixin';

// NOTE: npm https://www.npmjs.com/package/react-css-modules
import CSSModules from 'react-css-modules';
import styles from '../css/style.scss';

// NOTE: npm https://www.npmjs.com/package/immutable
// NOTE: facebook http://facebook.github.io/immutable-js/
// NOTE: github https://github.com/facebook/immutable-js
import {Seq} from 'immutable';


/**
 * NOTE: decorator es7; URL https://github.com/wycats/javascript-decorators
 * NOTE: use decorator error https://www.npmjs.com/package/custom-react-scripts
 * 由于当前环境中我们这里不支持使用decorator模式，所以我们、、、
 */
// @immutableRenderDecorator
// @CSSModules(styles, {allowMultiple: true})

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        defaultActiveIndex: PropTypes.number,
        activeIndex: PropTypes.number,
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange: () => {}
    };

    constructor(props) {
        super(props);

        const currProps = this.props;

        this.handleTabClick = this.handleTabClick.bind(this);
        this.immChildren = Seq(currProps.children);

        let activeIndex;
        if ('activeIndex' in currProps) {
            activeIndex = currProps.activeIndex;
        } else if ('defaultActiveIndex' in currProps) {
            activeIndex = currProps.defaultActiveIndex;
        }

        this.state = {
            activeIndex,
            prevIndex: activeIndex
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('activeIndex' in nextProps) {
            this.setState({activeIndex: nextProps.activeIndex});
        }
    }

    handleTabClick(activeIndex) {
        const prevIndex = this.state.activeIndex;

        if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
            this.setState({activeIndex, prevIndex});
            this.props.onChange({activeIndex, prevIndex})
        }
    }

    renderTabNav() {
        return (
            <TabNav
                key="tabBar"
                onTabClick={this.handleTabClick}
                panels={this.immChildren}
                activeIndex={this.state.activeIndex}
            />
        );
    }

    renderTabContent() {
        return (
            <TabContent
                key="TabContent"
                activeIndex={this.state.activeIndex}
                panels={this.immChildren}
            />
        )
    }
    render() {
        const {className} = this.props;
        const cx = classnames(className,'ui-tabs');

        return (
            <div className={cx}>
                {this.renderTabNav()}
                {this.renderTabContent()}
            </div>
        )
    }
}

export default immutableRenderDecorator(CSSModules(Tabs, styles,{allowMultiple: true}));
