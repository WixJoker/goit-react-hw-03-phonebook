import PropTypes from 'prop-types'

import React, { Component } from 'react'
import { nanoid } from 'nanoid'

//COMPONENTS
import css from './ContactForm.module.css'

export default class ContactForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
	}
	
	state = {
		name: '',
		number: '',
	}
	//ID
	nameId = nanoid()
	numberId = nanoid()

	handleChange = e => {
		const { name, value } = e.target // e.target.name and e.target.value;
		this.setState({
			[name]: value,
		})
	}
	handelSubmit = e => {
		e.preventDefault()
		const { name, number } = this.state
		this.props.onSubmit({ name, number })
		this.setState({
			name: '',
			number: '',
		})
		// console.log(name, number);
	}
	render() {
		const { name, number } = this.state
		const { nameId, numberId, handelSubmit } = this
		return (
			<>
				<fieldset>
					<form onSubmit={handelSubmit}>
						<label>
							<h2 className={css.title}>Name</h2>
							<input
								id={nameId}
								type="text"
								value={name}
								name="name"
								onChange={this.handleChange}
								placeholder="Please enter your full name "
								pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
								title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
								required
							/>
						</label>

						<label>
							<h2 className={css.title}>Number</h2>
							<input
								id={numberId}
								type="tel"
								name="number"
								onChange={this.handleChange}
								value={number}
								placeholder="Please enter your number"
								pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
								title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
								required
							/>
						</label>
						<button className={css.addBtn}>Add Contact</button>
					</form>
				</fieldset>
			</>
		)
	}
}
