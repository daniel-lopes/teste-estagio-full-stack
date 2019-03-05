import React from 'react';

class ListaProdutos extends React.Component {

	constructor(){
		super()

		this.state = {
			productList: [],
			productListSelectedId: [],
			productListSelected: [],
			total: 0,
			isLoaded: false
		}

		this.readAPI()
		this.itemSelectedList = this.itemSelectedList.bind(this)
		this.selectedList = this.selectedList.bind(this)
	}

	readAPI() {
		fetch('https://api.jsonbin.io/b/5c63035e1198012fc895fba7')
		.then(response => response.json())
		.then(result => {
			//console.log(result)
			this.setState({productList: result, isLoaded: true})
		});
	}

	itemSelectedList(event){
		const id = parseInt(event.target.id)
		const idx = parseInt(event.target.value)
		const thisTemp = this;
		var isCheked = event.target.checked;
		var positionItem = this.state.productListSelectedId.indexOf(id);

		if(isCheked){
			if(positionItem === -1){
				this.state.productListSelectedId.push(id)
				this.state.productListSelected.push(this.state.productList[idx])
				var value = parseFloat(this.state.productList[idx].valor)
				this.setState({total: this.state.total + value})
				// this.state.productList.map(function(item) {
				// 	return id === item.id ? thisTemp.state.productListSelected.push(item) : 0
				// })
			}
		} else {
			if(positionItem !== -1){
				var removedValueItem
				this.state.productListSelectedId.splice(positionItem, 1)
				this.state.productListSelected.map(function(item) {
					var position = thisTemp.state.productListSelected.indexOf(item)
					//return parseInt(item.id) === id ? thisTemp.state.productListSelected.splice(position, 1)
					if(id === item.id){
						removedValueItem = parseFloat(item.valor)
						return thisTemp.state.productListSelected.splice(position, 1)
					}
					return null
				});
				this.setState({total: this.state.total - removedValueItem})
			}
		}
	}

	productsList(){

		var {isLoaded} = this.state

		if(!isLoaded){
			return <label className="title">Carregando produtos...</label>
		} else {
			return (
				<div>
					<ul>
						{this.state.productList.map((item, idx) => (
							<li key={item.id}>
								<label>
									<div className="check">
										<input type="checkbox" name="campo-checkbox" className="checkbox" value={idx} id={item.id} onChange={this.itemSelectedList} />
										<label htmlFor={item.id}>
											<span className="ListItemDescription">{item.descricao}</span><br/>
											<span className="priceItem">R$ {item.valor}</span>
										</label>
									</div>
								</label>
								<br/>
							</li>
						))}
					</ul>
				</div>
			)
		}	
	}

	selectedList(){
		if(this.state.total <= 0){
			return (
				<div className="emptyList text-center">
					Selecione os produtos da lista para <nobr>adicioná-los</nobr> ao seu carrinho
				</div>
			)
		} else {
			return (
				<div className="text-center">
					<table className="table table-striped">
					  <thead>
					    <tr>
					      <td className="font-weight-bold">Item</td>
					      <td className="font-weight-bold">Preço</td>
					    </tr>
					  </thead>
					  <tbody>
					  	{this.state.productListSelected.map((item, idx) => (
					    <tr key={item.id}>
							<td>{item.descricao}</td>
							<td>R$ {item.valor}</td>
						</tr>
						))}
					  </tbody>
					</table>
				</div>
			)
		}
	}

	render(){
		var {total} = this.state
		return (
			<div>
				<div className="row">
					<div className={ window.innerWidth < 768 ? "col info text-center" : "col info text-right"}>
						<label><span className="dot">.</span>Daniel Lopes da Silva</label>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<label className="title">
							O que vamos comprar hoje?
						</label>
					</div>
				</div>
				<div className="row">
					<div className="col-md mb-4">
						{ this.productsList() }
					</div>
					<div className="col-md">
						{ this.selectedList() }
						<div className={total > 0 ? "row mb-3 mt-5" : "invisible"}>
							<div className="col">
								<span className="total">Total</span>
							</div>
							<div className="col text-right">
								<span className="total">R$ { total > 0 ? total.toFixed(2) : 0.00}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center mb-3">
					<hr/>
					@ Copyright Daniel Lopes - Full Stack Developer 
				</div>
			</div>
		);
	}
}

export default ListaProdutos