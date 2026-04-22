import styled from 'styled-components';

export const Logo = styled.img`
    display: block;
    width: 16rem;
    margin: 2rem auto .2rem;
`;

export const AuthTit = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: #1a3d35;
`;

export const AuthBox = styled.div`
    width: 30rem;
    border-radius: 2rem;
    background: #fff;
    margin: 4rem auto 2rem;
    padding: 2rem;

    .auth_tit { font-size: 1.6rem; margin-bottom: 2rem; }

    .auth_label { 
        display: flex; flex-flow: column; align-items: flex-start;
    
        .input_wrapper { 
            background: #f0f9f6; border: .1rem solid rgba(45, 125, 110, 0.12); padding: 1.2rem 1rem; border-radius: .8rem; width: 100%; outline: 0; display: flex; align-items: center; justify-content: space-between;

            svg { width: 1.6rem; min-width: 1.6rem; height: 1.6rem; margin-right: 1rem; }
            
            input { flex: 1; border: 0; outline: 0; background: transparent; }
            button { 
                border: 0; outline: 0; background: transparent; cursor: pointer; 
                
                svg { margin: 0; }
            }
        }
        .input_wrapper:focus { border-color: #2d7d6e; }
    }
    .auth_label + .auth_label { margin-top: 1.2rem; }
    .auth_label p { font-size: 1.4rem; margin-bottom: 0.5rem; font-weight: 500; }
    .auth_label > input { background: #f0f9f6; border: .1rem solid rgba(45, 125, 110, 0.12); border-radius: .8rem; padding: 1.2rem 1rem; width: 100%; outline: 0; }
    .auth_label input:focus { border-color: #2d7d6e; }
    .auth_label input::placeholder { color: #1a3d35 }

    .auth_btn { border-radius: .8rem; padding: 1.2rem 1rem; width: 100%; background: #2d7d6e; color: #fff; border: none; font-size: 1.4rem; cursor: pointer; display: block; margin-top: 1.2rem; }
`;

export const LoginLink = styled.a`
    display: block; text-align: right; margin: 1.2rem 0; font-size: 1.4rem; text-align: center;
     color: #666;  
    a { font-weight: 500; text-decoration: none; color: #1a3d35; }
`;

