import React from 'react';
import * as AntdIcons from '@ant-design/icons/';

interface IconType extends React.HTMLProps<HTMLSpanElement> {
    iconName: string;
    style?: React.CSSProperties;
    className?: string;
}

function Icon(props: IconType): any {
    const { iconName, style, className, onClick } = props;
    const allIcons: {
        [key: string]: any;
    } = AntdIcons;
    const Component = allIcons[iconName];

    return <Component onClick={onClick} style={style} className={className}></Component>
}

export default Icon;