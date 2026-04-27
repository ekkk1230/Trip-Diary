import * as S from './Layout.styles'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    hasHeader?: boolean;
    hasBottomNav?: boolean;
    onBackClick?: () => void;
}

function Layout({ children, title, hasHeader, hasBottomNav, onBackClick }: LayoutProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        } else if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate('/', { replace: true });
        }
    }
    
    return (
        <S.Wrapper>
            {
                hasHeader && (
                    <S.Header>
                        <button onClick={handleBack}>
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