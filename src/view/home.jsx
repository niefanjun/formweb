import React from 'react';
import './home.less';
import { Row, Col } from 'antd';
import titlebg from '@images/title-bg.jpg';
import event1 from '@images/event-1.png';
import SubmitDlg from './dlg.jsx';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitdlgFlag: false
		}
	}
	showDlg = () => {
		this.setState({
			submitdlgFlag: true
		})
	}
	closeDlg = () => {
		this.setState({
			submitdlgFlag: false
		})
	}
	linkjump = (url) => {
		window.parent.location.href = url;
	}
	render() {
		const { submitdlgFlag } = this.state;
		return (
			<div className="App">
				<Row className="title">
					<Col span={24}>
						中国邮政银行
					</Col>
				</Row>
				<Row className="imagebox">
					<Col span={24}>
						<img className="titlebg" src={titlebg} alt="titlebg"/>
					</Col>
				</Row>
				<div className="cardbox">
					<div className="card-name">
						<div className="name-box">
							肖军
						</div>
						<div className="title-box">
							客户经理
						</div>
					</div>
					<div className="card-info">
						<div className="conect-way">
							电话：<a href="tel:15213091496">15213091496</a>
						</div>
						<div className="conect-way">
							微信：15213091496
						</div>
						<div className="conect-way">
							地址：重庆市渝北区人和镇龙寿路679号
						</div>
					</div>
				</div>
				<div className="eventbox" onClick={this.linkjump('http://u11749594.viewer.maka.im/k/HZL86RDCW11749594')}>
					<img className="eventimg" src={event1} alt="event1"/>
					<div className="moving-hand" />
				</div>
				{submitdlgFlag?<SubmitDlg closeDlg={this.closeDlg}/>:''}
				<div className="bottom-btn" onClick={this.showDlg}>我要办理信用卡</div>
			</div>
		)
	}
}

export default Home;