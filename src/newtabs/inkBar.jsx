import React, {Component} from 'react';
import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
import styles from '../css/style.scss';

// @immutableRenderDecorator
// @CSSModules(styles, {allowMultiple: true})
class InkBar extends Component {
    render() {
        const {left, width} = this.props;
        console.log(left,width,'@box');
        const classes = classnames({inkBar: true});

        return (
            <div className={classes}
                style={{
                    WebkitTransform: `translate3d(${left}px, 0, 0)`,
                    transform: `translate3d(${left}px, 0, 0)`,
                    width: width
                }}
            >
            </div>
        )
    }
}

export default immutableRenderDecorator(CSSModules(InkBar,styles, {allowMultiple: true}));
