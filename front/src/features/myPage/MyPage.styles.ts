import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const CountContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
export const StatLink = styled(Link)<{ $variant?: 'primary' | 'secondary' }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    border-radius: 12px;
    text-decoration: none;
    position: relative;
    transition: all 0.2s ease;

    ${props => props.$variant === 'primary' && css`
        background: linear-gradient(135deg, #75ffc2 0%, #a07eff 100%);
        box-shadow: 0 4px 12px rgba(160, 126, 255, 0.3);
    `}

    ${props => props.$variant === 'secondary' && css`
        background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
        box-shadow: 0 4px 12px rgba(255, 154, 158, 0.3);
    `}

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

export const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const Header = styled.div`
    margin-bottom: 24px;
    
    h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #333;
        display: flex;
        align-items: center;
        gap: 8px;

        span {
            font-size: 1.1rem;
            color: #ff6b6b;
            background: #fff0f0;
            padding: 2px 10px;
            border-radius: 20px;
        }
    }

    p {
        font-size: 1.2rem;
        color: #888;
        margin-top: 6px;
    }
`;

export const GridSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    
    /* 태블릿/데스크탑 대응 */
    @media (min-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 20px;
    }
`;

export const EmptyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;

    .icon { font-size: 3rem; margin-bottom: 16px; }
    h3 { font-size: 1.2rem; color: #333; margin-bottom: 8px; }
    p { font-size: 0.95rem; color: #999; line-height: 1.5; margin-bottom: 24px; }
    
    button {
        padding: 12px 24px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
    }
`;

export const Wrapper = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 100px 0;
    color: #888;
    font-size: 1.1rem;
`;