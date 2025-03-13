import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function Account({account}) {
    return (
        <NavLink onClick={() => window.scrollTo(0, 0)} to={'/accounts/' + account._id}className="account">
            <div className='space'></div>
            <div className="account-header">
                <h2>{account.nameAccount}</h2>
                <p>Create at : {account.createDate}</p>
                <p>Modify at : {account.createDate}</p>
            </div>
        </NavLink>
    )
}

Account.propTypes = {
    account: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nameAccount: PropTypes.string.isRequired,
        description: PropTypes.string,
        createDate: PropTypes.string
    }).isRequired
};       