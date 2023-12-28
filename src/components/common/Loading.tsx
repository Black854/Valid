import { Spin } from "antd"

export const Loading: React.FC = () => {
    return <div style={{display: 'flex', alignItems: 'center', height: '90vh', justifyContent: 'center'}}>
        <Spin size="large" />
      </div>
}