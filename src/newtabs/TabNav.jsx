import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';

// NOTE: npm https://www.npmjs.com/package/react-motion 动画库
import {Motion, spring} from 'react-motion';

import styles from '../css/style.scss';
import InkBar from './inkBar';

function getOuterWidth(el) {
    console.log(el, el.offsetWidth,'@el.offsetWidth');
    return el.offsetWidth;
}

function getOffset(el) {
    const html = el.ownerDocument.documentElement;
    const box = el.getBoundingClientRect();
    console.log(window.pageYOffset,html.clientTop,'@el.ownerDocument.documentElement');
    return {
        top: box.top + window.pageYOffset - html.clientTop,
        left: box.left + window.pageXOffset - html.clientLeft
    };
}

// @immutableRenderDecorator
// @CSSModules(styles, {allowMultiple: true})

class TabNav extends Component {
    static propTypes = {
        panels: PropTypes.object,
        activeIndex: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.state = {
            inkBarWith: 0,
            inkBarLeft: 0
        };
    }

    componentDidMount() {
        const {activeIndex} = this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];
        console.log(getOuterWidth(el),'E');

        this.setState({inkBarWidth: getOuterWidth(el), inkBarLeft: getOffset(el).left})
    }
    componentDidUpdate(prevProps) {
        if (prevProps.activeIndex !== this.props.activeIndex) {
            const {activeIndex} = this.props;
            const node = ReactDOM.findDOMNode(this);
            const el = node.querySelectorAll('li')[activeIndex];

            this.setState({inkBarLeft: getOffset(el).left, inkBarWidth: getOuterWidth(el)})
        }
    }

    getTabs() {
        const {panels, activeIndex} = this.props;
        return panels.map((child) => {
            if (!child)
                return null;

            const order = parseInt(child.props.order, 10);

            let classes = classnames({
                tab: true,
                tabActive: activeIndex === order,
                disabled: child.props.disabled
            });

            let events = {};
            if (!child.props.disabled) {
                events = {
                    onClick: this.props.onTabClick.bind(this, order)
                };
            }

            const ref = {};
            if (activeIndex === order) {
                ref.ref = 'activeTab';
            }

            return (
                <li role="tab"
                    aria-disabled={child.props.disabled
                    ? 'true'
                    : 'false'}
                    aria-selected={activeIndex === order
                    ? 'true'
                    : 'false'}
                    {...events}
                    className={classes}
                    key={order}
                    {...ref}>
                    {child.props.tab}
                </li>
            )
        })
    }
    render() {

        const rootClasses = classnames({bar: true});

        const classes = classnames({nav: true});

        return (
            <div className={rootClasses} role="tablist">
                <Motion style={{
                    left: spring(this.state.inkBarLeft)
                }}>
                    {({left}) => (<InkBar width={this.state.inkBarWidth} left={left} />)}
                </Motion>
                <ul className={classes}>
                    {this.getTabs()}
                </ul>
            </div>
        )
    }
}
export default immutableRenderDecorator(CSSModules(TabNav, styles, {allowMultiple: true}))
