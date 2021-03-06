import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = props => {

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => <BuildControl
                key={control.label}
                label={control.label}
                onIngredientAdded={() => props.onIngredientAdded(control.type)}
                onIngredientRemoved={() => props.onIngredientRemoved(control.type)}
                disabled={props.disabled[control.type]}
            />)}
            <button className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.onOrderNow}>
                {props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
            </button>
        </div>
    );
};

export default BuildControls;
