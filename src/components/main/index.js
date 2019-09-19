import React from 'react';

import API from '../../services/api';

export default class MainPage extends React.Component {
	state = {
		list: [
			{
				id: 0,
				name: 'Бананы',
				quantity: '5',
				currency: 'RUB',
				price: '20',
			},
			{
				id: 1,
				name: 'Финики',
				quantity: '8',
				currency: 'USD',
				price: '1',
			},
		],
		new: {
			name: '',
			quantity: '',
			currency: '',
			price: '',
		},
		price: [],
	};

	componentDidMount() {
	}

	// Добавление
	change_new = (obj) => {
		this.setState(state => ({
			new: {
				...state.new,
				...obj,
			},
		}));
	}
	add_item = () => {
		let new_row = {
			id: this.state.list.length+1,
			...this.state.new,
		};
		this.setState(state => ({
			list: [
				...state.list,
				new_row,
			],
			new: {
				name: '',
				quantity: '',
				currency: '',
				price: '',
			},
		}));
	}
	// Удаление
	remove_item = (id) => {
		this.setState(state => ({list:state.list.filter(e => e.id!=id)}));
	}

	// Отправка запроса
	send = async () => {
		let {response,error} = await API('/get_data',{list:this.state.list});
		if(response) {
			let price = [];
			for(let i in response) price.push({currency:i,price:(response[i]+'').replace('.',',')});
			await this.setState({price});
		}
		if(error) {
			alert(error.message);
		}
	}

	render() {
		let {props,state} = this;

		return (
			<div id="currency_list">
				{state.list.map((e,i) => (
				<div key={i} className="currency_item existing">
					<div className="left">
						<p className="title">{e.name}</p>
						<div className="rate_list">
							<p>Количество: {e.quantity}</p>
							<p>Валюта: {e.currency}</p>
							<p>Цена: {e.price}</p>
						</div>
					</div>
					<div className="right">
						<button onClick={_=>this.remove_item(e.id)}>Удалить</button>
					</div>
				</div>
				))}
				<div className="currency_item">
					<div className="left">
						<p className="title">Новый товар</p>
						<div className="inputs">
							<input
								type="text"
								value={state.new.name}
								placeholder="Товар"
								onChange={({target}) => this.change_new({name:target.value})}
							/>
							<input
								type="text"
								value={state.new.quantity}
								placeholder="Количество"
								onChange={({target}) => this.change_new({quantity:target.value})}
							/>
						</div>
						<div className="inputs">
							<select value={state.new.currency} onChange={({target}) => this.change_new({currency:target.value})}>
								<option value="RUB">Российсий Рубль</option>
								<option value="USD">Доллар США</option>
								<option value="EUR">Евро</option>
							</select>
							<input
								type="text"
								value={state.new.price}
								placeholder="Цена"
								onChange={({target}) => this.change_new({price:target.value})}
							/>
						</div>
					</div>
					<div className="right" style={{alignItems:'flex-end'}}>
						<button onClick={this.add_item}>Добавить</button>
					</div>
				</div>
				<div className="currency_item">
					{state.price.map((e,i) => (<p key={i}>{e.currency}: {e.price}</p>))}
					<button onClick={this.send}>Посчитать</button>
				</div>
			</div>
		);
	}
}
