import { Popover, Typography } from "antd"
import { Icon } from 'react-icons-kit'
import { ic_info_outline } from 'react-icons-kit/md/ic_info_outline'
import { WorkChangesDataType } from "../../../../redux/Reducers/workReducer"

const { Text } = Typography

type TaskChangesPropsType = {
    changes: WorkChangesDataType
    style?: {}
}

export const TaskChanges: React.FC<TaskChangesPropsType> = ({ changes, style }) => {
    return <>
        <Popover placement="topLeft" content={<Text style={{ fontSize: '9pt' }}>{changes.changeTime + ', ' + 'добавил ' + changes.fio}</Text>} trigger="hover">
            <Icon icon={ic_info_outline} size={18} style={{ color: '#d89614', position: 'relative', bottom: '3px', left: '2px', ...style }} />
        </Popover>
    </>
}