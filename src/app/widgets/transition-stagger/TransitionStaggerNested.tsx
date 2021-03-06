import * as React from 'react';
import {StaggeredMotion, spring} from 'react-motion';
import {TransitionStaggerItem} from './TransitionStaggerItem';
const s = require('./TransitionStagger.css');

export interface ITransitionColumnProps {
    springValue: number;
    columns: JSX.Element[][];
}

export function TransitionStaggerNested(props: ITransitionColumnProps) {
    const { springValue , columns} = props;
    return (
        <div className={s.transitionColumn}>
            <StaggeredMotion
                defaultStyles={columns.map((_) => ({y: 0}))}
                styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) =>
                    i === 0
                        ? {y: spring(springValue)}
                        : {y: spring(prevInterpolatedStyles[i - 1].y)}
                )}
            >
                {interpolatingStyles =>
                    <div>
                        {interpolatingStyles.map((mainStyle, mainIndex) => (
                            <div
                                key={`TransitionColumnItem-${mainIndex}`}
                                className={s.side}
                                style={mainStyle}
                            >
                                <TransitionStaggerItem
                                    springValue={springValue}
                                    column={columns[mainIndex]}
                                />
                            </div>
                        ))}
                    </div>
                }
            </StaggeredMotion>
        </div>
    );
}
