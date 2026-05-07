import { Link } from "react-router-dom";
import styled from "styled-components";

export const CountContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 16px;
    margin: 20px 0;
`;

export const StatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const StatLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    border-radius: 12px;
    text-decoration: none;
    position: relative;
    transition: all 0.2s ease;

    background: linear-gradient(135deg, #75ffc2 0%, #cf7eff 100%);
    box-shadow: 0 4px 12px rgb(226 117 255 / 30%);

    &:active {
        transform: scale(0.96);
        filter: brightness(0.9);
    }

    p, span {
        color: white !important;
    }
`;

export const Label = styled.p`
    font-size: 1.2rem;
    color: #868e96;
    margin-bottom: 8px;
    font-weight: 500;
`;

export const Value = styled.p`
    font-size: 1.4rem;
    font-weight: 700;
    color: #212529;

    span {
        font-size: 1rem;
        font-weight: 400;
        margin-left: 2px;
        color: #adb5bd;
    }

    &.favorite {
        color: #ff6b6b; 
    }
`;

export const ArrowIcon = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
`;
