import React, {Component, PropTypes} from 'react';

export default class About extends Component {
    static propTypes = {
        panels: PropTypes.object,
        activeIndex: PropTypes.number
    };
    constructor(props) {
        super(props);
        this.state = {
            'text': 'you are write'
        }
    }
    render() {
        return (
            <div>About mess</div>
        )
    }
}
