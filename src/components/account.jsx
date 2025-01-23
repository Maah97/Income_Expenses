import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function Account({account}) {
    return (
        <NavLink onClick={() => window.scrollTo(0, 0)} to={'/accounts/' + account.id}className="account">
            <div className='space'></div>
            <div className="account-header">
                <h2>{account.name}</h2>
                <p>Create at : {account.date}</p>
                <p>Modify at : 20/01/2025</p>
            </div>
        </NavLink>
    )
}

Account.propTypes = {
    account: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        date: PropTypes.string
    }).isRequired
};       