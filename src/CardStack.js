import React from 'react';
import PropTypes from 'prop-types';

//var moduleName = require("../node_modules/passkit-visual-designer/src/App/index.tsx")
//import PassHeader from 'passkit-visual-designer'

const equalsZero = (num) => num === 0;
const errorMessage = 'CardStack component must have at least two child Card components. Please check the children of this CardStack instance.';

class CardStack extends React.Component {
    constructor (props) {
        super(props);
        const { children, height, initialCard } = props;
        const childrenLength = children.length || 1;
        const headerHeight = 150//height / childrenLength;

        if (childrenLength <= 1) throw new Error(errorMessage);

        const topHeight = 0//100//50 //0

        this.initialTopOffsets = props.children
            .map((child, i) => equalsZero(i) ? topHeight : headerHeight * i + topHeight);

        this.state = {
            topOffsets: this.initialTopOffsets,
            cardSelected: false,
        };
    }

    componentWillMount () {
        if (this.props.initialCard >= this.props.children.length)
            console.warn('prop "initialCard" cannot be equal or greater than children.length');
        else if (this.props.initialCard >= 0)
            this.handleCardClick(this.props.initialCard);
    }

    handleCardClick (id, cb, event) {
        const initialState = {
            topOffsets: [],
            cardSelected: true,
        };
        const {cardSelected} = this.state;

        const nextState = (prev, offset, index) => {
            const newOffset = (index === id) ? 0 : this.props.height;
            return {
                cardSelected: !cardSelected,
                topOffsets: [
                    ...prev.topOffsets,
                    cardSelected ? this.initialTopOffsets[index] : newOffset,
                ],
            };
        };

        this.setState(this.state.topOffsets.reduce(nextState, initialState));

        if (cb) cb(this.state.cardSelected, id);
    }

    renderCards () {
        const cloneCard = (child, i) =>
            React.cloneElement(child, {
                key: i,
                cardId: i,
                hoverOffset: this.props.hoverOffset,
                cardSelected: this.state.cardSelected,
                height: this.props.height,
                topOffset: this.state.topOffsets[i],
                onClick: this.handleCardClick.bind(this),
            });

        return this.props.children.map(cloneCard);
    }

    render () {
        const stackStyles = {
            ...styles,
            background: this.props.background,
            height: this.props.height,
            width: this.props.width,
        };
        return (
            <ul style={stackStyles}>
                {this.renderCards()}
            </ul>
        );
    }
}

const styles = {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'scroll', //body is hidden, so turn off hidden here
    overscrollBehavior: 'contain',

    padding: 0,
    margin: 0,
};

CardStack.propTypes = {
    background: PropTypes.string,
    height: PropTypes.number,
    hoverOffset: PropTypes.number,
    width: PropTypes.string, //w/ number throws warning on % or vw
    initialCard: PropTypes.number,
};

CardStack.defaultProps = {
    width: 350,
    height: 600,
    bgColor: 'f8f8f8',
    hoverOffset: 30,
    initialCard: -1,
};

export default CardStack;