import PropTypes from 'prop-types';
import Modal from 'react-modal'

export default function ExpenseForm(props) {
    return (
        <Modal 
                isOpen={props.isOpen}
                className="content-modal-expenses"
                overlayClassName="overlay-modal-expenses"
                onRequestClose={() => props.setIsOpen(false)}
            >
                <div className="title-expense">
                    <h3>Add an expense</h3>
                    <div className="i">
                        <i onClick={() => props.setIsOpen(false)} className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <form>
                    <label className="label-expense" htmlFor="expense">Expense</label>
                    <input placeholder="Enter your expense amount" className="input-expense" type="text" />
                    <label htmlFor="category-expense">Category</label>
                    <select className="select-expense" name="category-expense" id="category-expense">
                        <option value="Purchase">Purchase</option>
                        <option value="Food And Drinks">Food and Drinks</option>
                        <option value="Other expense">Other Expense</option>
                        <option value="Toiletries">Toiletries</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Car Insurance">Car Insurance</option>
                        <option value="Home Insurance">Home Insurance</option>
                        <option value="Health Insurance">Health insurance</option>
                        <option value="Baptism And Marriage">Baptism And Marriage</option>
                        <option value="Transport And Taxi">Transport and taxi</option>
                        <option value="Laundry">Laundry</option>
                        <option value="Gifts">Gifts</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Gaz">Gaz</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Internet">Internet</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Investment Costs">Investment Costs</option>
                        <option value="House Keepers">House Keepers</option>
                        <option value="card Fees">Card Fees</option>
                        <option value="Gymnasium">Gymnasium</option>
                        <option value="Location">Location</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Repair And Maintenance">Repair And Maintenance</option>
                        <option value="Health">Health</option>
                        <option value="Clothing">Clothing</option>
                        <option value="School And Education">School and Education</option>
                        <option value="Electricity Bill">Electricity Bill</option>
                        <option value="Others Bill (Water,...)">Others Bill (Water,...)</option>
                    </select>
                    <label htmlFor="paymentMode">Payment Mode</label>
                    <select className="select-expense" name="paymentMode" id="paymentMode">
                        <option value="others">Others</option>
                        <option value="bank">Bank</option>
                        <option value="map">Map</option>
                        <option value="species">Species</option>
                    </select>
                    <label htmlFor="remark">Remark</label>
                    <input placeholder="Enter the description of your expense" className="input-expense" type="text" />
                    <label htmlFor="date">Date</label>
                    <input className="input-expense" type="date" />
                    <input className="input-expense" type="time" />
                    <div className="btn-add-and-cancel-save-expense">
                        <button className="btn-save-expense" type="submit">Save income</button>
                        <button onClick={() => props.setIsOpen(false)} className="btn-save-expense">Cancel</button>
                    </div>
                </form>
            </Modal>
    )
}

ExpenseForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired
}