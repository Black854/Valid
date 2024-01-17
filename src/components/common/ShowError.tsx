import { message } from "antd"
import { useDispatch } from "react-redux"
import { equipActions } from "../../redux/Reducers/equipmentReducer"
import { useEffect } from "react"

type Props = {
    errorText: string
    actionType: 'CreateNewEquip'
}

export const ShowError: React.FC<Props> = ({ errorText, actionType }) => {
    const dispatch = useDispatch()

    const [messageApi, contextHolder] = message.useMessage()

    messageApi.open({
        type: 'error',
        content: errorText,
        duration: 7
    })

    const myFunction = () => {
        switch (actionType) {
            case 'CreateNewEquip':
                dispatch(equipActions.setCreateNewObjectErrorMessage(null))
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            myFunction()
        }, 1000)
        return () => clearTimeout(timeoutId);
    }, [])



    return contextHolder
}