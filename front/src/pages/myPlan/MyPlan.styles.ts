import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const PlanWrap = styled.div`
    width: 100%; position: relative;

    > .linkBtn { position: absolute; right: 0; top: 0; }
`;

export const LinkBtn = styled(Link)`
    display: block; padding: 1rem 1.2rem; border-radius: .8rem; background: #105e4c; color: #fff; font-weight: 500; font-size: 1.4rem; text-align: center;
`;

export const PlanList = styled.ul`
    display: flex; flex-flow: row wrap; gap: .8rem;

    li { width: 100%; border-radius: .8rem; box-shadow: .8rem .8rem 8rem .8rem rgba(0,0,0,.2); background: #fff; padding: 1rem 1.6rem; }
`;