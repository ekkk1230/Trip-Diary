import * as S from './Layout.styles'
import { Link } from 'react-router-dom';
import { RiHomeHeartLine } from "react-icons/ri";
import { BsJournalRichtext } from "react-icons/bs";
import { FiUser, FiSettings } from "react-icons/fi";

function BottomNav() {
    return (
        <S.BottomNav>
            <ul className="nav_list">
                <li className="nav_item">
                    <Link to="/">
                        <RiHomeHeartLine />
                        홈
                    </Link>
                </li>
                <li className="nav_item">
                    <Link to="/journal">
                        <BsJournalRichtext />
                        저널
                    </Link>
                </li>
                <li className="nav_item">
                    <Link to="/mypage">
                        <FiUser />
                        마이페이지
                    </Link>
                </li>
                <li className="nav_item">
                    <Link to="/settings">
                        <FiSettings />
                        설정
                    </Link>
                </li>
            </ul>
        </S.BottomNav>
    )
}

export default BottomNav