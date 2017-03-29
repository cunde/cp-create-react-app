## tabbed 写码心得
**当前代码来源：https://github.com/cunde/react-book-examples/tree/master/02**

### compoent list

+ [react-immutable-render-mixin](https://github.com/jurassix/react-immutable-render-mixin)
+ [react-css-modules](https://www.npmjs.com/package/react-css-modules)
+ [immutable](https://github.com/facebook/immutable-js)
+ [classnames](https://www.npmjs.com/package/classnames)
+ [react-motion](https://www.npmjs.com/package/react-motion)

### coding

```js
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
        console.log(styles,'@styles');
        const classes = classnames({inkBar: true});

        return (
            <div styleName={classes}
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

export default CSSModules(InkBar,styles, {allowMultiple: true});

```

Decorator**// @immutableRenderDecorator// @CSSModules(styles, {allowMultiple: true})**,当前我们的项目启用的**$ create-react-app my-app** CLI 创建的项目所以默认es7特征是不支持的，所以我们用的是


```js
export default immutableRenderDecorator(CSSModules(InkBar,styles, {allowMultiple: true}))
```