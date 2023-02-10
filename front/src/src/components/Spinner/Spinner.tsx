import { Spin } from "antd";
import './Spinner.css'

export const Spinner = () => (<div className="custom-spinner">
    <Spin tip="Wait a few seconds" size="large" />
</div>)

