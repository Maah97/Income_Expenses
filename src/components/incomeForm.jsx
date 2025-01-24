import PropTypes from 'prop-types';
import Modal from 'react-modal'

export default function IncomeForm(props) {
    return (
        <Modal 
            isOpen={props.isOpen}
            className="content-modal-income"
            overlayClassName="overlay-modal-income"
            onRequestClose={() => props.setIsOpen(false)}
        >
            <div className="title-income">
                <h3>Add an income</h3>
                <div className="i">
                    <i onClick={() => props.setIsOpen(false)} className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <form>
                <label className="label-income" htmlFor="income">Income</label>
                <input placeholder="Enter your income amount" className="input-income" type="text" />
                <label htmlFor="category-income">Category</label>
                <select className="select-income" name="category-income" id="category-income">
                    <option value="Business">Business</option>
                    <option value="Allocation">Allocation</option>
                    <option value="OtherIncome">Other Income</option>
                    <option value="Prime">Prime</option>
                    <option value="repayment">Loan repayment</option>
                    <option value="pension">Pension</option>
                    <option value="investment">Investment Income</option>
                    <option value="salary">Salary</option>
                </select>
                <label htmlFor="paymentMode">Payment Mode</label>
                <select className="select-income" name="paymentMode" id="paymentMode">
                    <option value="others">Others</option>
                    <option value="bank">Bank</option>
                    <option value="map">Map</option>
                    <option value="species">Species</option>
                </select>
                <label htmlFor="remark">Remark</label>
                <input placeholder="Enter the description of your income" className="input-income" type="text" />
                <label htmlFor="date">Date</label>
                <input className="input-income" type="date" />
                <input className="input-income" type="time" />
                <div className="btn-add-and-cancel-save-income">
                    <button className="btn-save-income" type="submit">Save income</button>
                    <button onClick={() => props.setIsOpen(false)} className="btn-save-income">Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

IncomeForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired
}