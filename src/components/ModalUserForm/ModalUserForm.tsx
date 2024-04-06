import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, FormFeedback } from 'reactstrap'
import s from './ModalUserForm.module.scss'
import { UsersProps } from 'models/entities/UsersProps'
import { ModalUserProps } from 'models/data/ModalUserProps'

const ModalUserForm: React.FC<ModalUserProps> = ({
    isOpen,
    setIsOpen,
    handleAddUser,
    userEdit,
    setUserEdit,
    handleEditUser,
}) => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        gender: '',
        phone: '',
        picture: '',
        ...userEdit,
    }

    const [formData, setFormData] = useState<UsersProps>(initialFormData)
    const [errors, setErrors] = useState<{ [key: string]: string }>(initialFormData)

    useEffect(() => {
        setFormData({ ...initialFormData, ...userEdit })
        /* eslint-disable */
    }, [userEdit])

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        const validationErrors = Object.keys(formData).reduce((acc, key) => {
            const isEmailInvalid = key === 'email' && !isValidEmail(formData.email)
            const errorText =
                key === 'email'
                    ? 'Por favor, ingrese una dirección de correo electrónico válida.'
                    : `Por favor, ingrese su ${getLabel(key)}.`
            acc[key] = !formData[key] || isEmailInvalid ? errorText : ''
            return acc
        }, {})

        setErrors(validationErrors)
        const hasError = Object.values(validationErrors).some((error) => error !== '')

        if (!hasError) {
            userEdit ? handleEditUser(formData) : handleAddUser(formData)
        }
    }

    const labels = {
        firstName: 'Nombre',
        lastName: 'Apellido',
        gender: 'Género',
        phone: 'Teléfono',
        picture: 'Imagen',
    }
    const getLabel = (key) => labels[key] || key

    return (
        <div className={s.container}>
            <Modal isOpen={isOpen}>
                <ModalHeader>
                    <div>{userEdit ? 'Editar usuario' : 'Agregar un nuevo usuario'}</div>
                    <Button
                        color='danger'
                        onClick={() => {
                            setIsOpen(!isOpen)
                            setUserEdit(null)
                        }}
                        className={s.btn}>
                        X
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        {Object.keys(formData).map(
                            (key) =>
                                key !== 'title' &&
                                key !== 'gender' && (
                                    <FormGroup key={key}>
                                        <Label for={key}>{getLabel(key)}</Label>
                                        <Input
                                            id={key}
                                            name={key}
                                            placeholder={`Ingrese su ${getLabel(key).toLowerCase()}`}
                                            type={key === 'phone' ? 'number' : 'text'}
                                            onChange={handleChange}
                                            invalid={errors[key] !== ''}
                                            value={formData[key]}
                                            disabled={(key === 'email' && userEdit) || key === 'id' ? true : false}
                                        />
                                        <FormFeedback>{errors[key]}</FormFeedback>
                                    </FormGroup>
                                ),
                        )}
                        <FormGroup>
                            <Label for='title'>Titulo</Label>
                            <Input
                                id='title'
                                name='title'
                                type='select'
                                onChange={handleChange}
                                invalid={errors['title'] !== ''}
                                value={formData['title']}>
                                <option value=''>Selecciona un titulo</option>
                                <option value='mr'>Mr.</option>
                                <option value='ms'>Ms.</option>
                                <option value='miss'>Miss</option>
                                <option value='mrs'>Mrs.</option>
                            </Input>
                            <FormFeedback>{errors['title']}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for='gender'>Genero</Label>
                            <Input
                                id='gender'
                                name='gender'
                                type='select'
                                onChange={handleChange}
                                invalid={errors['gender'] !== ''}
                                value={formData['gender']}>
                                <option value=''>Selecciona tu genero</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </Input>
                            <FormFeedback>{errors['gender']}</FormFeedback>
                        </FormGroup>
                        <Button color='primary' onClick={handleSubmit}>
                            {userEdit ? 'Editar' : 'Añadir'}
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalUserForm
