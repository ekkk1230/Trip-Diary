import * as S from './Layout.styles'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    hasHeader?: boolean;
    hasBottomNav?: boolean;
}

function Layout({ children, title, hasHeader, hasBottomNav }: LayoutProps) {
    const navigate = useNavigate();
    
    return (
        <S.Wrapper>
            {
                hasHeader && (
                    <S.Header>
                        <button onClick={() => navigate(-1)}>
                            <IoMdArrowBack />
                        </button>
                        <p className="header_title">{title}</p>
                    </S.Header>
                )
            }
            <S.Main>{children}</S.Main>
            {hasBottomNav && <BottomNav />}
        </S.Wrapper>
    )
}

export default Layout