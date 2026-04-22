import { styled } from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 650px;
    margin: 0 auto;
`;

export const Header = styled.header`
    padding: 1rem 2rem; background: #fff; border-bottom: .1rem solid #efefef; position: relative;
    display: flex;
    align-items: center;

    button { width: 3.2rem; height: 3.2rem; border-radius: 50%; border: .1rem solid #efefef; background: #f0f9f6; outline: 0; cursor: pointer; margin-right: 1rem; display: flex; align-items: center; justify-content: center; }
    button svg { font-size: 2.8rem; }
    .header_title { font-size: 2rem; font-weight: 500; color: #000; position: absolute; left: 50%; transform: translateX(-50%); }
`;

export const Main = styled.main`
    flex: 1;
    padding: 2rem;
`;

export const BottomNav = styled.nav`
    padding: 1rem 2rem; background: #fff; border-top: .1rem solid #efefef;

    .nav_list { display: flex; justify-content: space-around; list-style: none; padding: 0; margin: 0; }
    .nav_item { font-size: 1.4rem; font-weight: 500; }
    .nav_item a { display: flex; flex-direction: column; align-items: center; color: #1a3d35; text-decoration: none; }
    .nav_item a svg { font-size: 3rem; margin-bottom: 0.6rem; }
`;