import React from 'react';
import './home.css';
import './home.less';
import sample from 'images/test.png';
//import sample from '../images/test.png';
class Home extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="App">
				汉字测试
				<h1>test</h1>
				<img className="sample" src={sample} alt="sample"/>
			</div>
		)
	}
}

export default Home;