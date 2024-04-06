import React from 'react'
import s from './ItemsPerPage.module.scss'
import { Form, FormGroup, Input, Label } from 'reactstrap'
import { setLocalStorage } from 'utils/setLocalStorage'
import { ItemsPerPageProps, Option } from 'models/data/ItemsPerPageProps'

const ItemsPerPage: React.FC<ItemsPerPageProps> = ({ setLimit, limit }) => {
    const handleLimit = (e: any) => {
        const limitStorage = e.target.value
        setLocalStorage('limit', limitStorage)
        setLimit(limitStorage)
    }

    const array: Option[] = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
    ]

    return (
        <div className={s.container}>
            <Form>
                <FormGroup>
                    <Label>Items por página</Label>
                    <Input id='title' name='title' type='select' value={limit} onChange={handleLimit}>
                        {array.map((option: Option, index: number) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            </Form>
        </div>
    )
}

export default ItemsPerPage
