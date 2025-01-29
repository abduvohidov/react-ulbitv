import { FC, ReactNode } from 'react';

interface TextProps {
    children?: ReactNode;
}

export const Text: FC<TextProps> = (props) => {
    const { children } = props;

    return (
        <p>{children}</p>
    );
};
