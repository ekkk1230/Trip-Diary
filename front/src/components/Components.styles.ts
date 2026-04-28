import styled from "styled-components";

export const SearchContainer = styled.div`
    width: 100%;
    position: relative; 

    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    border-radius: .8rem;
    box-shadow: 0 .4rem .6rem rgba(0,0,0,0.1);

    select { background: #fff; width: 14rem; }
    input { background: #fff; width: 80% }
    button { white-space: nowrap; width: 10rem; }
`;

export const SearchCategoryContainer = styled.div`
    width: 100%; display: flex; gap: .8rem; margin-bottom: 1.2rem;

    button { width: 100%; background: #fff; border: .1rem solid rgba(45, 125, 110, 0.12); font-size: 1.2rem; word-break: keep-all; }
    button:hover, button.active { background: #fff; border: .1rem solid #2d7d6e; color: #2d7d6e }
`
export const SearchInputArea = styled.div`
    display: flex; gap: .8rem;

    input { flex: 1; }
    button { white-space: nowrap; width: 10rem; cursor: pointer; }
`;

export const SuggestionList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    list-style: none;
    padding: 0;
    margin: .5rem 0 0 0;
    border-radius: .4rem;
    max-height: 20rem;
    overflow-y: auto;
    border: .1rem solid #ddd;
`;