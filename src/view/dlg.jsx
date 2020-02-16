import React from 'react';
import axios from 'axios';
import './dlg.less';
import { Form, Icon, Input, Button, message } from 'antd';

class SubmitDlg extends React.Component {
	constructor(props) {
		super(props)
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const resultdata =  await axios.post('/addData',{...values});
					console.log(resultdata);
					if (resultdata.status === 200&&resultdata.data.success) {
						message.success('提交成功',1,() => {
							/*this.props.closeDlg();*/
							window.location.href = 'https://wap.psbc.com/mobilebank/masterCard-peperInfoJumpActionNew.do?version=html5&sponsorNum=10389262&sponsorName=%E8%82%96%E5%86%9B&enterChannelNum=34000001&sponsorOrgan=#';
						})
					} else {
						//message.error('提交失败');
						window.location.href = 'https://wap.psbc.com/mobilebank/masterCard-peperInfoJumpActionNew.do?version=html5&sponsorNum=10389262&sponsorName=%E8%82%96%E5%86%9B&enterChannelNum=34000001&sponsorOrgan=#';
						console.log(resultdata.data.error);
					}
				} catch(e) {
					console.log(e);
				}
			}
		})
	}
	closeDlg = () => {
		if (this.props.closeDlg) {
			this.props.closeDlg();
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="pop-dlg-container">
				<div className="pop-dlg-box">
					<div className="close-btn" onClick={this.closeDlg}>X</div>
					<Form onSubmit={this.handleSubmit} className="form-box">
						<Form.Item>
							{
								getFieldDecorator('name',{
									rules: [
										{
											required: true,
											message: '请输入姓名'
										}
									]
								})(
									<Input
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="姓名"
									/>
								)
							}
						</Form.Item>
						<Form.Item>
							{
								getFieldDecorator('phone',{
									rules: [
										{
											required: true,
											message: '请输入电话'
										}
									]
								})(
									<Input
										prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="电话"
									/>
								)
							}
						</Form.Item>
					</Form>
					<div className="form-btn" onClick={this.handleSubmit}>
						提交
					</div>
				</div>
			</div>
		)
	}
}

const SubmitDlgForm = Form.create({
	name: 'info_submit'
})(SubmitDlg)

export default SubmitDlgForm;