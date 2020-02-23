import { map, min } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import config from '../config';
import Popup, { PopupProps } from './Popup';
import SignInButton from './SignInButton';
import githubLogo from '../images/GitHub-Mark-32px.png';
import googleLogo from '../images/g-logo.png';
import msLogo from '../images/ms-logo.png';

const ButtonLayout = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    :after {
        content: '';
        flex: 1 1 220px;
    }
    
    > div {
        flex: 1 0 220px;
        margin: 10px 0;

        button {
            margin: 0 auto;
            width: 220px;
        }
    }
`;

const toQuery = (params: any): string => {
    return map(params, (v, k) => {
        return `${k}=${v}`;
    }).join(',');
}

type SignInPopupProps = PopupProps & {
    onSignIn: (user: any) => void
}

const SignInPopup = ({ className, onClose, onSignIn }: SignInPopupProps) => {
    return <Popup className={className} onClose={onClose}>
        <ButtonLayout>
            {map([
                {
                    logo: githubLogo, children: 'Sign in with GitHub',
                    onClick: (e: React.MouseEvent) => {
                        const url = config.auth_url;
                        const height = min([window.screen.height, 800]) as number;
                        const width = min([window.screen.width, 800]) as number;
                        const top = (window.screen.height - height) / 2;
                        const left = (window.screen.width - width) / 2;
                        const child = window.open(
                            `${url}?provider=github`,
                            `github-signin`,
                            toQuery({ width, height, top, left })
                        );
                        const interval = setInterval(async () => {
                            if (!child || child.closed) {
                                clearInterval(interval);
                            } else {
                                try {
                                    const location = child?.location;
                                    if (location.pathname === '/auth') {
                                        clearInterval(interval);
                                        const { data } = await axios.get(`/auth${child.location.search}`);
                                        child.close();
                                        onSignIn(data);
                                        onClose();
                                    }
                                } catch (e) {
                                    if (e.name !== 'SecurityError') {
                                        // cross-origin error is expected, log other error
                                        console.log(e);
                                    }
                                }
                            }
                        }, 500);
                        onClose();
                    }
                },
                {
                    logo: googleLogo, children: 'Sign in with Google',
                    onClick: () => {}
                },
                {
                    logo: msLogo, children: 'Sign in with Microsoft',
                    onClick: () => {}
                },
            ], ({logo, children, onClick}, i) => {
                return <div key={i}>
                    <SignInButton logo={logo} onClick={onClick}>
                        {children}
                    </SignInButton>
                </div>
            })}
        </ButtonLayout>
    </Popup>
}

export default SignInPopup;
