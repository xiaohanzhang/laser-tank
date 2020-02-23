import React from 'react';
import styled from 'styled-components';

type SignInButtonProps = React.PropsWithChildren<{ 
    logo: string 
}> & React.HTMLAttributes<HTMLButtonElement>;

const SignInButton = ({ className, logo, children, ...props }: SignInButtonProps) => {
    return <button className={className} {...props}>
        <span className="logo"/>
        {typeof children === 'string' ? <span>{children}</span> : children} 
    </button>
};

const StyledSignInButton = styled(SignInButton)`
    cursor: pointer;
    color: #000000;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    height: 40px;
    padding: 10px 16px;

    span {
        display: inline-block;
        height: 18px;
        line-height: 18px;
        vertical-align: middle;
    }

    .logo {
        background: url(${props => props.logo});
        background-size: contain;
        width: 18px;
        margin-right: 18px;
    }
`;

export default StyledSignInButton;