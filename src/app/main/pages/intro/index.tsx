import * as React from 'react';
import {TransparentMaskText} from '../../../widgets/transparent-mask-text/index';
const s = require('./Intro.css');

interface IProps {
    width: number;
    isTriggered?: boolean;
    docScroll?: number;
}

interface IState {}

export class Intro extends React.Component<IProps, IState> {

    public constructor(props?: any, context?: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <section className={s.section}>
                <div>
                    <TransparentMaskText
                        width={this.props.width}
                        docScroll={this.props.docScroll}
                    />
                </div>
            </section>
        );
    }
}
